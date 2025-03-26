import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/routes";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const allowedOrigins = [
  "https://portfolio-site-front.vercel.app", // Production frontend
  "http://localhost:3000", // Local frontend
  // Add more origins as needed
];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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

// Export the Express app as a Vercel serverless function
export default app;
