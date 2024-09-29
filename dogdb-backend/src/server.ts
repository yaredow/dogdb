import app from "./app";
import { createServer } from "http";

import dotenv from "dotenv";

dotenv.config();

import { initSocket } from "./socket";

const server = createServer(app);

export const io = initSocket(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
