import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
function auth(r:NextRequest){return verifyToken(r.cookies.get("admin_token")?.value||r.headers.get("authorization")?.replace("Bearer ","")||"");}
export async function GET(request:NextRequest){
 if(!auth(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 try{
  const db=await getMongoDb(),q=new URL(request.url).searchParams,days=Math.min(365,Math.max(1,Number(q.get("days"))||30)),since=new Date(Date.now()-days*86400000);
  const leads=db.collection("form_submissions"),briefs=db.collection("discovery_briefs"),subs=db.collection("newsletter_subscribers"),posts=db.collection("blog_posts"),media=db.collection("media_assets");
  const [leadDocs,briefDocs,subscriberDocs,totalPosts,publishedPosts,draftPosts,totalMedia,categories,recentPosts]=await Promise.all([
   leads.find({createdAt:{$gte:since}}).toArray(),briefs.find({createdAt:{$gte:since}}).toArray(),subs.find({createdAt:{$gte:since}}).toArray(),
   posts.countDocuments({}),posts.countDocuments({status:"published"}),posts.countDocuments({status:"draft"}),media.countDocuments({}),posts.distinct("category",{category:{$nin:["",null]}}),posts.find({}).sort({createdAt:-1}).limit(6).toArray()
  ]);
  const all=[...leadDocs.map((x:any)=>({...x,_kind:"Website Form"})),...briefDocs.map((x:any)=>({...x,_kind:"Discovery Brief"})),...subscriberDocs.map((x:any)=>({...x,_kind:"Newsletter"}))];
  const statusMap=new Map<string,number>(),serviceMap=new Map<string,number>(),dayMap=new Map<string,number>();
  for(const x of all){const st=String(x.status||"new"),sv=String(x.service||x._kind||"Website");statusMap.set(st,(statusMap.get(st)||0)+1);serviceMap.set(sv,(serviceMap.get(sv)||0)+1);const d=new Date(x.createdAt||Date.now()).toISOString().slice(0,10);dayMap.set(d,(dayMap.get(d)||0)+1);}
  const recentLeads=all.sort((a:any,b:any)=>+new Date(b.createdAt)-+new Date(a.createdAt)).slice(0,10).map((x:any)=>({id:x._id.toString(),name:String(x.name||x.fullName||x.brandName||x.email||"Website lead"),email:String(x.email||""),service:String(x.service||x._kind),status:String(x.status||"new"),created_at:x.createdAt}));
  const cat=await posts.aggregate([{$match:{category:{$nin:["",null]}}},{$group:{_id:"$category",count:{$sum:1}}},{$sort:{count:-1}}]).toArray();
  return NextResponse.json({summary:{totalLeads:all.length,newLeads:all.filter((x:any)=>!x.status||x.status==="new").length,totalPosts,publishedPosts,draftPosts,totalMedia,categories:categories.length,newsletterSubscribers:subscriberDocs.length},leadsByDay:[...dayMap].sort().map(([date,count])=>({date,count})),leadsByService:[...serviceMap].map(([service,count])=>({service,count})).sort((a,b)=>b.count-a.count),leadsByStatus:[...statusMap].map(([status,count])=>({status,count})),recentLeads,postsByCategory:cat.map((x:any)=>({category:x._id,count:x.count})),recentPosts:recentPosts.map((x:any)=>({id:x._id.toString(),title:x.title,category:x.category,status:x.status,published_at:x.publishedAt})),period:`${days} days`,database:"MongoDB"});
 }catch(e){console.error("Admin analytics failed",e);return NextResponse.json({error:"MongoDB dashboard unavailable"},{status:503});}
}