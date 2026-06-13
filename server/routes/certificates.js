import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { requireAuth } from "./auth.js";
import { getDb } from "../database.js";

export const certificatesRouter = Router();

certificatesRouter.get("/", (req, res) => {
  try {
    const db = getDb();
    const certificates = db.prepare("SELECT * FROM certificates ORDER BY createdAt DESC").all();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

certificatesRouter.get("/:id", (req, res) => {
  try {
    const db = getDb();
    const cert = db.prepare("SELECT * FROM certificates WHERE id = ?").get(req.params.id);
    if (!cert) return res.status(404).json({ error: "Certificate not found" });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

certificatesRouter.post("/", requireAuth, (req, res) => {
  try {
    const db = getDb();
    const id = uuidv4();
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO certificates (id, title, issuer, issued, credentialLink, thumbnail, description, category, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      req.body.title || "",
      req.body.issuer || "",
      req.body.issued || "",
      req.body.credentialLink || "",
      req.body.thumbnail || "",
      req.body.description || "",
      req.body.category || "Other",
      createdAt
    );

    const cert = db.prepare("SELECT * FROM certificates WHERE id = ?").get(id);
    res.status(201).json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

certificatesRouter.put("/:id", requireAuth, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare("SELECT * FROM certificates WHERE id = ?").get(req.params.id);
    if (!existing) return res.status(404).json({ error: "Certificate not found" });

    db.prepare(`
      UPDATE certificates SET title=?, issuer=?, issued=?, credentialLink=?, thumbnail=?, description=?, category=?
      WHERE id=?
    `).run(
      req.body.title || existing.title,
      req.body.issuer || existing.issuer,
      req.body.issued || existing.issued,
      req.body.credentialLink || existing.credentialLink,
      req.body.thumbnail || existing.thumbnail,
      req.body.description || existing.description,
      req.body.category || existing.category,
      req.params.id
    );

    const updated = db.prepare("SELECT * FROM certificates WHERE id = ?").get(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

certificatesRouter.delete("/:id", requireAuth, (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare("DELETE FROM certificates WHERE id = ?").run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: "Certificate not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
