import { Router } from "express";
import { ProjectControllers } from "./project.controller";

import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";

const router = Router();

// org admin only create project
router.post(
  "/",
  checkAuth(UserRole.ORG_ADMIN),
  ProjectControllers.createProject
);

// org admin and member can get projects
router.get(
  "/",
  checkAuth(UserRole.ORG_ADMIN, UserRole.MEMBER),
  ProjectControllers.getMyProjects
);

export const ProjectRoutes = router;