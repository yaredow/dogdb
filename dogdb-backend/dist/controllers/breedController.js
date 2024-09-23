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
exports.getBreed = exports.getAllBreeds = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = __importDefault(require("../utils/appError"));
const db_1 = __importDefault(require("../lib/db/db"));
exports.getAllBreeds = (0, catchAsync_1.catchAsync)((resquest, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const breeds = yield db_1.default.breed.findMany();
    if (!breeds) {
        return next(new appError_1.default("Breeds not found", 404));
    }
    return response.status(200).json({ breeds });
}));
exports.getBreed = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = request.params.slug;
    const breed = yield db_1.default.breed.findUnique({
        where: {
            slug,
        },
    });
    if (!breed) {
        return next(new appError_1.default("No breed found witht that id", 400));
    }
    return response.status(200).json({ breed });
}));
