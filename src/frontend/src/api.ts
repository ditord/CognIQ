const BASE = "/api";

export async function createSession(): Promise<{ id: string }> {
  const res = await fetch(`${BASE}/sessions`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
}

export interface ItemResponse {
  done: boolean;
  item?: {
    id: string;
    domain: string;
    difficulty: number;
    prompt: string;
    options: string[];
    timeLimit: number;
  };
  currentIndex: number;
  totalItems: number;
}

export async function getNextItem(sessionId: string): Promise<ItemResponse> {
  const res = await fetch(`${BASE}/sessions/${sessionId}/next-item`);
  if (!res.ok) throw new Error("Failed to get next item");
  return res.json();
}

export async function submitAnswer(
  sessionId: string,
  itemId: string,
  selectedOption: number
): Promise<{ isCorrect: boolean }> {
  const res = await fetch(`${BASE}/sessions/${sessionId}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, selectedOption }),
  });
  if (!res.ok) throw new Error("Failed to submit answer");
  return res.json();
}

export interface ResultsResponse {
  iqEstimate: number;
  percentile: number;
  correctCount: number;
  totalCount: number;
  rawPercent: number;
}

export async function getResults(
  sessionId: string
): Promise<ResultsResponse> {
  const res = await fetch(`${BASE}/sessions/${sessionId}/results`);
  if (!res.ok) throw new Error("Failed to get results");
  return res.json();
}
