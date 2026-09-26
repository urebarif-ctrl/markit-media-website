import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { saveFormSubmission } from "@/lib/mongodb";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function limited(ip:string){const now=Date.now(),e=rateLimitMap.get(ip);if(!e||now>e.resetTime){rateLimitMap.set(ip,{count:1,resetTime:now+60_000});return false;}e.count++;return e.count>5;}
function esc(v:unknown){return String(v||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").trim();}
function serviceLabel(v:string){return v ? v.split("-").map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(" ") : "General Inquiry";}
function portfolio(v:string){const m:Record<string,string>={branding:"/work/logo-folio","video-production":"/work","social-media":"/work","website-development":"/work","performance-marketing":"/case-studies",seo:"/case-studies"};return m[v]||"/work";}
async function saveToSheet(data:Record<string,string|boolean>){
  const url=process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if(!url)return;
  const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,secret:process.env.GOOGLE_SHEETS_WEBHOOK_SECRET||""}),cache:"no-store"});
  if(!r.ok) throw new Error("Google Sheets webhook failed");
}
export async function POST(request:NextRequest){
 try{
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";if(limited(ip))return NextResponse.json({error:"Too many requests. Please try again later."},{status:429});
  const body=await request.json();if(body.website)return NextResponse.json({success:true});
  const data={name:esc(body.name),email:esc(body.email),company:esc(body.company),phone:esc(body.phone),service:esc(body.service),budget:esc(body.budget),timeline:esc(body.timeline),message:esc(body.message),source:esc(body.source),landingPage:esc(body.landingPage),referrer:esc(body.referrer),utmSource:esc(body.utmSource),utmMedium:esc(body.utmMedium),utmCampaign:esc(body.utmCampaign),marketingConsent:Boolean(body.marketingConsent),submittedAt:new Date().toISOString(),status:"New"};
  if(!data.name||data.name.length<2)return NextResponse.json({error:"Name is required."},{status:400});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))return NextResponse.json({error:"A valid email address is required."},{status:400});
  if(!data.message||data.message.length<5)return NextResponse.json({error:"Please enter a message."},{status:400});
  try{await saveFormSubmission("lead",data);}catch(e){console.error("Failed to save lead to MongoDB",e);}
  try{await saveToSheet(data);}catch(e){console.error("Failed to save lead to Google Sheets",e);}
  if(!process.env.RESEND_API_KEY)return NextResponse.json({error:"We could not send your message. Please email ciao@themarkitmedia.com directly."},{status:503});
  const resend=new Resend(process.env.RESEND_API_KEY);const from=process.env.RESEND_FROM_EMAIL||"Markit Media <contact@themarkitmedia.com>";const label=serviceLabel(data.service);
  const internal=await resend.emails.send({from,to:["ciao@themarkitmedia.com","ureb.arif@themarkitmedia.com","urebarif@gmail.com"],replyTo:data.email,subject:`New Website Lead: ${data.name} — ${label}`,html:`<h2>New website inquiry</h2><p><b>Name:</b> ${data.name}<br><b>Email:</b> ${data.email}<br><b>Company:</b> ${data.company||"—"}<br><b>Phone/WhatsApp:</b> ${data.phone||"—"}<br><b>Service:</b> ${label}<br><b>Budget:</b> ${data.budget||"—"}<br><b>Timeline:</b> ${data.timeline||"—"}<br><b>Source:</b> ${data.source||"Website"}<br><b>Landing page:</b> ${data.landingPage||"—"}<br><b>UTM:</b> ${[data.utmSource,data.utmMedium,data.utmCampaign].filter(Boolean).join(" / ")||"—"}</p><p><b>Message</b><br>${data.message}</p>`});
  if(internal.error)return NextResponse.json({error:"We could not send your message. Please email ciao@themarkitmedia.com directly."},{status:502});
  const customer=await resend.emails.send({from,to:[data.email],replyTo:"ciao@themarkitmedia.com",subject:"We received your brief — Markit Media",html:`<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#111"><h1 style="font-size:24px">Thanks, ${data.name}.</h1><p>We’ve received your inquiry about <b>${label}</b>. Our team will review the details you shared and respond by email or WhatsApp within one business day.</p><div style="background:#f5f5f5;padding:18px;margin:24px 0"><b>Your inquiry</b><br>Service: ${label}${data.company?`<br>Company: ${data.company}`:""}</div><p>If there’s anything else we should know, simply reply to this email or message us on WhatsApp.</p><p><a href="https://themarkitmedia.com${portfolio(data.service)}" style="color:#111;font-weight:bold">View relevant work →</a> &nbsp; <a href="https://wa.me/923002086081" style="color:#111;font-weight:bold">WhatsApp us →</a></p><p style="margin-top:32px">Markit Media<br><a href="mailto:ciao@themarkitmedia.com">ciao@themarkitmedia.com</a></p></div>`});
  if(customer.error)console.error("Customer acknowledgement failed",customer.error);
  return NextResponse.json({success:true});
 }catch{return NextResponse.json({error:"Invalid request body."},{status:400});}
}
