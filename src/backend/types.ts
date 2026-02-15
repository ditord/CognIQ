export type Domain = 'fluid_reasoning' | 'working_memory' | 'pattern_recognition';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ItemOption {
  id: string;
  label: string;
}

export interface Item {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  prompt: string;
  options: ItemOption[];
  correctOptionId: string;
  timeLimitSeconds: number;
}

export interface Session {
  id: string;
  createdAt: string;
  answers: Record<string, string>;
}
