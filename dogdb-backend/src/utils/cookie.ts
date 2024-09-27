import { User } from "@prisma/client";
import { convertToMilliseconds } from "./helper";
import jwt from "jsonwebtoken";
import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

const signToken = (
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  role: string,
  image: string,
  userName: string,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(
    { id, email, firstName, lastName, role, image, userName },
    secret,
    {
      expiresIn,
    },
  );
};

export const createTokenAndSend = async (
  user: User,
  statusCode: number,
  response: Response,
  onlyAccess?: boolean,
) => {
  const accessTokenMaxAge = convertToMilliseconds(
    process.env.JWT_ACCESS_SECRET_EXPIRES_IN!,
  );
  const refreshTokenMaxAge = convertToMilliseconds(
    process.env.JWT_REFRESH_SECRET_EXPIRES_IN!,
  );

  const accessToken = signToken(
    user.id,
    user.email!,
    user.firstName,
    user.lastName,
    user.role,
    user.image || "",
    user.userName || "",
    process.env.JWT_ACCESS_SECRET!,
    process.env.JWT_ACCESS_SECRET_EXPIRES_IN!,
  );

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

  const refreshToken = signToken(
    user.id,
    user.email!,
    user.firstName,
    user.lastName,
    user.role,
    user.image || "",
    user.userName || "",
    process.env.JWT_REFRESH_SECRET!,
    process.env.JWT_REFRESH_SECRET_EXPIRES_IN!,
  );

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
};
