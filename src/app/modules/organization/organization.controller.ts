import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrganizationServices } from "./organization.service";

const createOrganization = catchAsync(async (req: Request, res: Response) => {
  const result = await OrganizationServices.createOrganization(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Organization and Admin created successfully",
    data: result,
  });
});

const getAllOrganizations = catchAsync(async (req: Request, res: Response) => {
  const result = await OrganizationServices.getAllOrganizations();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Organizations retrieved successfully",
    data: result,
  });
});

export const OrganizationControllers = {
  createOrganization,
  getAllOrganizations,
};