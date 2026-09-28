import { NextRequest,NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";import { verifyToken } from "@/lib/auth";
function auth(r:NextRequest){return verifyToken(r.cookies.get("admin_token")?.value||"");}
export async function GET(r:NextRequest){if(!auth(r))return NextResponse.json({error:"Unauthorized"},{status:401});const q=(new URL(r.url).searchParams.get("q")||"").trim().slice(0,80);if(q.length<2)return NextResponse.json({results:[]});const rx=new RegExp(q.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"i"),db=await getMongoDb();
const [forms,briefs,posts,cases,portfolio,clients,media]=await Promise.all([
db.collection("form_submissions").find({$or:[{name:rx},{email:rx},{company:rx},{service:rx}]}).limit(6).toArray(),
db.collection("discovery_briefs").find({$or:[{name:rx},{email:rx},{brandName:rx}]}).limit(4).toArray(),
db.collection("blog_posts").find({$or:[{title:rx},{slug:rx}]}).limit(5).toArray(),
db.collection("case_studies").find({$or:[{title:rx},{slug:rx}]}).limit(4).toArray(),
db.collection("portfolio").find({$or:[{title:rx},{slug:rx}]}).limit(4).toArray(),
db.collection("clients").find({$or:[{title:rx},{slug:rx}]}).limit(4).toArray(),
db.collection("media_assets").find({$or:[{originalName:rx},{altText:rx}]}).limit(4).toArray()]);
const row=(type:string,x:any,title:string,subtitle:string)=>({type,id:String(x._id),title,subtitle});
return NextResponse.json({results:[
...forms.map((x:any)=>row("Lead",x,x.name||x.email,x.company||x.service||x.email)),
...briefs.map((x:any)=>row("Discovery",x,x.brandName||x.name||x.email,x.email||"Discovery brief")),
...posts.map((x:any)=>row("Blog",x,x.title,x.status||x.slug)),
...cases.map((x:any)=>row("Case Study",x,x.title,x.status||x.slug)),
...portfolio.map((x:any)=>row("Portfolio",x,x.title,x.status||x.slug)),
...clients.map((x:any)=>row("Client",x,x.title,x.url||x.status)),
...media.map((x:any)=>row("Media",x,x.originalName,x.folder||x.altText))
]});}