import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  setAuthCookie(res, result.accessToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: {
      user: result.rest,
      accessToken: result.accessToken,
    },
  });
});

export const AuthControllers = {
  login,
};
