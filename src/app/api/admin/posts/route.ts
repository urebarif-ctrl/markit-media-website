import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

function auth(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "") || "";
  return verifyToken(token);
}
const clean = (v: unknown) => String(v ?? "").trim();
const postView = (p: any) => ({ ...p, id: p._id.toString(), _id: undefined, tags: Array.isArray(p.tags) ? p.tags : [], created_at: p.createdAt, updated_at: p.updatedAt, published_at: p.publishedAt });

export async function GET(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const db = await getMongoDb(); const c = db.collection("blog_posts");
    const q = new URL(request.url).searchParams;
    const page = Math.max(1, Number(q.get("page")) || 1), limit = Math.min(100, Math.max(1, Number(q.get("limit")) || 20));
    const filter: any = {};
    if (q.get("status")) filter.status = q.get("status");
    if (q.get("category")) filter.category = q.get("category");
    if (q.get("search")) filter.$or = [{ title: { $regex: q.get("search"), $options: "i" } }, { slug: { $regex: q.get("search"), $options: "i" } }];
    const [docs,total,categories] = await Promise.all([
      c.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).toArray(),
      c.countDocuments(filter), c.aggregate([{ $match: { category: { $nin: ["", null] } } }, { $group: { _id: "$category" } }, { $sort: { _id: 1 } }]).toArray()
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
    const now=new Date(), status=b.status==="published"?"published":"draft";
    const doc={slug,title,excerpt:clean(b.excerpt),content:String(b.content||""),cover_image:clean(b.cover_image),category:clean(b.category),tags:Array.isArray(b.tags)?b.tags.map(clean).filter(Boolean):[],author:clean(b.author)||"Markit Media",status,meta_title:clean(b.meta_title),meta_description:clean(b.meta_description),og_image:clean(b.og_image),reading_time:Math.max(1,Number(b.reading_time)||5),publishedAt:status==="published"?now:null,createdAt:now,updatedAt:now,createdBy:session.email,updatedBy:session.email};
    const r=await c.insertOne(doc); await db.collection("activity_log").insertOne({action:"blog.created",entityType:"blog_post",entityId:r.insertedId.toString(),actor:session.email,createdAt:now});
    return NextResponse.json({id:r.insertedId.toString(),success:true},{status:201});
  } catch(e){console.error(e);return NextResponse.json({error:"Could not create post"},{status:500});}
}

export async function PUT(request: NextRequest) {
  const session=auth(request); if(!session) return NextResponse.json({error:"Unauthorized"},{status:401});
  try {
    const b=await request.json(); if(!b.id||!ObjectId.isValid(String(b.id))) return NextResponse.json({error:"Valid post ID required"},{status:400});
    const db=await getMongoDb(), c=db.collection("blog_posts"), id=new ObjectId(String(b.id)), old=await c.findOne({_id:id});
    if(!old) return NextResponse.json({error:"Post not found"},{status:404});
    const fields=["slug","title","excerpt","content","cover_image","category","author","status","meta_title","meta_description","og_image"] as const;
    const set:any={updatedAt:new Date(),updatedBy:session.email};
    for(const f of fields) if(f in b) set[f]=clean(b[f]);
    if("tags" in b) set.tags=Array.isArray(b.tags)?b.tags.map(clean).filter(Boolean):[];
    if("reading_time" in b) set.reading_time=Math.max(1,Number(b.reading_time)||5);
    if(set.slug && set.slug!==old.slug && await c.findOne({slug:set.slug,_id:{$ne:id}})) return NextResponse.json({error:"A post with this slug already exists"},{status:409});
    if(set.status==="published"&&!old.publishedAt) set.publishedAt=new Date();
    await c.updateOne({_id:id},{$set:set}); await db.collection("activity_log").insertOne({action:"blog.updated",entityType:"blog_post",entityId:String(b.id),actor:session.email,createdAt:new Date()});
    return NextResponse.json({success:true});
  } catch(e){console.error(e);return NextResponse.json({error:"Could not update post"},{status:500});}
}

export async function DELETE(request: NextRequest) {
  const session=auth(request); if(!session) return NextResponse.json({error:"Unauthorized"},{status:401});
  try { const {id}=await request.json(); if(!ObjectId.isValid(String(id))) return NextResponse.json({error:"Valid post ID required"},{status:400});
    const db=await getMongoDb(); await db.collection("blog_posts").deleteOne({_id:new ObjectId(String(id))}); await db.collection("activity_log").insertOne({action:"blog.deleted",entityType:"blog_post",entityId:String(id),actor:session.email,createdAt:new Date()}); return NextResponse.json({success:true});
  } catch(e){console.error(e);return NextResponse.json({error:"Could not delete post"},{status:500});}
}