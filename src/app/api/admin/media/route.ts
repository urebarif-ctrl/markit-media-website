import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import {
  deleteR2Object,
  getR2Status,
  isValidR2ObjectKey,
  makeR2ObjectKey,
  presignR2Url,
  r2PublicUrl,
} from "@/lib/r2";

export const runtime = "nodejs";

function auth(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || "";
  return verifyToken(token);
}

const view = (x: any) => ({
  ...x,
  id: x._id.toString(),
  _id: undefined,
  original_name: x.originalName,
  mime_type: x.mimeType,
  alt_text: x.altText,
  created_at: x.createdAt,
  r2_key: x.r2Key,
});

async function saveMediaRecord(
  session: { email?: string },
  input: {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    altText: string;
    folder: string;
    url: string;
    storage: string;
    r2Key?: string;
  },
) {
  const db = await getMongoDb();
  const now = new Date();
  const doc = {
    filename: input.filename,
    originalName: input.originalName,
    mimeType: input.mimeType,
    size: input.size,
    altText: input.altText,
    folder: input.folder,
    url: input.url,
    storage: input.storage,
    r2Key: input.r2Key || null,
    createdAt: now,
    updatedAt: now,
    createdBy: session.email || "admin",
  };

  const result = await db.collection("media_assets").insertOne(doc);
  await db.collection("activity_log").insertOne({
    action: "media.created",
    entityType: "media_asset",
    entityId: result.insertedId.toString(),
    actor: session.email || "admin",
    createdAt: now,
  });

  return {
    id: result.insertedId.toString(),
    ...view({ ...doc, _id: result.insertedId }),
  };
}

export async function GET(request: NextRequest) {
  if (!auth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getMongoDb();
    const collection = db.collection("media_assets");
    const params = new URL(request.url).searchParams;
    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(params.get("limit")) || 30));
    const filter: any = {};

    if (params.get("folder")) filter.folder = params.get("folder");
    if (params.get("search")) {
      filter.$or = [
        { originalName: { $regex: params.get("search"), $options: "i" } },
        { altText: { $regex: params.get("search"), $options: "i" } },
      ];
    }

    const [docs, total, folders] = await Promise.all([
      collection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      collection.countDocuments(filter),
      collection
        .aggregate([
          { $match: { folder: { $nin: ["", null] } } },
          { $group: { _id: "$folder" } },
          { $sort: { _id: 1 } },
        ])
        .toArray(),
    ]);

    const r2 = getR2Status();

    return NextResponse.json({
      media: docs.map(view),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      folders: folders.map((item: any) => item._id),
      storageReady: r2.configured,
      publicUrlConfigured: r2.publicConfigured,
    });
  } catch (error) {
    console.error("Media GET failed", error);
    return NextResponse.json(
      { error: "Media database unavailable" },
      { status: 503 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = auth(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const action = String(body.action || "");

    if (action === "presign") {
      const status = getR2Status();
      if (!status.configured || !status.publicConfigured) {
        return NextResponse.json(
          {
            error:
              "R2 is not fully configured in Vercel yet. Add the R2 endpoint/account, bucket, public URL, access key and secret.",
          },
          { status: 503 },
        );
      }

      const originalName = String(
        body.original_name || body.filename || "",
      ).trim();
      if (!originalName) {
        return NextResponse.json(
          { error: "File name required" },
          { status: 400 },
        );
      }

      const size = Number(body.size) || 0;
      if (size <= 0) {
        return NextResponse.json({ error: "File is empty" }, { status: 400 });
      }
      if (size > 500 * 1024 * 1024) {
        return NextResponse.json(
          {
            error:
              "Files larger than 500 MB are not supported in the dashboard.",
          },
          { status: 413 },
        );
      }

      const folder = String(body.folder || "general");
      const key = makeR2ObjectKey(folder, originalName);

      return NextResponse.json({
        uploadUrl: presignR2Url("PUT", key, 900),
        publicUrl: r2PublicUrl(key),
        key,
        expiresIn: 900,
      });
    }

    if (action === "complete") {
      const key = String(body.key || "");
      if (!isValidR2ObjectKey(key)) {
        return NextResponse.json(
          { error: "Invalid R2 object key" },
          { status: 400 },
        );
      }

      const originalName = String(
        body.original_name || body.filename || "asset",
      );
      const record = await saveMediaRecord(session, {
        filename: String(body.filename || originalName),
        originalName,
        mimeType: String(body.mime_type || "application/octet-stream"),
        size: Number(body.size) || 0,
        altText: String(body.alt_text || ""),
        folder: String(body.folder || "general"),
        url: r2PublicUrl(key),
        storage: "r2",
        r2Key: key,
      });

      return NextResponse.json({ ...record, success: true }, { status: 201 });
    }

    if (!body.url) {
      return NextResponse.json(
        { error: "Media URL required" },
        { status: 400 },
      );
    }

    const originalName = String(
      body.filename || body.original_name || "asset",
    );
    const record = await saveMediaRecord(session, {
      filename: String(body.filename || originalName),
      originalName,
      mimeType: String(body.mime_type || "application/octet-stream"),
      size: Number(body.size) || 0,
      altText: String(body.alt_text || ""),
      folder: String(body.folder || "general"),
      url: String(body.url),
      storage: String(body.storage || "external"),
    });

    return NextResponse.json({ ...record, success: true }, { status: 201 });
  } catch (error) {
    console.error("Media POST failed", error);
    return NextResponse.json({ error: "Could not save media" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = auth(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!ObjectId.isValid(String(body.id))) {
      return NextResponse.json(
        { error: "Valid media ID required" },
        { status: 400 },
      );
    }

    const set: any = { updatedAt: new Date() };
    for (const [source, target] of [
      ["alt_text", "altText"],
      ["folder", "folder"],
      ["url", "url"],
    ] as const) {
      if (source in body) set[target] = String(body[source]);
    }

    const db = await getMongoDb();
    await db
      .collection("media_assets")
      .updateOne({ _id: new ObjectId(String(body.id)) }, { $set: set });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media PATCH failed", error);
    return NextResponse.json({ error: "Could not update media" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = auth(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!ObjectId.isValid(String(id))) {
      return NextResponse.json(
        { error: "Valid media ID required" },
        { status: 400 },
      );
    }

    const db = await getMongoDb();
    const objectId = new ObjectId(String(id));
    const asset = await db.collection("media_assets").findOne({ _id: objectId });

    if (!asset) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    if (asset.storage === "r2" && asset.r2Key) {
      await deleteR2Object(String(asset.r2Key));
    }

    await db.collection("media_assets").deleteOne({ _id: objectId });
    await db.collection("activity_log").insertOne({
      action: "media.deleted",
      entityType: "media_asset",
      entityId: String(id),
      actor: session.email || "admin",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media DELETE failed", error);
    return NextResponse.json(
      { error: "Could not delete media" },
      { status: 500 },
    );
  }
}
