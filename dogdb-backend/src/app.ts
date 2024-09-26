import express from "express";
import dotenv from "dotenv";
import breedRoute from "./routes/breed";
import userRoute from "./routes/user";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://198.244.232.203"],
    credentials: true,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());

app.use(express.json());

app.use("/api/v1/breed", breedRoute);
app.use("/api/v1/user", userRoute);

export default app;
