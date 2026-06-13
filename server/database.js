import fs from "fs";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const dbPath = path.join(DATA_DIR, "portfolio.db");

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(path.join(__dirname, "uploads"), { recursive: true });

let db;

try {
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
} catch (err) {
  console.error("Failed to open database:", err.message);
  process.exit(1);
}

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      shortDescription TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      button TEXT NOT NULL DEFAULT 'View Project',
      variant TEXT NOT NULL DEFAULT 'dashboard',
      isFeatured INTEGER NOT NULL DEFAULT 0,
      problem TEXT NOT NULL DEFAULT '',
      solution TEXT NOT NULL DEFAULT '',
      features TEXT NOT NULL DEFAULT '[]',
      techStack TEXT NOT NULL DEFAULT '[]',
      challenges TEXT NOT NULL DEFAULT '[]',
      results TEXT NOT NULL DEFAULT '',
      timeline TEXT NOT NULL DEFAULT '',
      liveUrl TEXT NOT NULL DEFAULT '',
      githubUrl TEXT NOT NULL DEFAULT '',
      screenshots TEXT NOT NULL DEFAULT '{"desktop":null,"tablet":null,"mobile":null}',
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL DEFAULT '',
      issued TEXT NOT NULL DEFAULT '',
      credentialLink TEXT NOT NULL DEFAULT '',
      thumbnail TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Other',
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cv (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL DEFAULT '/Ibrahim-CV.pdf',
      filename TEXT NOT NULL DEFAULT '',
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const cvCount = db.prepare("SELECT COUNT(*) as count FROM cv").get();
  if (cvCount.count === 0) {
    db.prepare("INSERT INTO cv (url, filename) VALUES (?, ?)").run("/Ibrahim-CV.pdf", "Ibrahim-CV.pdf");
  }
}

export function getDb() {
  return db;
}

export default db;
