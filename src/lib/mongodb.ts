import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "markit_media";

let clientPromise: Promise<MongoClient> | null = null;

function getClient() {
  if (!uri) throw new Error("MONGODB_URI is not configured.");
  if (!clientPromise) {
    const client = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    clientPromise = client.connect();
  }
  return clientPromise;
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
