import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/db/db";
import AppError from "../utils/appError";
import { DecodedToken } from "../types";
import { User } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  let accessToken: string;

  // Check for accessToken in Authorization header
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    accessToken = request.headers.authorization.split("Bearer ")[1];
  } else {
    accessToken = request.cookies.accessToken;
  }

  if (!accessToken) {
    return next(
      new AppError("You are not logged in. Please log in first", 401),
    );
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
    ) as DecodedToken;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(
        new AppError(
          "The account associated with this accessToken doesn't exist. Please log in again.",
          401,
        ),
      );
    }

    if (
      user.passwordChangedAt &&
      decoded.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)
    ) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401,
        ),
      );
    }

    request.user = user;
    next();
  } catch (error) {
    console.error(error);
    response.status(401).json({ message: "Invalid accessToken." });
  }
};
