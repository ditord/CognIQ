import Fastify from 'fastify';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Item, Session } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const itemsPath = join(__dirname, '..', '..', 'data', 'items.json');

const sessions = new Map<string, Session>();

const sanitizeItem = (item: Item): Omit<Item, 'correctOptionId'> => {
  const { correctOptionId, ...rest } = item;
  return rest;
};

const computeScore = (session: Session, items: Item[]) => {
  const itemsById = new Map(items.map((item) => [item.id, item]));
  let correct = 0;
  for (const [itemId, optionId] of Object.entries(session.answers)) {
    if (itemsById.get(itemId)?.correctOptionId === optionId) {
      correct += 1;
    }
  }

  const total = items.length;
  const answered = Object.keys(session.answers).length;
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);

  return {
    answered,
    total,
    correct,
    percent,
    prototypeScoreBand: percent >= 85 ? 'high' : percent >= 60 ? 'average' : 'developing'
  };
};

export const loadItems = async (): Promise<Item[]> => {
  const raw = await readFile(itemsPath, 'utf8');
  return JSON.parse(raw) as Item[];
};

export const buildApp = async () => {
  const app = Fastify({ logger: false });
  const items = await loadItems();

  app.post('/api/sessions', async (_request, reply) => {
    const session: Session = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      answers: {}
    };
    sessions.set(session.id, session);
    return reply.code(201).send({ sessionId: session.id, totalItems: items.length });
  });

  app.get('/api/sessions/:sessionId/items/next', async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const session = sessions.get(sessionId);
    if (!session) {
      return reply.code(404).send({ error: 'Not found' });
    }

    const nextItem = items.find((item) => !(item.id in session.answers));
    if (!nextItem) {
      return { done: true };
    }

    return { done: false, item: sanitizeItem(nextItem) };
  });

  app.post('/api/sessions/:sessionId/answers', async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const session = sessions.get(sessionId);
    if (!session) {
      return reply.code(404).send({ error: 'Not found' });
    }

    const body = request.body as { itemId?: string; optionId?: string };
    if (!body.itemId || !body.optionId) {
      return reply.code(400).send({ error: 'itemId and optionId are required' });
    }

    const item = items.find((candidate) => candidate.id === body.itemId);
    if (!item) {
      return reply.code(400).send({ error: 'unknown itemId' });
    }

    const optionValid = item.options.some((option) => option.id === body.optionId);
    if (!optionValid) {
      return reply.code(400).send({ error: 'invalid optionId for item' });
    }

    session.answers[body.itemId] = body.optionId;
    return { ok: true };
  });

  app.get('/api/sessions/:sessionId/score', async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const session = sessions.get(sessionId);
    if (!session) {
      return reply.code(404).send({ error: 'Not found' });
    }
    return computeScore(session, items);
  });

  return app;
};
