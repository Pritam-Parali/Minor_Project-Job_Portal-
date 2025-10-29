// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", registerRoutes);
app.use("/api/users", loginRoutes);

// test route
app.get("/", (req, res) => res.send("✅ API is running"));

// start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
