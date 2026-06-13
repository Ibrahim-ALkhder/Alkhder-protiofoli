import { execSync } from "child_process";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { projectsRouter } from "./routes/projects.js";
import { certificatesRouter } from "./routes/certificates.js";
import { cvRouter } from "./routes/cv.js";
import { authRouter } from "./routes/auth.js";
import { initDatabase, getDb } from "./database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

initDatabase();

const db = getDb();
const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get();
if (projectCount.count === 0) {
  console.log("Database empty, running light seed...");
  try {
    execSync("node seed-light.js", { stdio: "inherit", cwd: __dirname });
    console.log("Light seed completed");
  } catch (err) {
    console.error("Light seed failed:", err.message);
  }
}

app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/certificates", certificatesRouter);
app.use("/api/cv", cvRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const frontendDist = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
