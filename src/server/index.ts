import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { WebSocketServer } from "ws";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello from server" });
});

const server = serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
