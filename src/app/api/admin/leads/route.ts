import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

function auth(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || "";
  return verifyToken(token);
}
const statuses = new Set(["new","in_progress","contacted","qualified","proposal","won","existing_client","partnership","sales_outreach","spam","lost","completed","closed"]);
const safeRegex=(s:string)=>s.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&");

function normalize(doc:any, collection:string) {
  const isDiscovery=collection==="discovery_briefs", isNewsletter=collection==="newsletter_subscribers";
  return {
    id:String(doc._id), collection,
    formType:isDiscovery?"Discovery Brief":isNewsletter?"Newsletter":String(doc.source||"Website Form"),
    name:String(doc.name||doc.brandName||(isNewsletter?"Newsletter Subscriber":"Website Lead")),
    email:String(doc.email||""), company:String(doc.company||doc.brandName||""), phone:String(doc.phone||""),
    service:isDiscovery?(Array.isArray(doc.needs)?doc.needs.join(", "):"Discovery"):isNewsletter?"Newsletter":String(doc.service||""),
    budget:String(doc.budget||doc.adBudget||""), timeline:String(doc.timeline||doc.launchDate||""),
    message:String(doc.message||doc.description||doc.notes||""),
    status:String(doc.status||(isNewsletter?"subscribed":"new")).toLowerCase(),
    tags:Array.isArray(doc.tags)?doc.tags.map((x:any)=>String(x)).filter(Boolean).slice(0,12):[],
    internalNotes:String(doc.internalNotes||""), assignedTo:String(doc.assignedTo||""),
    source:String(doc.source||(isDiscovery?"Brand Discovery Brief":isNewsletter?"Newsletter":"Website")),
    landingPage:String(doc.landingPage||""), referrer:String(doc.referrer||""),
    utmSource:String(doc.utmSource||""), utmMedium:String(doc.utmMedium||""), utmCampaign:String(doc.utmCampaign||""),
    marketingConsent:Boolean(doc.marketingConsent), createdAt:doc.createdAt||doc.submittedAt||doc.consentedAt||doc.updatedAt,
    updatedAt:doc.updatedAt||doc.createdAt, lastContactedAt:doc.lastContactedAt||null, nextFollowUpAt:doc.nextFollowUpAt||null, estimatedDealValue:Number(doc.estimatedDealValue)||0, details:doc
  };
}

export async function GET(request:NextRequest){
 if(!auth(request)) return NextResponse.json({error:"Unauthorized"},{status:401});
 try{
  const db=await getMongoDb(), u=new URL(request.url);
  const page=Math.max(1,Number(u.searchParams.get("page"))||1), limit=Math.min(100,Math.max(1,Number(u.searchParams.get("limit"))||25));
  const status=u.searchParams.get("status")||"", type=u.searchParams.get("type")||"", search=(u.searchParams.get("search")||"").trim().slice(0,120);
  const rx=search?new RegExp(safeRegex(search),"i"):null;
  const [forms,briefs,subs]=await Promise.all([
   db.collection("form_submissions").find(rx?{$or:[{name:rx},{email:rx},{company:rx},{phone:rx},{service:rx},{source:rx}]}:{}).sort({createdAt:-1}).limit(500).toArray(),
   db.collection("discovery_briefs").find(rx?{$or:[{name:rx},{email:rx},{company:rx},{brandName:rx}]}:{}).sort({createdAt:-1}).limit(500).toArray(),
   db.collection("newsletter_subscribers").find(rx?{email:rx}:{}).sort({createdAt:-1}).limit(500).toArray()
  ]);
  let all=[...forms.map(x=>normalize(x,"form_submissions")),...briefs.map(x=>normalize(x,"discovery_briefs")),...subs.map(x=>normalize(x,"newsletter_subscribers"))]
   .sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt));
  if(type) all=all.filter(x=>x.collection===type);
  const counts=all.reduce((a:any,x:any)=>(a[x.status]=(a[x.status]||0)+1,a),{});
  if(status) all=all.filter(x=>x.status===status);
  const total=all.length, start=(page-1)*limit;
  return NextResponse.json({leads:all.slice(start,start+limit),total,counts,page,limit,totalPages:Math.max(1,Math.ceil(total/limit)),database:"MongoDB"});
 }catch(e){console.error("Unified lead inbox failed",e);return NextResponse.json({error:"MongoDB lead inbox unavailable"},{status:503});}
}

export async function PATCH(request:NextRequest){
 if(!auth(request)) return NextResponse.json({error:"Unauthorized"},{status:401});
 try{
  const {id,collection,status,tags,internalNotes,assignedTo,nextFollowUpAt,estimatedDealValue}=await request.json();
  if(!id||!ObjectId.isValid(String(id))||!["form_submissions","discovery_briefs","newsletter_subscribers"].includes(collection)) return NextResponse.json({error:"Invalid lead"},{status:400});
  const update:any={updatedAt:new Date()};
  if(status!==undefined){ if(!statuses.has(String(status))) return NextResponse.json({error:"Invalid status"},{status:400}); update.status=String(status); if(status==="contacted") update.lastContactedAt=new Date(); }
  if(tags!==undefined){if(!Array.isArray(tags))return NextResponse.json({error:"Invalid tags"},{status:400});update.tags=tags.map((x:any)=>String(x).trim().slice(0,40)).filter(Boolean).slice(0,12);}
  if(internalNotes!==undefined) update.internalNotes=String(internalNotes).slice(0,5000);
  if(assignedTo!==undefined) update.assignedTo=String(assignedTo).slice(0,120);
  if(nextFollowUpAt!==undefined) update.nextFollowUpAt=nextFollowUpAt?new Date(String(nextFollowUpAt)):null;
  if(estimatedDealValue!==undefined) update.estimatedDealValue=Math.max(0,Number(estimatedDealValue)||0);
  const db=await getMongoDb(), target=db.collection(collection), oid=new ObjectId(String(id));
  const before=await target.findOne({_id:oid});
  await target.updateOne({_id:oid},{$set:update});
  const changes:any={}; for(const k of ["status","tags","internalNotes","assignedTo","nextFollowUpAt","estimatedDealValue"]) if(k in update) changes[k]=update[k];
  const session=auth(request);
  await db.collection("activity_log").insertOne({action:"lead.updated",entityType:"lead",entityId:String(id),collection,actor:session?.email||"admin",leadName:String(before?.name||before?.brandName||before?.email||"Lead"),changes,createdAt:new Date()});
  return NextResponse.json({success:true});
 }catch(e){console.error("Lead update failed",e);return NextResponse.json({error:"Could not update lead"},{status:500});}
}
