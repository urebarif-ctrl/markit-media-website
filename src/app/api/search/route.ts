import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { legacySeoPages } from "@/data/legacy-seo-pages";
import sitemap from "@/app/sitemap";

type SearchResult = { title:string; href:string; description:string; type:string; breadcrumb:string; score:number };

const PRIVATE_PATHS=["/admin","/api/","/en/thank-you","/en/onboarding","/en/discovery","/en/proposal/","/meet","/robots.txt","/sitemap.xml","/feed.xml"];
const ALIASES:Record<string,string[]>={
  "meta ads":["facebook ads","fb ads","instagram ads","facebook advertising","paid social"],
  "google ads":["google ppc","adwords","search ads","google advertising"],
  "microsoft ads":["bing ads","bing advertising"],
  "website development":["web development","website design","web design","developer"],
  "social media":["smm","social management","instagram marketing","facebook marketing"],
  "seo":["search engine optimization","organic search","rank on google"],
  "bpo":["outsourcing","call center","customer support","virtual assistant"],
  "ai":["artificial intelligence","automation","chatbot"],
  "ecommerce":["e-commerce","online store","shopify store"],
  "ppc":["pay per click","paid search","paid ads"],
  "roi":["return on investment"],
};

function words(value:string){return value.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(/\s+/).filter(Boolean)}
function titleFromPath(path:string){const clean=path.replace(/^\/en\/?/,"").replace(/^\//,"");if(!clean)return"Markit Media";return clean.split("/").pop()!.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())}
function typeFromPath(path:string){if(path.includes("/services/"))return"Service";if(path.includes("/industries/"))return"Industry";if(path.includes("/locations/"))return"Location";if(path.includes("/resources/")||path.endsWith("/tools")||path.endsWith("/free-tools"))return"Tool & Resource";if(path.includes("/work/")||path.endsWith("/case-studies"))return"Work";if(path.includes("/blog/"))return"Blog";if(!path.startsWith("/en/"))return"Article";return"Page"}
function breadcrumb(path:string){return path.replace(/^\/en\/?/,"").split("/").filter(Boolean).map(x=>x.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())).join(" › ")||"Home"}
function expandedQuery(q:string){const base=q.toLowerCase(),extra:string[]=[];for(const[canonical,aliases]of Object.entries(ALIASES)){if(base.includes(canonical)||aliases.some(a=>base.includes(a)))extra.push(canonical,...aliases)}return Array.from(new Set([base,...extra])).join(" ")}
function rank(q:string,title:string,path:string,description=""){const query=expandedQuery(q),qWords=words(query),titleText=title.toLowerCase(),hay=(title+" "+path.replace(/[-/]/g," ")+" "+description).toLowerCase();let score=0;if(titleText===q.toLowerCase())score+=100;if(titleText.startsWith(q.toLowerCase()))score+=60;if(titleText.includes(q.toLowerCase()))score+=45;if(hay.includes(q.toLowerCase()))score+=30;for(const w of qWords){if(w.length<2)continue;if(titleText.includes(w))score+=10;else if(hay.includes(w))score+=4}return score}
function isPublic(path:string){return!PRIVATE_PATHS.some(p=>path===p||path.startsWith(p))}

export async function GET(request:NextRequest){
 const q=String(request.nextUrl.searchParams.get("q")||"").trim().slice(0,120);
 const limit=Math.min(100,Math.max(8,Number(request.nextUrl.searchParams.get("limit"))||30));
 if(q.length<2)return NextResponse.json({results:[],query:q});
 const routeResults:SearchResult[]=sitemap().map(entry=>{const url=new URL(entry.url),path=url.pathname,title=titleFromPath(path),type=typeFromPath(path),description=type+" on Markit Media";return{title,href:path,description,type,breadcrumb:breadcrumb(path),score:rank(q,title,path,description)}}).filter(x=>isPublic(x.href)&&x.score>0);
 for(const page of legacySeoPages){if(page.kind!=="article"||!isPublic(page.path))continue;const title=page.title||titleFromPath(page.path),description=page.kind==="article"?"Marketing insight from Markit Media":page.kind==="service"?"Markit Media service page":"Industry marketing page",score=rank(q,title,page.path,description);if(score>0)routeResults.push({title,href:page.path,description,type:page.kind==="article"?"Article":page.kind==="service"?"Service":"Industry",breadcrumb:page.kind==="article"?"Insights › Legacy Article":page.kind==="service"?"Services › Legacy URL":"Industries › Legacy URL",score})}
 const dynamic:SearchResult[]=[];
 try{
  const db=await getMongoDb(),safe=q.replace(/[^a-z0-9\s-]/gi,""),rx=new RegExp(safe,"i");
  const[posts,cases,portfolio]=await Promise.all([
   db.collection("blog_posts").find({status:"published",$or:[{title:rx},{excerpt:rx},{category:rx},{tags:rx}]}).limit(30).toArray(),
   db.collection("case_studies").find({status:"published",$or:[{title:rx},{summary:rx}]}).limit(15).toArray(),
   db.collection("portfolio").find({status:"published",$or:[{title:rx},{summary:rx}]}).limit(15).toArray(),
  ]);
  for(const p of posts){const href="/en/blog/"+p.slug;dynamic.push({title:String(p.title),href,description:String(p.excerpt||p.category||"Marketing insight"),type:"Blog",breadcrumb:"Blog › "+(p.category||"Insights"),score:rank(q,String(p.title),href,String(p.excerpt||""))+15})}
  for(const p of[...cases,...portfolio]){const href=String(p.url||(p.slug?"/en/work/"+p.slug:"/en/work"));dynamic.push({title:String(p.title),href,description:String(p.summary||"Selected client work"),type:"Work",breadcrumb:"Work › Case Study",score:rank(q,String(p.title),href,String(p.summary||""))+10})}
 }catch(error){console.error("Public search dynamic content unavailable",error)}
 const merged=[...routeResults,...dynamic].sort((a,b)=>b.score-a.score).filter((item,index,all)=>all.findIndex(x=>x.href===item.href)===index).slice(0,limit).map(({score,...item})=>item);
 return NextResponse.json({query:q,results:merged},{headers:{"Cache-Control":"public, max-age=60, s-maxage=300, stale-while-revalidate=600"}});
}
