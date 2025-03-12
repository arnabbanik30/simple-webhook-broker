import { config } from "dotenv";

config();

// export const mongoUser = String(process.env.MONGO_INITDB_ROOT_USERNAME)
export const mongoUser = "root";

export const mongoPassword = "password";

export const rmqUser = String(process.env.RABBITMQ_USERNAME);

export const rmqPass = String(process.env.RABBITMQ_PASSWORD);

export const rmqhost = String(process.env.RABBITMQ_URL);

export const NOTIFICATION_QUEUE = "@notification";