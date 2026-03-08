import Database from "better-sqlite3";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "..", "..", "cogniq.db");

const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT,
    score REAL,
    total_items INTEGER,
    correct_items INTEGER
  );

  CREATE TABLE IF NOT EXISTS answers (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    selected_option INTEGER NOT NULL,
    is_correct INTEGER NOT NULL,
    answered_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (session_id) REFERENCES sessions(id)
  );
`);

export function createSession(): { id: string } {
  const id = randomUUID();
  db.prepare("INSERT INTO sessions (id) VALUES (?)").run(id);
  return { id };
}

export function getSession(id: string) {
  return db.prepare("SELECT * FROM sessions WHERE id = ?").get(id) as
    | {
        id: string;
        started_at: string;
        completed_at: string | null;
        score: number | null;
        total_items: number | null;
        correct_items: number | null;
      }
    | undefined;
}

export function getAnsweredItemIds(sessionId: string): string[] {
  const rows = db
    .prepare("SELECT item_id FROM answers WHERE session_id = ?")
    .all(sessionId) as { item_id: string }[];
  return rows.map((r) => r.item_id);
}

export function saveAnswer(
  sessionId: string,
  itemId: string,
  selectedOption: number,
  isCorrect: boolean
) {
  const id = randomUUID();
  db.prepare(
    "INSERT INTO answers (id, session_id, item_id, selected_option, is_correct) VALUES (?, ?, ?, ?, ?)"
  ).run(id, sessionId, itemId, selectedOption, isCorrect ? 1 : 0);
  return { id };
}

export function getSessionAnswers(sessionId: string) {
  return db
    .prepare("SELECT * FROM answers WHERE session_id = ? ORDER BY answered_at")
    .all(sessionId) as {
    id: string;
    session_id: string;
    item_id: string;
    selected_option: number;
    is_correct: number;
    answered_at: string;
  }[];
}

export function completeSession(
  sessionId: string,
  score: number,
  totalItems: number,
  correctItems: number
) {
  db.prepare(
    "UPDATE sessions SET completed_at = datetime('now'), score = ?, total_items = ?, correct_items = ? WHERE id = ?"
  ).run(score, totalItems, correctItems, sessionId);
}

export default db;
