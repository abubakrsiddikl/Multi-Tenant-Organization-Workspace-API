import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";
import { verifyToken } from "../utils/jwt";

import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.model";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let accessToken = req.cookies.accessToken || req.headers.authorization;
      if (accessToken?.startsWith("Bearer ")) {
        accessToken = accessToken?.split(" ")[1];
      }
      if (!accessToken) {
        throw new AppError(403, "No Token Received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET,
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!");
      }
      req.user = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role,
        organizationId: isUserExist.organizationId, 
      };
      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
