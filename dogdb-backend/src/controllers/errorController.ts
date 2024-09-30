import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const handleTokenExpiredError = () =>
  new AppError("Your token has expired. Please login again!", 401);
const handleJsonWebTokenError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleInvalidStatusCode = (error: AppError, response: Response) => {
  const status = error.status || 500;
  response.status(status as number).json({
    status: "error",
    message: "Invalid Status Code",
  });
};

const handleConnectionTimeoutError = () =>
  new AppError("Connection timeout! Please try again.", 504);

const sendErrorProd = (error: AppError, response: Response) => {
  if (error.isOperational) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    response.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

const sendErrorDev = (error: AppError, response: Response) => {
  response.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const globalErrorHandler = (
  error: AppError,
  req: Request,
  response: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, response);
  } else if (process.env.NODE_ENV === "production") {
    switch (error.name) {
      case "JsonWebTokenError":
        error = handleJsonWebTokenError();
        break;
      case "TokenExpiredError":
        error = handleTokenExpiredError();
        break;
      case "ERR_HTTP_INVALID_STATUS_CODE":
        handleInvalidStatusCode(error, response);
        return;
      case "ETIMEDOUT":
        error = handleConnectionTimeoutError();
        break;
      default:
    }
    sendErrorProd(error, response);
  }
};

export default globalErrorHandler;
