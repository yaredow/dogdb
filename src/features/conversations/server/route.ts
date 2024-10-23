import { Hono } from "hono";

const app = new Hono().post("/startConversation/:conversationId");

export default app;
