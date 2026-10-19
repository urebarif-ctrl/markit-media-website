import { MongoClient, ServerApiVersion } from "mongodb";
import { isWorkersRuntime } from "@/lib/db";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "markit_media";

const clientOptions = {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  maxPoolSize: 1,
  minPoolSize: 0,
  connectTimeoutMS: 8000,
  serverSelectionTimeoutMS: 8000,
} as const;

// Node (dev server, builds): one shared client. A failed connect is dropped so the next call retries.
let sharedClient: Promise<MongoClient> | null = null;

// Workers: sockets are tied to the request that opened them, so a client cached at module level breaks on the
// next request ("Cannot perform I/O on behalf of a different request") and a failed connect stays cached forever.
// Keep exactly one client per request instead and close it shortly after the response.
const requestClients = new WeakMap<object, Promise<MongoClient>>();
const CLOSE_AFTER_MS = 10_000;

async function getClient(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not configured.");

  if (!isWorkersRuntime()) {
    if (!sharedClient) {
      sharedClient = new MongoClient(uri, clientOptions).connect().catch((error) => {
        sharedClient = null;
        throw error;
      });
    }
    return sharedClient;
  }

  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const { ctx } = await getCloudflareContext({ async: true });
  let pending = requestClients.get(ctx);
  if (!pending) {
    const client = new MongoClient(uri, clientOptions);
    pending = client.connect().catch((error) => {
      requestClients.delete(ctx);
      throw error;
    });
    requestClients.set(ctx, pending);
    ctx.waitUntil(
      new Promise<void>((resolve) => setTimeout(resolve, CLOSE_AFTER_MS)).then(() => client.close().catch(() => undefined)),
    );
  }
  return pending;
}

export async function getMongoDb() {
  const client = await getClient();
  return client.db(dbName);
}

export async function saveFormSubmission(
  type: "lead" | "newsletter",
  data: Record<string, unknown>,
) {
  const db = await getMongoDb();
  const now = new Date();

  if (type === "newsletter") {
    const email = String(data.email || "").trim().toLowerCase();
    return db.collection("newsletter_subscribers").updateOne(
      { email },
      {
        $set: {
          ...data,
          email,
          status: "subscribed",
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    );
  }

  return db.collection("form_submissions").insertOne({
    ...data,
    type,
    createdAt: now,
  });
}
