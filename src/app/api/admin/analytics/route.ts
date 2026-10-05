import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

function auth(r: NextRequest) {
  return verifyToken(r.cookies.get("admin_token")?.value || "");
}
const n=(v:any)=>Number(v)||0;
const dateOf=(x:any)=>new Date(x.createdAt||x.submittedAt||x.consentedAt||x.updatedAt||Date.now());

export async function GET(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const db=await getMongoDb();
    const q=new URL(request.url).searchParams;
    const days=Math.min(365,Math.max(1,Number(q.get("days"))||30));
    const since=new Date(Date.now()-days*86400000);
    const previousSince=new Date(since.getTime()-days*86400000);
    const forms=db.collection("form_submissions"),briefs=db.collection("discovery_briefs"),subs=db.collection("newsletter_subscribers");
    const posts=db.collection("blog_posts"),media=db.collection("media_assets");

    const [formDocs,briefDocs,subscriberDocs,totalPosts,publishedPosts,draftPosts,totalMedia,categories,recentPosts]=await Promise.all([
      forms.find({}).sort({createdAt:-1}).limit(1000).toArray(),
      briefs.find({}).sort({createdAt:-1}).limit(1000).toArray(),
      subs.find({}).sort({createdAt:-1}).limit(1000).toArray(),
      posts.countDocuments({}),posts.countDocuments({status:"published"}),posts.countDocuments({status:"draft"}),
      media.countDocuments({}),posts.aggregate([{$match:{category:{$nin:["",null]}}},{$group:{_id:"$category"}}]).toArray(),
      posts.find({}).sort({createdAt:-1}).limit(5).toArray()
    ]);

    const all=[
      ...formDocs.map((x:any)=>({...x,_kind:"Website Form"})),
      ...briefDocs.map((x:any)=>({...x,_kind:"Discovery Brief"})),
      ...subscriberDocs.map((x:any)=>({...x,_kind:"Newsletter"}))
    ];
    const current=all.filter(x=>dateOf(x)>=since);
    const previous=all.filter(x=>dateOf(x)>=previousSince&&dateOf(x)<since);
    const status=(x:any)=>String(x.status||"new").toLowerCase();
    const excludedLeadStatuses=new Set(["spam","sales_outreach"]);
    const sales=current.filter((x:any)=>x._kind!=="Newsletter"&&!excludedLeadStatuses.has(status(x)));
    const previousSales=previous.filter((x:any)=>x._kind!=="Newsletter"&&!excludedLeadStatuses.has(status(x)));
    const openStatuses=new Set(["new","in_progress","contacted","qualified","proposal"]);
    const staleCutoff=new Date(Date.now()-7*86400000);
    const now=new Date();

    const statusMap=new Map<string,number>(),serviceMap=new Map<string,number>(),sourceMap=new Map<string,number>(),dayMap=new Map<string,number>();
    for(const x of current){
      const st=status(x),sv=String(x.service||(x._kind==="Discovery Brief"?"Discovery":x._kind)),src=String(x.utmSource||x.source||x.referrer||"Direct");
      statusMap.set(st,(statusMap.get(st)||0)+1); serviceMap.set(sv,(serviceMap.get(sv)||0)+1); sourceMap.set(src,(sourceMap.get(src)||0)+1);
      const d=dateOf(x).toISOString().slice(0,10); dayMap.set(d,(dayMap.get(d)||0)+1);
    }
    const pipeline=["new","in_progress","contacted","qualified","proposal","won"].map(stage=>({stage,count:sales.filter(x=>status(x)===stage).length,value:sales.filter(x=>status(x)===stage).reduce((s:any,x:any)=>s+n(x.estimatedDealValue),0)}));
    const overdue=sales.filter((x:any)=>x.nextFollowUpAt&&new Date(x.nextFollowUpAt)<now&&!["won","completed","closed"].includes(status(x)));
    const stale=sales.filter((x:any)=>openStatuses.has(status(x))&&dateOf(x)<staleCutoff&&!x.lastContactedAt);
    const unassigned=sales.filter((x:any)=>openStatuses.has(status(x))&&!x.assignedTo);
    const needsContact=sales.filter((x:any)=>["new","in_progress"].includes(status(x)));
    const followUps=sales.filter((x:any)=>x.nextFollowUpAt&&!["won","completed","closed"].includes(status(x))).sort((a:any,b:any)=>+new Date(a.nextFollowUpAt)-+new Date(b.nextFollowUpAt)).slice(0,8);
    const pipelineValue=sales.filter((x:any)=>openStatuses.has(status(x))).reduce((s:any,x:any)=>s+n(x.estimatedDealValue),0);
    const wonValue=sales.filter((x:any)=>status(x)==="won").reduce((s:any,x:any)=>s+n(x.estimatedDealValue),0);
    const recentLeads=[...current].sort((a:any,b:any)=>+dateOf(b)-+dateOf(a)).slice(0,8).map((x:any)=>({
      id:String(x._id),name:String(x.name||x.brandName||x.email||"Website lead"),email:String(x.email||""),phone:String(x.phone||""),
      service:String(x.service||x._kind),source:String(x.utmSource||x.source||x._kind),status:status(x),assignedTo:String(x.assignedTo||""),created_at:dateOf(x)
    }));
    const cat=await posts.aggregate([{$match:{category:{$nin:["",null]}}},{$group:{_id:"$category",count:{$sum:1}}},{$sort:{count:-1}}]).toArray();
    const change=previousSales.length?Math.round(((sales.length-previousSales.length)/previousSales.length)*100):sales.length?100:0;

    return NextResponse.json({
      summary:{totalLeads:current.filter((x:any)=>x._kind!=="Newsletter").length,genuineLeads:sales.length,spam:current.filter((x:any)=>x._kind!=="Newsletter"&&status(x)==="spam").length,salesOutreach:current.filter((x:any)=>x._kind!=="Newsletter"&&status(x)==="sales_outreach").length,newLeads:sales.filter(x=>status(x)==="new").length,inProgress:sales.filter(x=>status(x)==="in_progress").length,contacted:sales.filter(x=>status(x)==="contacted").length,qualified:sales.filter(x=>status(x)==="qualified").length,proposals:sales.filter(x=>status(x)==="proposal").length,won:sales.filter(x=>status(x)==="won").length,discoveryBriefs:current.filter((x:any)=>x._kind==="Discovery Brief").length,newsletterSubscribers:current.filter((x:any)=>x._kind==="Newsletter").length,totalPosts,publishedPosts,draftPosts,totalMedia,categories:categories.length,pipelineValue,wonValue,periodChange:change},
      attention:{needsContact:needsContact.length,overdue:overdue.length,stale:stale.length,unassigned:unassigned.length},
      pipeline,
      followUps:followUps.map((x:any)=>({id:String(x._id),name:String(x.name||x.brandName||x.email||"Lead"),company:String(x.company||x.brandName||""),service:String(x.service||x._kind),status:status(x),assignedTo:String(x.assignedTo||""),nextFollowUpAt:x.nextFollowUpAt})),
      leadsByDay:[...dayMap].sort().map(([date,count])=>({date,count})),
      leadsByService:[...serviceMap].map(([service,count])=>({service,count})).sort((a,b)=>b.count-a.count).slice(0,8),
      leadsBySource:[...sourceMap].map(([source,count])=>({source,count})).sort((a,b)=>b.count-a.count).slice(0,8),
      leadsByStatus:[...statusMap].map(([status,count])=>({status,count})),
      recentLeads,
      postsByCategory:cat.map((x:any)=>({category:x._id,count:x.count})),
      recentPosts:recentPosts.map((x:any)=>({id:String(x._id),title:x.title,category:x.category,status:x.status,published_at:x.publishedAt})),
      period:`${days} days`,database:"MongoDB"
    });
  } catch(e) {
    console.error("Admin analytics failed",e);
    return NextResponse.json({error:"MongoDB dashboard unavailable"},{status:503});
  }
}
