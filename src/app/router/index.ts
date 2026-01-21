import { Router } from "express";

export const router: Router = Router();

const moduleRoutes = [
  {
    path: "/test",
    route: []
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
