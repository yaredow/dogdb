import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<unknown>;

export const catchAsync = (fn: AsyncHandler) => {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response, next).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error("Prisma error code:", error.code);
        console.error("Prisma error message:", error.message);
        let message = "Database error";
        switch (error.code) {
          case "P2002":
            message =
              "Unique constraint failed on the fields: " + error.meta?.target;
        }

        return response.status(400).json({ message: message });
      }
      next(error);
    });
  };
};
