import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/login" // 重定向
	},
	{
		path: "/login",
		name: "login",
		component: (/* webpackChunkName: "login" */) => import("@/views/login.vue") // 路由懒加载
	},
	{
		path: "/home",
		name: "home",
		component: (/* webpackChunkName: "home" */) => import("@/views/home.vue") // 路由懒加载
	},
	{
		path: "/detail",
		name: "detail",
		component: (/* webpackChunkName: "detail" */) => import("@/views/detail.vue")
	}
];

const router = createRouter({
	history: createWebHashHistory(), // hash模式（history模式则引入createWebHistory）
	routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
	// console.log(to, from);
	next();
});

export default router;
