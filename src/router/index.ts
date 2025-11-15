import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import ForgotPasswordView from "../views/auth/ForgotPasswordView.vue";
import MainLayout from "../components/layout/MainLayout.vue";
import DashboardView from "../views/DashboardView.vue";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordView,
    },

    {
        path: '/app',
        component: MainLayout,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: DashboardView,
            },

        ],
    },

    {
        path: '/:pathMatch(.*)*',
        redirect: '/login',
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
