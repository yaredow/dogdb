import { Hono } from "hono";
import { handle } from "hono/vercel";
import BreedsRoute from "@/features/breeds/server/route";
import ConversationsRoute from "@/features/conversations/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/breeds", BreedsRoute)
  .route("/conversations", ConversationsRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
