import { FastifyInstance } from "fastify";
import { getSession, getAnsweredItemIds } from "../db.js";
import { getItems, type Item } from "../items.js";

export async function itemRoutes(app: FastifyInstance) {
  app.get<{ Params: { id: string } }>(
    "/api/sessions/:id/next-item",
    async (request, reply) => {
      const session = getSession(request.params.id);
      if (!session) {
        reply.code(404).send({ error: "Session not found" });
        return;
      }
      if (session.completed_at) {
        reply.code(400).send({ error: "Session already completed" });
        return;
      }

      const answeredIds = getAnsweredItemIds(request.params.id);
      const items = getItems();
      const nextItem = items.find((item) => !answeredIds.includes(item.id));

      if (!nextItem) {
        reply.send({
          done: true,
          currentIndex: items.length,
          totalItems: items.length,
        });
        return;
      }

      const currentIndex = items.indexOf(nextItem);

      // Don't expose correctOption to the client
      const { correctOption, ...clientItem } = nextItem;
      reply.send({
        done: false,
        item: clientItem,
        currentIndex,
        totalItems: items.length,
      });
    }
  );
}
