import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload; // Middleware থেকে পাওয়া

  const result = await ProjectServices.createProject(req.body, user.organizationId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: result,
  });
});

const getMyProjects = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  
  const result = await ProjectServices.getMyOrgProjects(user.organizationId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getMyProjects,
};