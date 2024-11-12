import { Hono } from "hono";
import { handle } from "hono/vercel";
import authRoute from "@/features/auth/server/route";
import breedsRoute from "@/features/breeds/server/route";
import conversationsRoute from "@/features/conversations/server/route";
import usersRoute from "@/features/users/server/route";
import messageRoute from "@/features/messages/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", authRoute)
  .route("/breeds", breedsRoute)
  .route("/conversations", conversationsRoute)
  .route("/users", usersRoute)
  .route("/messages", messageRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
