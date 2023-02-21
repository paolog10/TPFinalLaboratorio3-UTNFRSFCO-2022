import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import Panel from "../views/PanelView.vue";

//rutas
const routes = [
  { path: "/", name: "login", component: Login },
  { path: "/panel", name: "panel", component: Panel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
