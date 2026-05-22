import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "registrations.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");

    db.exec(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        student_id TEXT NOT NULL,
        gender TEXT NOT NULL,
        year_of_study TEXT NOT NULL,
        department TEXT NOT NULL,
        courses TEXT NOT NULL,
        schedule_preference TEXT NOT NULL,
        additional_notes TEXT,
        agreed_to_terms INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
  }
  return db;
}

export default getDb;
