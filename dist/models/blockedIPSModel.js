"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blockedIps = new mongoose_1.default.Schema({
    ipAddress: { type: String, required: true, unique: true, index: true },
    dates: { type: [String], required: true },
    currentStrike: { type: String, required: true },
});
const BlockedIps = mongoose_1.default.model("blockedIps", blockedIps);
exports.default = BlockedIps;
