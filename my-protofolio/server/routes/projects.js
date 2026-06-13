import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { requireAuth } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "projects.json");

function readProjects() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeProjects(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export const projectsRouter = Router();

projectsRouter.get("/", (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

projectsRouter.get("/:id", (req, res) => {
  const projects = readProjects();
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

projectsRouter.post("/", requireAuth, (req, res) => {
  const projects = readProjects();
  let slug = req.body.slug || "";
  if (!slug) {
    slug = req.body.title
      ?.toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .replace(/-+/g, "-");
  }
  if (!slug) slug = "project-" + Date.now();
  const project = {
    id: uuidv4(),
    title: req.body.title || "",
    slug,
    shortDescription: req.body.shortDescription || "",
    description: req.body.description || "",
    button: "View Project",
    variant: req.body.variant || "dashboard",
    isFeatured: req.body.isFeatured || false,
    problem: req.body.problem || "",
    solution: req.body.solution || "",
    features: req.body.features || [],
    techStack: req.body.techStack || [],
    challenges: req.body.challenges || [],
    results: req.body.results || "",
    timeline: req.body.timeline || "",
    liveUrl: req.body.liveUrl || "",
    githubUrl: req.body.githubUrl || "",
    screenshots: req.body.screenshots || { desktop: null, tablet: null, mobile: null },
    createdAt: new Date().toISOString(),
  };
  projects.push(project);
  writeProjects(projects);
  res.status(201).json(project);
});

projectsRouter.put("/:id", requireAuth, (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Project not found" });

  const updated = { ...projects[index], ...req.body, id: req.params.id };
  projects[index] = updated;
  writeProjects(projects);
  res.json(updated);
});

projectsRouter.delete("/:id", requireAuth, (req, res) => {
  let projects = readProjects();
  projects = projects.filter((p) => p.id !== req.params.id);
  writeProjects(projects);
  res.json({ success: true });
});

projectsRouter.put("/:id/screenshots/:type", requireAuth, (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Project not found" });

  const { type } = req.params;
  if (!["desktop", "tablet", "mobile"].includes(type)) {
    return res.status(400).json({ error: "Invalid screenshot type" });
  }

  projects[index].screenshots[type] = req.body.image;
  writeProjects(projects);
  res.json(projects[index]);
});
