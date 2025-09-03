import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(cors());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Handle form submission
app.post("/apply", upload.single("cv"), (req, res) => {
  console.log("Text fields:", req.body);
  console.log("Uploaded file:", req.file);

  res.json({ message: "Application received successfully!" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
