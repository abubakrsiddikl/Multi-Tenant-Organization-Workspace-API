import { Router } from "express";
import { TaskControllers } from "./task.controller";

import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";

const router = Router();

// Org Admin can create and assign tasks
router.post("/", checkAuth(UserRole.ORG_ADMIN), TaskControllers.createTask);

// Everyone can view their permitted tasks
router.get(
  "/",
  checkAuth(UserRole.ORG_ADMIN, UserRole.MEMBER),
  TaskControllers.getMyTasks,
);

export const TaskRoutes = router;
