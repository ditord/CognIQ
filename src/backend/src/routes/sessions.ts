import { FastifyInstance } from "fastify";
import { createSession, getSession } from "../db.js";

export async function sessionRoutes(app: FastifyInstance) {
  app.post("/api/sessions", async (_request, reply) => {
    const session = createSession();
    reply.code(201).send(session);
  });

  app.get<{ Params: { id: string } }>(
    "/api/sessions/:id",
    async (request, reply) => {
      const session = getSession(request.params.id);
      if (!session) {
        reply.code(404).send({ error: "Session not found" });
        return;
      }
      reply.send(session);
    }
  );
}
