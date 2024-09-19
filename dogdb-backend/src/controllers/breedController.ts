import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import prisma from "../utils/prisma";
import { Request, Response, NextFunction } from "express";

export const getAllBreeds = catchAsync(
  async (resquest: Request, response: Response, next: NextFunction) => {
    const breeds = await prisma.breed.findMany();
    if (!breeds) {
      return next(new AppError("Breeds not found", 404));
    }

    return response.status(200).json({ breeds });
  },
);

export const getBreed = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id as string;
    const breed = await prisma.breed.findUnique({
      where: {
        id,
      },
    });

    if (!breed) {
      return next(new AppError("No breed found witht that id", 400));
    }

    return response.status(200).json({ breed });
  },
);
