import mongoose from 'mongoose';

const WebhookSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  webhookUrl: { type: String, required: true },
});

export const Webhook = mongoose.model('Webhook', WebhookSchema);