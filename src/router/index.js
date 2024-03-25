import { createRouter, createWebHashHistory } from "vue-router";
import daybookRouter from "@/modules/daybook/router";
import authRouter from "@/modules/auth/router";
const routes = [
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "/daybook",
    ...daybookRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
