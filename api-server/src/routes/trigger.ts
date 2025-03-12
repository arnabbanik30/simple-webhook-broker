import { Router } from "express";
import { getWebhooksByEvent } from "../services/webhook";
import mqConnection from "../services/rabbitmq";
import { WEBHOOK_EVENTES_QUEUE } from "../config";

export const triggerRoutes = Router();

triggerRoutes.post("/:eventName", async (req: any, res: any) => {
  const eventName = req.params.eventName;
  const payload = req.body;
  const { webhookUrls } = await getWebhooksByEvent(eventName);

  await mqConnection.connect();
  for (const url of webhookUrls) {
    const message = JSON.stringify({ eventName, url, payload });
    mqConnection.sendToQueue(WEBHOOK_EVENTES_QUEUE, message);
  }

  return res.status(202).json({ message: "Webhooks triggered" });
});
