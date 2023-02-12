import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import Panel from "../views/PanelView.vue";

const routes = [
    { path: "/login", component: Login },
    { path: "/panel", component: Panel },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;