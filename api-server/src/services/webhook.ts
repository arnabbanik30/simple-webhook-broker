import { Webhook } from "../models/webhook";

export const addWebhook = async (eventName: string, url: string) => {
  await Webhook.create({ eventName: eventName.toLowerCase(), webhookUrl: url });
};

export const getAllWebhooks = async () => {
  const webhooks = await Webhook.find();
  const grouped: Record<string, string[]> = {};
  webhooks.forEach(({ eventName, webhookUrl }) => {
    if (!grouped[eventName]) grouped[eventName] = [];
    grouped[eventName].push(webhookUrl);
  });
  return Object.entries(grouped).map(([eventName, webhookUrls]) => ({
    eventName,
    webhookUrls,
  }));
};

export const getWebhooksByEvent = async (eventName: string) => {
  const docs = await Webhook.find({ eventName: eventName.toLowerCase() });
  return {
    eventName,
    webhookUrls: docs.map((doc) => doc.webhookUrl),
  };
};

export const deleteWebhook = async (eventName: string, webhookUrl: string) => {
  try {
    await Webhook.deleteOne({
      eventName: eventName.toLocaleLowerCase(),
      webhookUrl: webhookUrl,
    });
  } catch (error) {
    console.log("Error deleting webhook");
  }
};
