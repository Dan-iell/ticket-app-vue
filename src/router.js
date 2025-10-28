import { createRouter, createWebHistory } from "vue-router";

import Landing from "./pages/Landing.vue";
import AuthLogin from "./pages/AuthLogin.vue";
import AuthSignup from "./pages/AuthSignup.vue";
import Dashboard from "./pages/Dashboard.vue";
import Tickets from "./pages/Tickets.vue";

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: AuthLogin },
  { path: "/auth/signup", component: AuthSignup },
  { path: "/dashboard", component: Dashboard, meta: { auth: true } },
  { path: "/tickets", component: Tickets, meta: { auth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.auth && !localStorage.getItem("ticketapp_session")) {
    return "/auth/login";
  }
});

export default router;
