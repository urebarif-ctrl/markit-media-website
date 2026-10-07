import { getMongoDb } from "@/lib/mongodb";

interface LeadNotification {
  name: string;
  email: string;
  service: string;
  source: string;
  formType: string;
  createdAt: string;
}

export async function notifyNewLead(lead: LeadNotification): Promise<void> {
  try {
    const db = await getMongoDb();
    const config = await db.collection("webhook_config").findOne({});
    if (!config?.enabled) return;

    if (config.slackWebhookUrl) {
      const text = [
        `*New lead from ${lead.formType}:* ${lead.name}`,
        `Email: ${lead.email}`,
        `Service: ${lead.service || "General Inquiry"}`,
        `Source: ${lead.source || "Website"}`,
      ].join("\n");

      await fetch(config.slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
    }
  } catch (e) {
    console.error("Webhook notification failed (non-blocking)", e);
  }
}
