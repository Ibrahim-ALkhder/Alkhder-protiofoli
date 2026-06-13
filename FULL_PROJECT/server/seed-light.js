import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initDatabase, getDb } from "./database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");

initDatabase();
const db = getDb();

function isBase64(str) {
  return typeof str === "string" && str.startsWith("data:");
}

function migrateProjectsLight() {
  const filePath = path.join(DATA_DIR, "projects.json");
  if (!fs.existsSync(filePath)) { console.log("projects.json not found, skipping"); return; }

  const projects = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const insert = db.prepare(`
    INSERT OR REPLACE INTO projects (id, title, slug, shortDescription, description, button, variant, isFeatured, problem, solution, features, techStack, challenges, results, timeline, liveUrl, githubUrl, screenshots, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction((items) => {
    for (const p of items) {
      const screenshots = p.screenshots || {};
      const cleanScreenshots = {
        desktop: isBase64(screenshots.desktop) ? null : screenshots.desktop || null,
        tablet: isBase64(screenshots.tablet) ? null : screenshots.tablet || null,
        mobile: isBase64(screenshots.mobile) ? null : screenshots.mobile || null
      };

      insert.run(
        p.id, p.title, p.slug, p.shortDescription || "", p.description || "", p.button || "View Project",
        p.variant || "dashboard", p.isFeatured ? 1 : 0, p.problem || "", p.solution || "",
        JSON.stringify(p.features || []), JSON.stringify(p.techStack || []), JSON.stringify(p.challenges || []),
        p.results || "", p.timeline || "", p.liveUrl || "", p.githubUrl || "",
        JSON.stringify(cleanScreenshots), p.createdAt || new Date().toISOString()
      );
    }
  });

  tx(projects);
  console.log(`Migrated ${projects.length} projects (text only, no base64 screenshots)`);
}

function migrateCertificatesLight() {
  const filePath = path.join(DATA_DIR, "certificates.json");
  if (!fs.existsSync(filePath)) { console.log("certificates.json not found, skipping"); return; }

  const certs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const insert = db.prepare(`
    INSERT OR REPLACE INTO certificates (id, title, issuer, issued, credentialLink, thumbnail, description, category, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction((items) => {
    for (const c of items) {
      insert.run(c.id, c.title, c.issuer || "", c.issued || "", c.credentialLink || "",
        isBase64(c.thumbnail) ? "" : c.thumbnail || "",
        c.description || "", c.category || "Other", c.createdAt || new Date().toISOString());
    }
  });

  tx(certs);
  console.log(`Migrated ${certs.length} certificates (text only, no base64 thumbnails)`);
}

function migrateCvLight() {
  const filePath = path.join(DATA_DIR, "cv.json");
  if (!fs.existsSync(filePath)) { console.log("cv.json not found, skipping"); return; }

  const cv = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  db.prepare("DELETE FROM cv").run();
  db.prepare("INSERT INTO cv (url, filename, updatedAt) VALUES (?, ?, ?)").run(cv.url || "/Ibrahim-CV.pdf", "Ibrahim-CV.pdf", new Date().toISOString());
  console.log("Migrated CV");
}

migrateProjectsLight();
migrateCertificatesLight();
migrateCvLight();
console.log("Light seed completed successfully!");
