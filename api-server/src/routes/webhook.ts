
import { Router } from 'express';
import { addWebhook, getAllWebhooks, getWebhooksByEvent } from "../services/webhook";

export const webhookRoutes = Router();

webhookRoutes.post('/', async (req: any, res: any) => {
  const { eventName, webhookUrl } = req.body;
  if (!eventName || !webhookUrl) return res.status(400).json({ error: 'Missing fields' });
  await addWebhook(eventName, webhookUrl);
  return res.status(201).json({ message: 'Webhook registered' });
});

webhookRoutes.get('/', async (req: any, res: any) => {
  const webhooks = await getAllWebhooks();
  return res.json(webhooks);
});

webhookRoutes.get('/:eventName', async (req: any, res: any) => {
  const webhooks = await getWebhooksByEvent(req.params.eventName);
  return res.json(webhooks);
});