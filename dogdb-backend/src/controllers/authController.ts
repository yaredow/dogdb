import { Response, Request, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { SigninFormDataType, SignupFormDataType } from "../utils/shcemas";
import prisma from "../lib/db/db";
import bcrypt from "bcryptjs";
import AppError from "../utils/appError";
import { createTokenAndSend } from "../utils/cookie";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../types";

export const signin = catchAsync(
  async (
    request: Request<{}, {}, SigninFormDataType>,
    response: Response,
    next: NextFunction,
  ) => {
    const data = request.body;
    const { password, email } = data;
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser || !existingUser.password) {
      return next(new AppError("User doesn't exist", 404));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return next(new AppError("Wrong credentials", 401));
    }

    createTokenAndSend(existingUser, 200, response);
  },
);

export const signUp = catchAsync(
  async (
    request: Request<{}, {}, SignupFormDataType>,
    response: Response,
    next: NextFunction,
  ) => {
    const body = request.body;
    const { firstName, lastName, password, passwordConfirm, email, breed } =
      body;

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return next(new AppError("Email address is already in use", 409));
    }

    if (passwordConfirm !== passwordConfirm) {
      return next(new AppError("Password do not match! Please try again", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userName = email.split("@")[0];

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
      },
    });

    if (!user) {
      return next(new AppError("user creation failed", 400));
    }

    if (breed && breed.length > 0) {
      const breedRecord = await Promise.all(
        breed.map(async (breedItem) => {
          const breedSlug = slugify(breedItem.value, { lower: true });
          return await prisma.breed.findFirst({
            where: {
              slug: breedSlug,
            },
          });
        }),
      );

      const validBreeds = breedRecord.filter((breed) => breed !== null);

      await Promise.all(
        validBreeds.map(async (breed) => {
          if (breed) {
            await prisma.userBreed.create({
              data: {
                userId: user.id,
                breedId: breed.id,
              },
            });
          }
        }),
      );

      if (validBreeds.length === 0) {
        return next(new AppError("Invalid breeds selected", 400));
      }
    }
    createTokenAndSend(user, 201, response);
  },
);

export const logout = catchAsync(
  async (request: Request, response: Response) => {
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
  },
);

export const verifyRefreshToken = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const refreshToken = request.params.refreshToken as string;

    if (!refreshToken) {
      return next(new AppError("Please provide a refresh token!", 400));
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as DecodedToken;

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!currentUser) {
      return next(new AppError("The user doesn't exist anymore", 401));
    }
    createTokenAndSend(currentUser, 200, response, true);
  },
);
