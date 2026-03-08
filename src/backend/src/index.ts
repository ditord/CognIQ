import Fastify from "fastify";
import cors from "@fastify/cors";
import { sessionRoutes } from "./routes/sessions.js";
import { itemRoutes } from "./routes/items.js";
import { answerRoutes } from "./routes/answers.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

await app.register(sessionRoutes);
await app.register(itemRoutes);
await app.register(answerRoutes);

app.get("/api/health", async () => ({ status: "ok" }));

try {
  await app.listen({ port: 3001, host: "0.0.0.0" });
  console.log("Backend running on http://localhost:3001");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
