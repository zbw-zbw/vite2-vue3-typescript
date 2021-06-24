import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home" // 重定向
	},
	{
		path: "/home",
		name: "Home",
		component: (/* webpackChunkName: "Home" */) => import("@/views/Home.vue") // 路由懒加载
	},
	{
		path: "/detail",
		name: "Detail",
		component: (/* webpackChunkName: "Detail" */) => import("@/views/Detail.vue")
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
