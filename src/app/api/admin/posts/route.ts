import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

function auth(request: NextRequest) {
  return verifyToken(request.cookies.get("admin_token")?.value || "");
}
const clean = (v: unknown) => String(v ?? "").trim();
const validStatus = (v: unknown) => ["draft","published","scheduled","archived"].includes(clean(v)) ? clean(v) : "draft";
const postView = (p: any) => ({
  ...p, id: p._id.toString(), _id: undefined,
  tags: Array.isArray(p.tags) ? p.tags : [],
  created_at: p.createdAt, updated_at: p.updatedAt, published_at: p.publishedAt,
  scheduled_at: p.scheduledAt, legacy_url: p.legacyUrl || "",
  canonical_url: p.canonicalUrl || "", noindex: p.noindex === true,
  redirect_url: p.redirectUrl || ""
});

export async function GET(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const db = await getMongoDb(); const c = db.collection("blog_posts");
    const q = new URL(request.url).searchParams;
    const page = Math.max(1, Number(q.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(q.get("limit")) || 20));
    const filter: any = {};
    if (q.get("status")) filter.status = q.get("status");
    if (q.get("category")) filter.category = q.get("category");
    if (q.get("search")) filter.$or = [
      { title: { $regex: q.get("search"), $options: "i" } },
      { slug: { $regex: q.get("search"), $options: "i" } },
      { legacyUrl: { $regex: q.get("search"), $options: "i" } }
    ];
    const [docs,total,categories] = await Promise.all([
      c.find(filter).sort({ updatedAt: -1, createdAt: -1 }).skip((page-1)*limit).limit(limit).toArray(),
      c.countDocuments(filter),
      c.aggregate([{ $match: { category: { $nin: ["", null] } } }, { $group: { _id: "$category" } }, { $sort: { _id: 1 } }]).toArray()
    ]);
    return NextResponse.json({ posts: docs.map(postView), total, page, limit, totalPages: Math.max(1,Math.ceil(total/limit)), categories: categories.map((x:any)=>x._id) });
  } catch(e) { console.error(e); return NextResponse.json({error:"Blog database unavailable"},{status:503}); }
}

export async function POST(request: NextRequest) {
  const session=auth(request); if(!session) return NextResponse.json({error:"Unauthorized"},{status:401});
  try {
    const b=await request.json(), slug=clean(b.slug).toLowerCase(), title=clean(b.title);
    if(!slug||!title) return NextResponse.json({error:"Slug and title are required"},{status:400});
    const db=await getMongoDb(), c=db.collection("blog_posts");
    if(await c.findOne({slug})) return NextResponse.json({error:"A post with this slug already exists"},{status:409});
    const now=new Date(), status=validStatus(b.status);
    const scheduledAt=status==="scheduled"&&b.scheduled_at?new Date(b.scheduled_at):null;
    const doc={
      slug,title,excerpt:clean(b.excerpt),content:String(b.content||""),cover_image:clean(b.cover_image),
      category:clean(b.category),tags:Array.isArray(b.tags)?b.tags.map(clean).filter(Boolean):[],
      author:clean(b.author)||"Markit Media",status,meta_title:clean(b.meta_title),
      meta_description:clean(b.meta_description),og_image:clean(b.og_image),
      reading_time:Math.max(1,Number(b.reading_time)||5),
      legacyUrl:clean(b.legacy_url),canonicalUrl:clean(b.canonical_url),
      noindex:b.noindex===true,redirectUrl:clean(b.redirect_url),scheduledAt,
      publishedAt:status==="published"?now:null,createdAt:now,updatedAt:now,
      createdBy:session.email,updatedBy:session.email
    };
    const r=await c.insertOne(doc);
    await db.collection("activity_log").insertOne({action:"blog.created",entityType:"blog_post",entityId:r.insertedId.toString(),actor:session.email,createdAt:now});
    return NextResponse.json({id:r.insertedId.toString(),success:true},{status:201});
  } catch(e){console.error(e);return NextResponse.json({error:"Could not create post"},{status:500});}
}

export async function PUT(request: NextRequest) {
  const session=auth(request); if(!session) return NextResponse.json({error:"Unauthorized"},{status:401});
  try {
    const b=await request.json(); if(!b.id||!ObjectId.isValid(String(b.id))) return NextResponse.json({error:"Valid post ID required"},{status:400});
    const db=await getMongoDb(), c=db.collection("blog_posts"), id=new ObjectId(String(b.id)), old=await c.findOne({_id:id});
    if(!old) return NextResponse.json({error:"Post not found"},{status:404});
    const fields=["slug","title","excerpt","content","cover_image","category","author","meta_title","meta_description","og_image"] as const;
    const set:any={updatedAt:new Date(),updatedBy:session.email};
    for(const f of fields) if(f in b) set[f]=clean(b[f]);
    if("status" in b) set.status=validStatus(b.status);
    if("tags" in b) set.tags=Array.isArray(b.tags)?b.tags.map(clean).filter(Boolean):[];
    if("reading_time" in b) set.reading_time=Math.max(1,Number(b.readading_time||b.reading_time)||5);
    if("legacy_url" in b) set.legacyUrl=clean(b.legacy_url);
    if("canonical_url" in b) set.canonicalUrl=clean(b.canonical_url);
    if("redirect_url" in b) set.redirectUrl=clean(b.redirect_url);
    if("noindex" in b) set.noindex=b.noindex===true;
    if("scheduled_at" in b) set.scheduledAt=b.scheduled_at?new Date(b.scheduled_at):null;
    if(set.slug && set.slug!==old.slug && await c.findOne({slug:set.slug,_id:{$ne:id}})) return NextResponse.json({error:"A post with this slug already exists"},{status:409});
    if(set.status==="published"&&!old.publishedAt) set.publishedAt=new Date();
    await c.updateOne({_id:id},{$set:set});
    await db.collection("activity_log").insertOne({action:"blog.updated",entityType:"blog_post",entityId:String(b.id),actor:session.email,createdAt:new Date()});
    return NextResponse.json({success:true});
  } catch(e){console.error(e);return NextResponse.json({error:"Could not update post"},{status:500});}
}

export async function DELETE(request: NextRequest) {
  const session=auth(request); if(!session) return NextResponse.json({error:"Unauthorized"},{status:401});
  try {
    const {id}=await request.json(); if(!ObjectId.isValid(String(id))) return NextResponse.json({error:"Valid post ID required"},{status:400});
    const db=await getMongoDb(), oid=new ObjectId(String(id));
    const old=await db.collection("blog_posts").findOne({_id:oid});
    if(!old) return NextResponse.json({error:"Post not found"},{status:404});
    await db.collection("blog_posts").updateOne({_id:oid},{$set:{status:"archived",noindex:true,updatedAt:new Date(),updatedBy:session.email}});
    await db.collection("activity_log").insertOne({action:"blog.archived",entityType:"blog_post",entityId:String(id),actor:session.email,createdAt:new Date()});
    return NextResponse.json({success:true});
  } catch(e){console.error(e);return NextResponse.json({error:"Could not archive post"},{status:500});}
}
