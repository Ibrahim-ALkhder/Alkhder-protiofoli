import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { requireAuth } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "certificates.json");

function readCertificates() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeCertificates(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export const certificatesRouter = Router();

certificatesRouter.get("/", (req, res) => {
  const certificates = readCertificates();
  res.json(certificates);
});

certificatesRouter.get("/:id", (req, res) => {
  const certificates = readCertificates();
  const cert = certificates.find((c) => c.id === req.params.id);
  if (!cert) return res.status(404).json({ error: "Certificate not found" });
  res.json(cert);
});

certificatesRouter.post("/", requireAuth, (req, res) => {
  const certificates = readCertificates();
  const cert = {
    id: uuidv4(),
    title: req.body.title || "",
    issuer: req.body.issuer || "",
    issued: req.body.issued || "",
    credentialLink: req.body.credentialLink || "",
    thumbnail: req.body.thumbnail || null,
    description: req.body.description || "",
    category: req.body.category || "Other",
    createdAt: new Date().toISOString(),
  };
  certificates.push(cert);
  writeCertificates(certificates);
  res.status(201).json(cert);
});

certificatesRouter.put("/:id", requireAuth, (req, res) => {
  const certificates = readCertificates();
  const index = certificates.findIndex((c) => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Certificate not found" });

  const updated = { ...certificates[index], ...req.body, id: req.params.id };
  certificates[index] = updated;
  writeCertificates(certificates);
  res.json(updated);
});

certificatesRouter.delete("/:id", requireAuth, (req, res) => {
  let certificates = readCertificates();
  certificates = certificates.filter((c) => c.id !== req.params.id);
  writeCertificates(certificates);
  res.json({ success: true });
});
