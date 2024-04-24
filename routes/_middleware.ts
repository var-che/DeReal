import { getCookies } from "https://deno.land/std@0.148.0/http/mod.ts";
import type { FreshContext } from "$fresh/server.ts";
import db from "../utility/database.ts";

export interface State {
  token: string | null;
  surrealClient: any;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const surreal = db;

  ctx.state.surrealClient = surreal;

  const surrCreds = getCookies(req.headers)["surrealLogin"];

  if (!surrCreds) {
    return ctx.next();
  }
  const thing = await surreal.authenticate(surrCreds);
  if (thing) {
    console.log("thing that we need", thing);
    ctx.state.token = surrCreds;
  } else {
    console.log("something went wrong", thing);
    ctx.state.token = null;
  }
  return await ctx.next();
}
