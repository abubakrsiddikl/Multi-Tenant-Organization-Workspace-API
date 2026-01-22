import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";


const router = Router();

// Org Admin can create users within their organization
router.post(
  "/create",
//   checkAuth(UserRole.ORG_ADMIN), 
//   validateRequest(createUserZodSchema),
  UserControllers.createUser
);

// Any authenticated user can get their own profile
router.get(
  "/me",
//   checkAuth(Role.PLATFORM_ADMIN, Role.ORG_ADMIN, Role.MEMBER),
  UserControllers.getMe
);

export const UserRoutes = router;