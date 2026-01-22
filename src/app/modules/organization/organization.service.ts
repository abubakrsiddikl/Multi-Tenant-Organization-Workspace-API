import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

import { User } from "../user/user.model";

import { envVars } from "../../config/env";
import AppError from "../../errorHelper/AppError";
import { Organization } from "./oraganization.model";
import { UserRole } from "../user/user.interface";

const createOrganization = async (payload: any) => {
  const { name, address, adminName, adminEmail, adminPassword } = payload;

  // check if organization or admin user already exists
  const isOrgExist = await Organization.findOne({ name });
  if (isOrgExist)
    throw new AppError(httpStatus.BAD_REQUEST, "Organization already exists");

  const isUserExist = await User.findOne({ email: adminEmail });
  if (isUserExist)
    throw new AppError(httpStatus.BAD_REQUEST, "Admin email already in use");

  // create organization
  const newOrg = await Organization.create({ name, address });

  // hash password and create Org Admin user
  const hashedPassword = await bcryptjs.hash(
    adminPassword,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const newAdmin = await User.create({
    name: adminName,
    email: adminEmail,
    password: hashedPassword,
    role: UserRole.ORG_ADMIN,
    organizationId: newOrg._id,
  });

  return { organization: newOrg, admin: newAdmin };
};

const getAllOrganizations = async () => {
  const result = await Organization.find();
  return result;
};

export const OrganizationServices = {
  createOrganization,
  getAllOrganizations,
};
