import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/routes";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.NEXT_PUBLIC_BASE_URL_LOCAL,
  process.env.NEXT_PUBLIC_BASE_URL_PROD,
].filter(Boolean);

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);

const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ Fatal MongoDB Error:", err);
    process.exit(1); // Force deployment failure on DB connection issues
  });

console.log("✅ Express app initialized");
// Prefix all routes with /api
app.use("/api", userRoutes);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

// test
app.get("/api/cors-info", (req: Request, res: Response) => {
  res.json({
    allowedOrigins,
    currentOrigin: req.headers.origin,
    isAllowed: allowedOrigins.includes(req.headers.origin || ""),
  });
});

// Export the Express app as a Vercel serverless function
export default app;
