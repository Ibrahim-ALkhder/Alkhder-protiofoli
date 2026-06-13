import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { requireAuth } from "./auth.js";
import { getDb } from "../database.js";

export const projectsRouter = Router();

projectsRouter.get("/", (req, res) => {
  try {
    const db = getDb();
    const projects = db.prepare("SELECT * FROM projects ORDER BY createdAt DESC").all();
    const parsed = projects.map(p => ({
      ...p,
      isFeatured: !!p.isFeatured,
      features: JSON.parse(p.features),
      techStack: JSON.parse(p.techStack),
      challenges: JSON.parse(p.challenges),
      screenshots: JSON.parse(p.screenshots)
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

projectsRouter.get("/:id", (req, res) => {
  try {
    const db = getDb();
    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    project.isFeatured = !!project.isFeatured;
    project.features = JSON.parse(project.features);
    project.techStack = JSON.parse(project.techStack);
    project.challenges = JSON.parse(project.challenges);
    project.screenshots = JSON.parse(project.screenshots);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

projectsRouter.post("/", requireAuth, (req, res) => {
  try {
    const db = getDb();
    const id = uuidv4();
    let slug = req.body.slug || "";
    if (!slug) {
      slug = req.body.title
        ?.toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .replace(/-+/g, "-");
    }
    if (!slug) slug = "project-" + Date.now();

    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO projects (id, title, slug, shortDescription, description, button, variant, isFeatured, problem, solution, features, techStack, challenges, results, timeline, liveUrl, githubUrl, screenshots, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      req.body.title || "",
      slug,
      req.body.shortDescription || "",
      req.body.description || "",
      "View Project",
      req.body.variant || "dashboard",
      req.body.isFeatured ? 1 : 0,
      req.body.problem || "",
      req.body.solution || "",
      JSON.stringify(req.body.features || []),
      JSON.stringify(req.body.techStack || []),
      JSON.stringify(req.body.challenges || []),
      req.body.results || "",
      req.body.timeline || "",
      req.body.liveUrl || "",
      req.body.githubUrl || "",
      JSON.stringify(req.body.screenshots || { desktop: null, tablet: null, mobile: null }),
      createdAt
    );

    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
    res.status(201).json({
      ...project,
      isFeatured: !!project.isFeatured,
      features: JSON.parse(project.features),
      techStack: JSON.parse(project.techStack),
      challenges: JSON.parse(project.challenges),
      screenshots: JSON.parse(project.screenshots)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

projectsRouter.put("/:id", requireAuth, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
    if (!existing) return res.status(404).json({ error: "Project not found" });

    const current = {
      ...existing,
      features: JSON.parse(existing.features),
      techStack: JSON.parse(existing.techStack),
      challenges: JSON.parse(existing.challenges),
      screenshots: JSON.parse(existing.screenshots)
    };

    const merged = { ...current, ...req.body, id: req.params.id };

    db.prepare(`
      UPDATE projects SET title=?, slug=?, shortDescription=?, description=?, button=?, variant=?, isFeatured=?, problem=?, solution=?, features=?, techStack=?, challenges=?, results=?, timeline=?, liveUrl=?, githubUrl=?, screenshots=?
      WHERE id=?
    `).run(
      merged.title, merged.slug, merged.shortDescription, merged.description, merged.button, merged.variant,
      merged.isFeatured ? 1 : 0, merged.problem, merged.solution,
      JSON.stringify(merged.features), JSON.stringify(merged.techStack), JSON.stringify(merged.challenges),
      merged.results, merged.timeline, merged.liveUrl, merged.githubUrl,
      JSON.stringify(merged.screenshots), req.params.id
    );

    const updated = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
    res.json({
      ...updated,
      isFeatured: !!updated.isFeatured,
      features: JSON.parse(updated.features),
      techStack: JSON.parse(updated.techStack),
      challenges: JSON.parse(updated.challenges),
      screenshots: JSON.parse(updated.screenshots)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

projectsRouter.delete("/:id", requireAuth, (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

projectsRouter.put("/:id/screenshots/:type", requireAuth, (req, res) => {
  try {
    const db = getDb();
    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const { type } = req.params;
    if (!["desktop", "tablet", "mobile"].includes(type)) {
      return res.status(400).json({ error: "Invalid screenshot type" });
    }

    const screenshots = JSON.parse(project.screenshots);
    screenshots[type] = req.body.image;

    db.prepare("UPDATE projects SET screenshots = ? WHERE id = ?").run(JSON.stringify(screenshots), req.params.id);
    res.json(screenshots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
