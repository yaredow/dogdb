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
exports.verifyRefreshToken = exports.logout = exports.signin = exports.signUp = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const db_1 = __importDefault(require("../lib/db/db"));
const appError_1 = __importDefault(require("../utils/appError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const slugify_1 = __importDefault(require("slugify"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = require("../utils/cookie");
exports.signUp = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    const { firstName, lastName, password, passwordConfirm, email, breed } = body;
    const existingUser = yield db_1.default.user.findUnique({
        where: { email: body.email },
    });
    if (existingUser) {
        return next(new appError_1.default("Email address is already in use", 409));
    }
    if (passwordConfirm !== passwordConfirm) {
        return next(new appError_1.default("Password do not match! Please try again", 400));
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const userName = email.split("@")[0];
    const user = yield db_1.default.user.create({
        data: {
            firstName,
            lastName,
            email,
            userName,
            password: hashedPassword,
        },
    });
    if (!user) {
        return next(new appError_1.default("user creation failed", 400));
    }
    if (breed && breed.length > 0) {
        const breedRecord = yield Promise.all(breed.map((breedItem) => __awaiter(void 0, void 0, void 0, function* () {
            const breedSlug = (0, slugify_1.default)(breedItem.value, { lower: true });
            return yield db_1.default.breed.findFirst({
                where: {
                    slug: breedSlug,
                },
            });
        })));
        const validBreeds = breedRecord.filter((breed) => breed !== null);
        yield Promise.all(validBreeds.map((breed) => __awaiter(void 0, void 0, void 0, function* () {
            if (breed) {
                yield db_1.default.userBreed.create({
                    data: {
                        userId: user.id,
                        breedId: breed.id,
                    },
                });
            }
        })));
        if (validBreeds.length === 0) {
            return next(new appError_1.default("Invalid breeds selected", 400));
        }
    }
    (0, cookie_1.createTokenAndSend)(user, 201, response);
}));
exports.signin = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const { password, email } = data;
    const existingUser = yield db_1.default.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!existingUser || !existingUser.password) {
        return next(new appError_1.default("User doesn't exist", 404));
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return next(new appError_1.default("Wrong credentials", 401));
    }
    (0, cookie_1.createTokenAndSend)(existingUser, 200, response);
}));
exports.logout = (0, catchAsync_1.catchAsync)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    response.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return response.status(200).json({ message: "Logged out successfully" });
}));
exports.verifyRefreshToken = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = request.params.refreshToken;
    if (!refreshToken) {
        return next(new appError_1.default("Please provide a refresh token!", 400));
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const currentUser = yield db_1.default.user.findUnique({
        where: { id: decoded.id },
    });
    if (!currentUser) {
        return next(new appError_1.default("The user doesn't exist anymore", 401));
    }
    (0, cookie_1.createTokenAndSend)(currentUser, 200, response, true);
}));
