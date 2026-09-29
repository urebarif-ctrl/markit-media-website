import { createHash, createHmac, randomUUID } from "crypto";

type R2Method = "PUT" | "DELETE";

type R2Config = {
  endpoint: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrl: string;
};

const REGION = "auto";
const SERVICE = "s3";

function trimSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function encodeRfc3986(value: string) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function encodePath(value: string) {
  return value
    .split("/")
    .filter(Boolean)
    .map(encodeRfc3986)
    .join("/");
}

function hmac(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest();
}

function hmacHex(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest("hex");
}

function getEndpoint(bucket: string) {
  const explicit = process.env.R2_ENDPOINT?.trim();
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const raw =
    explicit ||
    (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : "");

  if (!raw) return "";

  const url = new URL(raw);
  let pathname = trimSlash(url.pathname);
  if (pathname === `/${bucket}`) pathname = "";
  url.pathname = pathname;
  url.search = "";
  url.hash = "";
  return trimSlash(url.toString());
}

export function getR2Config(): R2Config | null {
  const bucket = process.env.R2_BUCKET_NAME?.trim() || "";
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim() || "";
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim() || "";
  const publicUrl = trimSlash(process.env.R2_PUBLIC_URL?.trim() || "");
  const endpoint = bucket ? getEndpoint(bucket) : "";

  if (!bucket || !accessKeyId || !secretAccessKey || !publicUrl || !endpoint) {
    return null;
  }

  return { endpoint, bucket, accessKeyId, secretAccessKey, publicUrl };
}

export function getR2Status() {
  const bucket = process.env.R2_BUCKET_NAME?.trim() || "";
  const endpoint = bucket ? getEndpoint(bucket) : "";

  return {
    configured: Boolean(
      endpoint &&
        bucket &&
        process.env.R2_ACCESS_KEY_ID &&
        process.env.R2_SECRET_ACCESS_KEY,
    ),
    publicConfigured: Boolean(process.env.R2_PUBLIC_URL),
  };
}

function signingKey(secret: string, dateStamp: string) {
  const kDate = hmac(`AWS4${secret}`, dateStamp);
  const kRegion = hmac(kDate, REGION);
  const kService = hmac(kRegion, SERVICE);
  return hmac(kService, "aws4_request");
}

export function presignR2Url(
  method: R2Method,
  key: string,
  expiresInSeconds = 900,
) {
  const config = getR2Config();
  if (!config) throw new Error("R2 is not fully configured.");

  const endpoint = new URL(config.endpoint);
  const host = endpoint.host;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;

  const basePath = trimSlash(endpoint.pathname);
  const objectPath = `${encodeRfc3986(config.bucket)}/${encodePath(key)}`;
  const canonicalUri = `${basePath}/${objectPath}`.replace(/\/{2,}/g, "/");

  const params: Record<string, string> = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD",
    "X-Amz-Credential": `${config.accessKeyId}/${credentialScope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(
      Math.max(60, Math.min(3600, expiresInSeconds)),
    ),
    "X-Amz-SignedHeaders": "host",
  };

  const canonicalQuery = Object.entries(params)
    .map(([name, value]) => [encodeRfc3986(name), encodeRfc3986(value)] as const)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([name, value]) => `${name}=${value}`)
    .join("&");

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuery,
    `host:${host}\n`,
    "host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const hashedRequest = createHash("sha256")
    .update(canonicalRequest)
    .digest("hex");
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    hashedRequest,
  ].join("\n");

  const signature = hmacHex(
    signingKey(config.secretAccessKey, dateStamp),
    stringToSign,
  );

  return `${endpoint.origin}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}

export function r2PublicUrl(key: string) {
  const config = getR2Config();
  if (!config) throw new Error("R2 is not fully configured.");
  return `${config.publicUrl}/${encodePath(key)}`;
}

export function makeR2ObjectKey(folder: string, filename: string) {
  const cleanFolder =
    folder
      .trim()
      .replace(/[^a-zA-Z0-9/_-]+/g, "-")
      .replace(/^\/+|\/+$/g, "") || "general";

  const cleanName =
    filename
      .normalize("NFKD")
      .replace(/[^\w.\-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(-140) || "asset";

  const day = new Date().toISOString().slice(0, 10);
  return `${cleanFolder}/${day}/${Date.now()}-${randomUUID().slice(0, 8)}-${cleanName}`;
}

export function isValidR2ObjectKey(key: string) {
  return Boolean(
    key &&
      !key.startsWith("/") &&
      !key.includes("\\") &&
      !key.split("/").includes(".."),
  );
}

export async function deleteR2Object(key: string) {
  if (!isValidR2ObjectKey(key)) throw new Error("Invalid R2 object key.");
  const url = presignR2Url("DELETE", key, 120);
  const response = await fetch(url, { method: "DELETE", cache: "no-store" });
  if (!response.ok && response.status !== 404) {
    throw new Error(`R2 delete failed with ${response.status}.`);
  }
}
