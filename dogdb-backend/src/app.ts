import express from "express";
import dotenv from "dotenv";
import breedRoiRoute from "./routes/breed";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.use(express.json());

app.use("/api/v1/breed", breedRoiRoute);

export default app;
