import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { webhookRoutes } from "./routes/webhook";
import {mongoUser, mongoPassword} from "./config"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@localhost:27017`).then(() => console.log("Connected to MongoDB"));

app.use("/api/v0/webhooks", webhookRoutes);

app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
