import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ITEMS_PATH = path.join(__dirname, "..", "..", "..", "data", "items.json");

export interface Item {
  id: string;
  domain: string;
  difficulty: number;
  prompt: string;
  options: string[];
  correctOption: number;
  timeLimit: number;
}

let items: Item[] | null = null;

export function getItems(): Item[] {
  if (!items) {
    const raw = readFileSync(ITEMS_PATH, "utf-8");
    items = JSON.parse(raw) as Item[];
  }
  return items;
}
