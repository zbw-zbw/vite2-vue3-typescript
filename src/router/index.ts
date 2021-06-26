import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/css/nprogress.css";

import mainContent from "./main-content";
import errorRoutes from "./error";
import { getLocalStorage } from "@/utils/storage";

NProgress.configure({ showSpinner: false }); // 关闭loading（转圈圈）

export const defaultRoute = "/demo"; // 登录后默认跳转的页面

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: defaultRoute
	},
	{
		path: defaultRoute,
		name: "Home",
		component: (/* webpackChunkName: "Home" */) => import("@/layout/index.vue"),
		meta: { title: "首页" },
		children: [...mainContent]
	},
	{
		path: "/login",
		name: "Login",
		component: (/* webpackChunkName: "Login" */) => import("@/views//login/index.vue")
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
		to.name === "Login" ? next(defaultRoute) : next();
	} else {
		to.name === "Login" ? next() : next({ path: "/login", query: { redirect: to.fullPath }, replace: true });
	}
	NProgress.done();
});

// 动态改变页面标题
router.afterEach(to => {
	document.title = (to.meta?.title as string) || document.title;
});

export default router;
