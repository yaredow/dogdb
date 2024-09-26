"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const handleTokenExpiredError = () => new appError_1.default("Your token has expired. Please login again!", 401);
const handleJsonWebTokenError = () => new appError_1.default("Invalid token. Please log in again!", 401);
const handleInvalidStatusCode = (error, response) => {
    const status = error.status || 500;
    response.status(status).json({
        status: "error",
        message: "Invalid Status Code",
    });
};
const handleConnectionTimeoutError = () => new appError_1.default("Connection timeout! Please try again.", 504);
const sendErrorProd = (error, response) => {
    if (error.isOperational) {
        response.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
    else {
        response.status(500).json({
            status: "error",
            message: "Something went very wrong",
        });
    }
};
const sendErrorDev = (error, response) => {
    response.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack,
    });
};
const globalErrorHandler = (error, req, response) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(error, response);
    }
    else if (process.env.NODE_ENV === "production") {
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
exports.default = globalErrorHandler;
