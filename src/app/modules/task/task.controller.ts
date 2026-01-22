import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TaskServices } from "./task.service";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await TaskServices.createTask(req.body, user.organizationId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Task created and assigned successfully",
    data: result,
  });
});

const getMyTasks = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await TaskServices.getTasks(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tasks retrieved successfully",
    data: result,
  });
});

export const TaskControllers = {
  createTask,
  getMyTasks,
};