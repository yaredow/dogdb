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
exports.createTokenAndSend = void 0;
const helper_1 = require("./helper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isProduction = process.env.NODE_ENV === "production";
const signToken = (id, email, firstName, lastName, role, image, userName, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign({ id, email, firstName, lastName, role, image, userName }, secret, {
        expiresIn,
    });
};
const createTokenAndSend = (user, statusCode, response, onlyAccess) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenMaxAge = (0, helper_1.convertToMilliseconds)(process.env.JWT_ACCESS_SECRET_EXPIRES_IN);
    const refreshTokenMaxAge = (0, helper_1.convertToMilliseconds)(process.env.JWT_REFRESH_SECRET_EXPIRES_IN);
    const accessToken = signToken(user.id, user.email, user.firstName, user.lastName, user.role, user.image || "", user.userName || "", process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_SECRET_EXPIRES_IN);
    if (onlyAccess) {
        response
            .status(statusCode)
            .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
            maxAge: accessTokenMaxAge,
        })
            .json({
            status: "success",
            user,
        });
        return;
    }
    const refreshToken = signToken(user.id, user.email, user.firstName, user.lastName, user.role, user.image || "", user.userName || "", process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_SECRET_EXPIRES_IN);
    response
        .status(statusCode)
        .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: isProduction ? "strict" : "lax",
        maxAge: accessTokenMaxAge,
    })
        .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: isProduction ? "strict" : "lax",
        maxAge: refreshTokenMaxAge,
    })
        .json({
        status: "success",
        user,
    });
});
exports.createTokenAndSend = createTokenAndSend;
