"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const MONGO_URI = process.env.MONGO_URI || "";
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
    console.error("❌ Fatal MongoDB Error:", err);
    process.exit(1); // Force deployment failure on DB connection issues
});
console.log("✅ Express app initialized");
// Prefix all routes with /api
app.use("/api", routes_1.default);
// Health check endpoint
app.get("/", (req, res) => {
    res.send("API is running");
});
// Export the Express app as a Vercel serverless function
exports.default = app;
