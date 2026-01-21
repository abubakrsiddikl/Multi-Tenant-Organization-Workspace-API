import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import AppError from "../../errorHelper/AppError";

import { User } from "./user.model";

import { IUser, UserRole } from "./user.validation";
import { envVars } from "../../config/env";

const createUser = async (payload: Partial<IUser>, creatorRole?: string, creatorOrgId?: string) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  // Password Hashing
  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
  }

  // Business Logic: Org Admin can only create users in their own organization
  if (creatorRole === UserRole.ORG_ADMIN) {
    payload.organizationId = creatorOrgId as any;
    payload.role = UserRole.MEMBER; 
  }

  const user = await User.create(payload);
  const result = await User.findById(user._id).select("-password");
  return result;
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).populate("organizationId").select("-password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  return user;
};

export const UserServices = {
  createUser,
  getMe,
};