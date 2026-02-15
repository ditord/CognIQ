import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../backend/app.js';

describe('API session flow', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates a session, serves item, accepts answer, and returns score', async () => {
    const created = await app.inject({ method: 'POST', url: '/api/sessions' });
    expect(created.statusCode).toBe(201);

    const session = created.json() as { sessionId: string; totalItems: number };
    expect(session.sessionId).toBeTypeOf('string');
    expect(session.totalItems).toBeGreaterThan(0);

    const next = await app.inject({ method: 'GET', url: `/api/sessions/${session.sessionId}/items/next` });
    expect(next.statusCode).toBe(200);
    const nextPayload = next.json() as { done: boolean; item?: { id: string; correctOptionId?: string } };
    expect(nextPayload.done).toBe(false);
    expect(nextPayload.item?.id).toBeTypeOf('string');
    expect(nextPayload.item?.correctOptionId).toBeUndefined();

    const bad = await app.inject({
      method: 'POST',
      url: `/api/sessions/${session.sessionId}/answers`,
      payload: { itemId: nextPayload.item?.id, optionId: 'Z' }
    });
    expect(bad.statusCode).toBe(400);

    const valid = await app.inject({
      method: 'POST',
      url: `/api/sessions/${session.sessionId}/answers`,
      payload: { itemId: nextPayload.item?.id, optionId: 'A' }
    });
    expect(valid.statusCode).toBe(200);

    const score = await app.inject({ method: 'GET', url: `/api/sessions/${session.sessionId}/score` });
    expect(score.statusCode).toBe(200);
    const scorePayload = score.json() as { percent: number; total: number };
    expect(scorePayload.percent).toBeTypeOf('number');
    expect(scorePayload.total).toBeGreaterThan(0);
  });
});
