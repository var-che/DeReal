import type { Handlers } from "/server.ts";
import { deleteCookie } from "https://deno.land/std@0.148.0/http/mod.ts";
import type { FreshContext } from "$fresh/server.ts";
import type { State } from "./_middleware.ts";
import db from "../utility/database.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<State>) {
    const headers = new Headers();
    await db.invalidate();
    deleteCookie(headers, "surrealLogin");
    headers.set("location", "/");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
