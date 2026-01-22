import { Types } from "mongoose";

// 1. User Role Enum
export enum UserRole {
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  ORG_ADMIN = "ORG_ADMIN",
  MEMBER = "MEMBER",
}

// 2. User Interface
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organizationId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
