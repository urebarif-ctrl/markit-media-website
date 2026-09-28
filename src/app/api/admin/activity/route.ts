import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
export async function GET(r:NextRequest){
 const t=r.cookies.get("admin_token")?.value||r.headers.get("authorization")?.replace("Bearer ","")||"";
 if(!verifyToken(t))return NextResponse.json({error:"Unauthorized"},{status:401});
 const q=new URL(r.url).searchParams,limit=Math.min(200,Math.max(1,Number(q.get("limit"))||100));
 const db=await getMongoDb(),items=await db.collection("activity_log").find({}).sort({createdAt:-1}).limit(limit).toArray();
 return NextResponse.json({items:items.map((x:any)=>({...x,id:String(x._id),_id:undefined}))});
}