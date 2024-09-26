"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../lib/db/db"));
const appError_1 = __importDefault(require("../utils/appError"));
const verifyToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken;
    // Check for accessToken in Authorization header
    if (request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer ")) {
        accessToken = request.headers.authorization.split("Bearer ")[1];
    }
    else {
        accessToken = request.cookies.accessToken;
    }
    if (!accessToken) {
        return next(new appError_1.default("You are not logged in. Please log in first", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const user = yield db_1.default.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return next(new appError_1.default("The account associated with this accessToken doesn't exist. Please log in again.", 401));
        }
        if (user.passwordChangedAt &&
            decoded.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)) {
            return next(new appError_1.default("User recently changed password! Please log in again.", 401));
        }
        request.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        response.status(401).json({ message: "Invalid accessToken." });
    }
});
exports.verifyToken = verifyToken;
