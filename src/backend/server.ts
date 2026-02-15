import { buildApp } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const host = '0.0.0.0';

const app = await buildApp();
await app.listen({ port, host });

console.log(`CognIQ API running at http://localhost:${port}`);
