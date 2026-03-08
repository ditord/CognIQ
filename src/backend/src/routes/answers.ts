import { FastifyInstance } from "fastify";
import {
  getSession,
  saveAnswer,
  getSessionAnswers,
  completeSession,
} from "../db.js";
import { getItems } from "../items.js";
import { calculateScore } from "../scoring.js";

export async function answerRoutes(app: FastifyInstance) {
  app.post<{
    Params: { id: string };
    Body: { itemId: string; selectedOption: number };
  }>("/api/sessions/:id/answers", async (request, reply) => {
    const session = getSession(request.params.id);
    if (!session) {
      reply.code(404).send({ error: "Session not found" });
      return;
    }
    if (session.completed_at) {
      reply.code(400).send({ error: "Session already completed" });
      return;
    }

    const { itemId, selectedOption } = request.body;
    const items = getItems();
    const item = items.find((i) => i.id === itemId);
    if (!item) {
      reply.code(400).send({ error: "Invalid item ID" });
      return;
    }

    const isCorrect = selectedOption === item.correctOption;
    saveAnswer(request.params.id, itemId, selectedOption, isCorrect);

    reply.code(201).send({ isCorrect });
  });

  app.get<{ Params: { id: string } }>(
    "/api/sessions/:id/results",
    async (request, reply) => {
      const session = getSession(request.params.id);
      if (!session) {
        reply.code(404).send({ error: "Session not found" });
        return;
      }

      const answers = getSessionAnswers(request.params.id);
      const items = getItems();
      const totalCount = items.length;
      const correctCount = answers.filter((a) => a.is_correct === 1).length;

      // Auto-complete the session if not already completed
      if (!session.completed_at) {
        const result = calculateScore(correctCount, totalCount);
        completeSession(
          request.params.id,
          result.iqEstimate,
          totalCount,
          correctCount
        );
      }

      const result = calculateScore(correctCount, totalCount);
      reply.send(result);
    }
  );
}
