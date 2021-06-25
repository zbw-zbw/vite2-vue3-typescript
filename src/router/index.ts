import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import menuList from "./menu-list";
import errorRoute from "./error";

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/login",
		name: "login",
		component: (/* webpackChunkName: "login" */) => import("@/views/login/index.vue")
	},
	{
		path: "/home",
		name: "home",
		component: (/* webpackChunkName: "home" */) => import("@/layout/index.vue"),
		meta: { title: "首页" },
		children: [...menuList]
	},
	errorRoute
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
	next();
});

export default router;
