import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { requireAuth } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CV_FILE = path.join(__dirname, "..", "data", "cv.json");
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cv${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const cvRouter = Router();

cvRouter.get("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(CV_FILE, "utf-8"));
    res.json(data);
  } catch {
    res.json({ url: "/Ibrahim-CV.pdf" });
  }
});

cvRouter.post("/upload", requireAuth, (req, res) => {
  upload.single("cv")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const cvData = {
      url: `/uploads/cv${path.extname(req.file.originalname)}`,
      filename: req.file.originalname,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(CV_FILE, JSON.stringify(cvData, null, 2));
    res.json(cvData);
  });
});

cvRouter.post("/url", requireAuth, (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const cvData = {
    url,
    filename: "external",
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(CV_FILE, JSON.stringify(cvData, null, 2));
  res.json(cvData);
});
