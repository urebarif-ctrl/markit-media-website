import { createSign } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export const runtime = "nodejs";

function auth(request: NextRequest) {
  return verifyToken(request.cookies.get("admin_token")?.value || "");
}
function b64(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}
function dateString(date: Date) {
  return date.toISOString().slice(0, 10);
}
async function googleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(privateKey).toString("base64url")}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Google service-account authentication failed.");
  const data = await response.json();
  return String(data.access_token || "");
}

async function gscReport(token:string, site:string, startDate:string, endDate:string, dimensions:string[], rowLimit=25) {
  const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method:"POST",
    headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},
    body:JSON.stringify({startDate,endDate,dimensions,rowLimit,dataState:"final"}),
    cache:"no-store",
  });
  if(!response.ok) throw new Error(`Search Console returned ${response.status}`);
  return response.json();
}

async function ga4Report(token:string, propertyId:string, startDate:string, endDate:string) {
  const property=propertyId.startsWith("properties/")?propertyId:`properties/${propertyId}`;
  const response=await fetch(`https://analyticsdata.googleapis.com/v1beta/${property}:runReport`,{
    method:"POST",
    headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},
    body:JSON.stringify({
      dateRanges:[{startDate,endDate}],
      dimensions:[{name:"pagePath"}],
      metrics:[{name:"screenPageViews"},{name:"activeUsers"},{name:"sessions"}],
      limit:"50",
      orderBys:[{metric:{metricName:"screenPageViews"},desc:true}]
    }),
    cache:"no-store",
  });
  if(!response.ok) throw new Error(`GA4 returned ${response.status}`);
  return response.json();
}

export async function GET(request:NextRequest){
  if(!auth(request)) return NextResponse.json({error:"Unauthorized"},{status:401});
  const q=new URL(request.url).searchParams;
  const days=Math.min(90,Math.max(7,Number(q.get("days"))||30));
  const end=new Date(Date.now()-2*86400000);
  const start=new Date(end.getTime()-(days-1)*86400000);
  const startDate=dateString(start),endDate=dateString(end);
  const serviceEmail=process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey=process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim();

  if(!serviceEmail||!privateKey){
    return NextResponse.json({
      configured:false,days,startDate,endDate,
      missing:["GOOGLE_SERVICE_ACCOUNT_EMAIL","GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"],
      message:"Add a Google service account with Search Console access to populate live search data. GA4 is optional."
    });
  }

  const token=await googleAccessToken();
  if(!token) return NextResponse.json({configured:false,message:"Google authentication is not configured."});

  const site=process.env.GOOGLE_SEARCH_CONSOLE_SITE?.trim()||"sc-domain:themarkitmedia.com";
  const errors:string[]=[];
  let queries:any={rows:[]},pages:any={rows:[]},ga4:any=null;

  let daily:any={rows:[]};
  try{queries=await gscReport(token,site,startDate,endDate,["query"],30)}catch(e:any){errors.push(e.message||"Search Console query report failed")}
  try{pages=await gscReport(token,site,startDate,endDate,["page"],50)}catch(e:any){errors.push(e.message||"Search Console page report failed")}
  try{daily=await gscReport(token,site,startDate,endDate,["date"],days)}catch(e:any){errors.push(e.message||"Search Console daily report failed")}

  const ga4Property=process.env.GA4_PROPERTY_ID?.trim();
  if(ga4Property){
    try{ga4=await ga4Report(token,ga4Property,startDate,endDate)}catch(e:any){errors.push(e.message||"GA4 page report failed")}
  }

  const queryRows=(queries.rows||[]).map((r:any)=>({query:r.keys?.[0]||"",clicks:r.clicks||0,impressions:r.impressions||0,ctr:r.ctr||0,position:r.position||0}));
  const pageRows=(pages.rows||[]).map((r:any)=>({page:r.keys?.[0]||"",clicks:r.clicks||0,impressions:r.impressions||0,ctr:r.ctr||0,position:r.position||0}));
  const gaRows=(ga4?.rows||[]).map((r:any)=>({page:r.dimensionValues?.[0]?.value||"",views:Number(r.metricValues?.[0]?.value||0),users:Number(r.metricValues?.[1]?.value||0),sessions:Number(r.metricValues?.[2]?.value||0)}));

  const dailyData=(daily.rows||[]).map((r:any)=>({date:r.keys?.[0]||"",clicks:r.clicks||0,impressions:r.impressions||0,ctr:r.ctr||0,position:r.position||0})).sort((a:any,b:any)=>a.date.localeCompare(b.date));
  const totals=pageRows.reduce((a:any,x:any)=>({clicks:a.clicks+x.clicks,impressions:a.impressions+x.impressions}),{clicks:0,impressions:0});
  const weightedPosition=pageRows.reduce((sum:number,x:any)=>sum+(x.position*x.impressions),0)/(totals.impressions||1);
  const topBlogs=(gaRows.length?gaRows.map((x:any)=>({...x,source:"GA4"})):pageRows.map((x:any)=>({...x,views:x.clicks,users:0,sessions:0,source:"Search Console"}))).filter((x:any)=>x.page.includes("/blog/")).slice(0,15);

  return NextResponse.json({
    configured:true,days,startDate,endDate,site,
    summary:{clicks:totals.clicks,impressions:totals.impressions,ctr:totals.impressions?totals.clicks/totals.impressions:0,position:weightedPosition},
    dailyData,
    topQueries:queryRows.slice(0,20),
    topPages:gaRows.length?gaRows.slice(0,20):pageRows.slice(0,20),
    topBlogs,
    sources:{searchConsole:true,ga4:Boolean(gaRows.length),ga4Configured:Boolean(ga4Property)},
    errors
  });
}
