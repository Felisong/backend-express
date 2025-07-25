import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  dateSent: { type: Date, required: true },
  status: { type: String, required: true },
});

const ReceivedMessages = mongoose.model("messages", messagesSchema, "messages");

export default ReceivedMessages;
