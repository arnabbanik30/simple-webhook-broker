import client, {
    Connection,
    Channel,
    ConsumeMessage,
    ChannelModel,
  } from "amqplib";
  
  import { rmqUser, rmqPass, rmqhost } from "../config";
  
  class RabbitMQConnection {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean;
  
    async connect() {
      if (this.connected && this.channel) return;
      else this.connected = true;
  
      try {
        console.log(`⌛️ Connecting to Rabbit-MQ Server`);
        let channelModel: ChannelModel = await client.connect(
          `amqp://${rmqUser}:${rmqPass}@${rmqhost}:5672`
        );
  
        this.connection = channelModel.connection;
  
        console.log(`✅ Rabbit MQ Connection is ready`);
  
        this.channel = await channelModel.createChannel();
  
        console.log(`🛸 Created RabbitMQ Channel successfully`);
      } catch (error) {
        console.error(error);
        console.error(`Not connected to MQ Server`);
      }
    }
    async sendToQueue(queue: string, message: any) {
      try {
        if (!this.channel) {
          await this.connect();
        }
        if (this.channel) {
          await this.channel.assertQueue(queue, { durable: true }); 
          this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)),{ persistent: true});
        } else {
          console.log("Channel not available, message not sent");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  
  const mqConnection = new RabbitMQConnection();
  
  export default mqConnection;
  