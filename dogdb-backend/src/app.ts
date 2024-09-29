import express from "express";
import dotenv from "dotenv";
import breedRoute from "./routes/breed";
import userRoute from "./routes/user";
import conversationRoutes from "./routes/conversations";
import messagesRoute from "./routes/messages";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://198.244.232.203:3000"],
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
app.use("/api/v1/conversation", conversationRoutes);
app.use("/api/v1/message", messagesRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
