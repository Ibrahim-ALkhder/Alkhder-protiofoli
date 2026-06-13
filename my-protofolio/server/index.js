import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { projectsRouter } from "./routes/projects.js";
import { certificatesRouter } from "./routes/certificates.js";
import { cvRouter } from "./routes/cv.js";
import { authRouter, requireAuth } from "./routes/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRouter);

app.use("/api/projects", projectsRouter);
app.use("/api/certificates", certificatesRouter);
app.use("/api/cv", cvRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
