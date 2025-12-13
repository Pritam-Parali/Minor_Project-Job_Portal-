// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";


// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS setup (important fix)
app.use(
  cors({
    origin: "http://localhost:5174", // where your frontend runs
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Routes
app.use("/api/users", registerRoutes);
app.use("/api/users", loginRoutes);

// ✅ Multer setup for CV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Job application upload route
app.post("/api/apply", upload.single("cv"), (req, res) => {
  console.log("Form fields:", req.body);
  console.log("Uploaded file:", req.file);
  res.json({ message: "📄 Application received successfully!" });
});

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Test route
app.get("/", (req, res) => res.send("✅ API is running"));

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
app.use("/api/jobs", jobRoutes);
