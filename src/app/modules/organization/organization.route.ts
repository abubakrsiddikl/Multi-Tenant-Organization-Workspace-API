import { Router } from "express";
import { OrganizationControllers } from "./organization.controller";
;
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";

const router = Router();

// Only Platform Admin can create organizations
router.post(
  "/",
  checkAuth(UserRole.PLATFORM_ADMIN),
  OrganizationControllers.createOrganization
);

// Only Platform Admin can view all organizations
router.get(
  "/",
  checkAuth(UserRole.PLATFORM_ADMIN),
  OrganizationControllers.getAllOrganizations
);

export const OrganizationRoutes = router;