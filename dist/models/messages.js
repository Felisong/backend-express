"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messagesSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    dateSent: { type: Date, required: true },
    status: { type: String, required: true },
});
const ReceivedMessages = mongoose_1.default.model("messages", messagesSchema, "messages");
exports.default = ReceivedMessages;
