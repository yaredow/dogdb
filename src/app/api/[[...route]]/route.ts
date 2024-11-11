import { Hono } from "hono";
import { handle } from "hono/vercel";
import authRoute from "@/features/auth/server/route";
import BreedsRoute from "@/features/breeds/server/route";
import ConversationsRoute from "@/features/conversations/server/route";
import UsersRoute from "@/features/users/server/route";
import { wsApp } from "@/server";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", authRoute)
  .route("/breeds", BreedsRoute)
  .route("/conversations", ConversationsRoute)
  .route("/users", UsersRoute)
  .route("/ws", wsApp);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type WebSocketApp = typeof wsApp;
export type AppType = typeof routes;
