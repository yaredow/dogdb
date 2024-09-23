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
exports.isFollowing = exports.isBlocked = exports.unblockUser = exports.blockUser = exports.unfollowUser = exports.followUser = exports.getBreedOwners = exports.getUserById = exports.getUserByEmail = exports.getUser = exports.getAllUsers = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = __importDefault(require("../utils/appError"));
const db_1 = __importDefault(require("../lib/db/db"));
exports.getAllUsers = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default.user.findMany();
    if (!users) {
        return next(new appError_1.default("No user found", 404));
    }
    return response.status(200).json({ users });
}));
exports.getUser = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user;
    if (!user) {
        return next(new appError_1.default("You are not logged in. Please login first", 401));
    }
    return response.status(200).json({ user });
}));
exports.getUserByEmail = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.params.email;
    const user = yield db_1.default.user.findFirst({
        where: { email },
    });
    if (!user) {
        return next(new appError_1.default("No user exists with that email", 404));
    }
    return response.status(200).json({ user });
}));
exports.getUserById = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const user = yield db_1.default.user.findUnique({
        where: { id },
        include: {
            followers: true,
            following: true,
        },
    });
    if (!user) {
        return next(new appError_1.default("No user exists with that id", 404));
    }
    return response.status(200).json({ user });
}));
exports.getBreedOwners = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const breedId = request.params.breedId;
    const email = request.query.email;
    const owners = yield db_1.default.user.findMany({
        where: {
            breeds: {
                some: {
                    breedId,
                },
            },
            email: {
                not: email,
            },
        },
        include: {
            breeds: {
                include: {
                    breed: true,
                },
            },
        },
    });
    if (!owners) {
        return next(new appError_1.default("This breed has no owners", 404));
    }
    return response.status(200).json({ owners });
}));
exports.followUser = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const followingId = request.params.followingId;
    const user = request.user;
    if (!user) {
        return next(new appError_1.default("You are not logged in. Please log in first", 401));
    }
    const existingFollow = yield db_1.default.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: user.id,
                followingId,
            },
        },
    });
    if (existingFollow) {
        return next(new appError_1.default("You are already following this user", 400));
    }
    yield db_1.default.follows.create({
        data: {
            followerId: user.id,
            followingId,
        },
    });
    return response
        .status(200)
        .json({ message: "You are now following this user" });
}));
exports.unfollowUser = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const followingId = request.params.followingId;
    const user = request.user;
    if (!user) {
        return next(new appError_1.default("You are not logged in. Please log in first", 401));
    }
    const existingFollow = yield db_1.default.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: user.id,
                followingId,
            },
        },
    });
    if (!existingFollow) {
        return next(new appError_1.default("You don't follow this user", 400));
    }
    yield db_1.default.follows.delete({
        where: {
            followerId_followingId: {
                followerId: user.id,
                followingId,
            },
        },
    });
    return response
        .status(200)
        .json({ message: "You have successfully unfollowed the user " });
}));
exports.blockUser = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blockedId = request.params.blockedId;
    const user = request.user;
    if (!user) {
        return next(new appError_1.default("You are not logged in. Please log in first", 401));
    }
    const existingBlock = yield db_1.default.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: user.id,
                blockedId,
            },
        },
    });
    if (existingBlock) {
        return next(new appError_1.default("You already blocked this user", 400));
    }
    yield db_1.default.block.create({
        data: {
            blockedId,
            blockerId: user.id,
        },
    });
    return response.status(200).json({ message: "User successfully blocked" });
}));
exports.unblockUser = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user;
    const blockedId = request.params.blockedId;
    if (!user) {
        return next(new appError_1.default("You are not logged in. Please login first", 401));
    }
    const existingBlock = yield db_1.default.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: user.id,
                blockedId,
            },
        },
    });
    if (existingBlock) {
        yield db_1.default.block.delete({
            where: {
                id: existingBlock.id,
            },
        });
    }
    return response
        .status(200)
        .json({ message: "You have successfully unblocked user" });
}));
exports.isBlocked = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user;
    const blockedId = request.params.blockedId;
    if (!user) {
        return next(new appError_1.default("You are not logged in. Please login first", 401));
    }
    const blockedUser = yield db_1.default.user.findUnique({
        where: {
            id: blockedId,
        },
    });
    if (!blockedUser) {
        return next(new appError_1.default("No user exists with that id", 404));
    }
    const isBlocked = yield db_1.default.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: user.id,
                blockedId: blockedUser.id,
            },
        },
    });
    return response.status(200).json({ isBlocked: !!isBlocked });
}));
exports.isFollowing = (0, catchAsync_1.catchAsync)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user;
    const followingId = request.params.followingId;
    console.log({ followingId });
    if (!user) {
        return next(new appError_1.default("You are not logged in. Please login first", 401));
    }
    const followingUser = yield db_1.default.user.findUnique({
        where: {
            id: followingId,
        },
    });
    if (!followingUser) {
        return next(new appError_1.default("No user exists with that id", 404));
    }
    const isFollowing = yield db_1.default.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: user.id,
                followingId: followingUser.id,
            },
        },
    });
    console.log({ isFollowing });
    return response.status(200).json({ isFollowing: !!isFollowing });
}));
