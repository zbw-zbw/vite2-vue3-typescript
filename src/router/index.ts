import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/css/nprogress.css";

import menuList from "./menu-list";
import errorRoutes from "./error";
import { getLocalStorage } from "@/utils/storage";

NProgress.configure({ showSpinner: false }); // 关闭loading（转圈圈）

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/login",
		name: "login",
		component: (/* webpackChunkName: "login" */) => import("@/views//login/index.vue")
	},
	{
		path: "/home",
		name: "home",
		component: (/* webpackChunkName: "home" */) => import("@/layout/index.vue"),
		meta: { title: "首页" },
		children: [...menuList]
	},
	errorRoutes
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

// 路由守卫（主要是做一些重定向操作）
router.beforeEach((to, from, next) => {
	NProgress.start();
	const token = getLocalStorage("token");

	if (token) {
		to.name === "login" ? next("/home") : next();
	} else {
		to.name === "login" ? next() : next({ path: "/login", query: { redirect: to.fullPath }, replace: true });
	}
	NProgress.done();
});

router.afterEach(to => {
	// 动态改变页面标题
	document.title = (to.meta?.title as string) || (to.name as string) || document.title;
});

export default router;
