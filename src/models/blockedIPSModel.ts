import mongoose from "mongoose";

const blockedIps = new mongoose.Schema({
  ipAddress: { type: String, required: true, unique: true, index: true },
  dates: { type: [String], required: true },
  currentStrike: { type: String, required: true },
});

const BlockedIps = mongoose.model("blockedIps", blockedIps);

export default BlockedIps;
