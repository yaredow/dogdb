import { auth } from "@/lib/auth";
import { SessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";

const app = new Hono().get("/", SessionMiddleware, async (c) => {
  const user = c.get("user");
});

export default app;
