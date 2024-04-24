import Surreal from "surrealdb";
import * as env from "https://deno.land/std@0.223.0/dotenv/mod.ts";

await env.load({ export: true });
const domain = Deno.env.get("DATABASE_URL") ?? "http://127.0.0.1:8008/rpc";

const db = new Surreal();
await db.connect(domain, {
  namespace: "test",
  database: "test",
});
export default db;
