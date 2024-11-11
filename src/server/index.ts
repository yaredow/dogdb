import { Hono } from "hono";
import { createNodeWebSocket } from "@hono/node-ws";

const app = new Hono();

const { upgradeWebSocket } = createNodeWebSocket({ app });

export const wsApp = app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`message from client" ${event.data}`);
        ws.send("Hello from server");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  }),
);

export default app;
