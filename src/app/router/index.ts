import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OrganizationRoutes } from "../modules/organization/organization.route";

export const router: Router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/organization",
    route: OrganizationRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
