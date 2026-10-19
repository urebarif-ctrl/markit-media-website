import { NextRequest, NextResponse } from "next/server";
import { Binary } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import {
  CAREER_ROLES,
  CV_EXTENSIONS,
  CV_MAX_BYTES,
  CV_MIME,
  cvExtension,
  cvSignatureMatches,
  safeFilename,
} from "@/lib/careers";

// Career applications are stored in the database only: no email is sent, and the CV is kept in its own
// collection so list queries in the dashboard never load file data.
export const runtime = "nodejs";

function text(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: NextRequest) {
  try {
    if (await isRateLimited(`career:${clientIp(request.headers)}`, 4, 10 * 60_000)) {
      return fail("Too many applications from this connection. Please try again later.", 429);
    }

    const declared = Number(request.headers.get("content-length") || 0);
    if (declared > CV_MAX_BYTES + 512 * 1024) return fail("That file is too large. The limit is 5 MB.", 413);

    const form = await request.formData();
    if (text(form.get("website"), 200)) return NextResponse.json({ success: true }); // honeypot

    const name = text(form.get("name"), 120);
    const email = text(form.get("email"), 254).toLowerCase();
    const phone = text(form.get("phone"), 40);
    const location = text(form.get("location"), 120);
    const role = text(form.get("role"), 80);
    const link = text(form.get("link"), 300);
    const note = text(form.get("note"), 2000);
    const consent = text(form.get("consent"), 10) === "yes";

    if (name.length < 2) return fail("Please enter your name.", 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email address.", 400);
    if (!(CAREER_ROLES as readonly string[]).includes(role)) return fail("Please choose the area you are interested in.", 400);
    if (link && !/^https?:\/\/\S+$/i.test(link)) return fail("The link must start with http:// or https://", 400);
    if (!consent) return fail("Please confirm that we may store your application.", 400);

    const file = form.get("cv");
    if (!(file instanceof File) || file.size === 0) return fail("Please attach your CV.", 400);
    if (file.size > CV_MAX_BYTES) return fail("That file is too large. The limit is 5 MB.", 413);
    const ext = cvExtension(file.name);
    if (!(CV_EXTENSIONS as readonly string[]).includes(ext)) return fail("Please upload a PDF, DOC or DOCX file.", 400);
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!cvSignatureMatches(ext, bytes)) return fail("That file does not look like a valid PDF, DOC or DOCX.", 400);

    const db = await getMongoDb();
    const now = new Date();
    const cv = await db.collection("career_cvs").insertOne({
      filename: safeFilename(file.name),
      mimeType: CV_MIME[ext],
      size: bytes.byteLength,
      data: new Binary(bytes),
      createdAt: now,
    });
    try {
      await db.collection("career_applications").insertOne({
        name,
        email,
        phone,
        location,
        role,
        link,
        note,
        cvId: cv.insertedId,
        cvFilename: safeFilename(file.name),
        cvSize: bytes.byteLength,
        status: "new",
        internalNotes: "",
        consentAt: now,
        landingPage: text(form.get("landingPage"), 200),
        createdAt: now,
        updatedAt: now,
      });
    } catch (error) {
      await db.collection("career_cvs").deleteOne({ _id: cv.insertedId }).catch(() => undefined);
      throw error;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career application failed", error);
    return fail("We could not save your application. Please try again in a few minutes.", 503);
  }
}
