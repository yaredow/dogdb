"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const library_1 = require("@prisma/client/runtime/library");
const catchAsync = (fn) => {
    return (request, response, next) => {
        fn(request, response, next).catch((error) => {
            var _a;
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                console.error("Prisma error code:", error.code);
                console.error("Prisma error message:", error.message);
                let message = "Database error";
                switch (error.code) {
                    case "P2002":
                        message =
                            "Unique constraint failed on the fields: " + ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target);
                }
                return response.status(400).json({ message: message });
            }
            next(error);
        });
    };
};
exports.catchAsync = catchAsync;
