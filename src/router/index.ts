import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "login",
		redirect: "/login"
	},
	{
		path: "/login",
		name: "login",
		component: (/* webpackChunkName: "login" */) => import("@/views/login.vue")
	},
	{
		path: "/home",
		name: "home",
		component: (/* webpackChunkName: "home" */) => import("@/layout/index.vue")
	},
	{
		path: "/detail",
		name: "detail",
		component: (/* webpackChunkName: "detail" */) => import("@/views/detail.vue")
	},
	{
		path: "/shop-design",
		name: "/shop-design",
		component: () => import("@/views/goods.vue"),
		meta: {
			title: "店铺管理",
			icon: "PieChartOutlined"
		}
	},
	{
		path: "/goods",
		name: "/goods",
		component: () => import("@/views/goods.vue"),
		meta: {
			title: "商品管理",
			icon: "DesktopOutlined"
		}
	},
	{
		path: "/member",
		name: "/member",
		component: () => import("@/views/goods.vue"),
		meta: {
			title: "会员中心",
			icon: "UserOutlined"
		}
	},
	{
		path: "/activity",
		name: "/activity",
		component: () => import("@/views/goods.vue"),
		meta: {
			title: "活动管理",
			icon: "TeamOutlined"
		}
	},
	{
		path: "/order",
		name: "/order",
		component: () => import("@/views/goods.vue"),
		meta: {
			title: "订单管理",
			icon: "FieldTimeOutlined"
		}
	},
	{
		path: "/order",
		name: "/order",
		component: () => import("@/views/goods.vue"),
		meta: {
			title: "公众号管理",
			icon: "DownOutlined"
		}
	},
	{
		path: "/order",
		name: "/order",
		component: () => import("@/views/goods.vue"),
		meta: {
			title: "粉丝管理",
			icon: "FileOutlined"
		}
	}
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
