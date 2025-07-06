import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
