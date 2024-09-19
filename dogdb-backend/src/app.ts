import express from "express";
import dotenv from "dotenv";
import breedRoiRoute from "./routes/breed";

dotenv.config();

const app = express();

app.use("/api/v1/breed", breedRoiRoute);

export default app;
