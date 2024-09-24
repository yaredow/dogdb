import app from "./app";
import { createServer } from "http";

const server = createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
