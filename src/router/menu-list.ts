/**
 * @description 导航区路由
 */
export default [
	{
		path: "/demo",
		name: "demo",
		component: (/* webpackChunkName: "demo" */) => import("@/views/demo/index.vue"),
		meta: {
			title: "写个demo",
			icon: "PieChartOutlined"
		}
	},
	{
		path: "/shop-design",
		name: "shop-design",
		component: () => import("@/views/shop-design/index.vue"),
		meta: {
			title: "店铺管理",
			icon: "PieChartOutlined"
		},
		children: [
			{
				path: "/shop-design/index",
				name: "shop-design-index",
				component: () => import("@/views/shop-design/index.vue"),
				meta: {
					title: "首页设计",
					icon: "UserOutlined"
				}
			}
		]
	},
	{
		path: "/goods",
		name: "goods",
		component: () => import("@/views/goods/index.vue"),
		meta: {
			title: "商品管理",
			icon: "DesktopOutlined"
		},
		children: [
			{
				path: "/goods/allGoods",
				name: "all-goods",
				component: () => import("@/views/goods/index.vue"),
				meta: {
					title: "所有商品",
					icon: "PieChartOutlined"
				},
				children: [
					{
						path: "/goods/hzp",
						name: "hzp",
						component: () => import("@/views/goods/index.vue"),
						meta: {
							title: "化妆品",
							icon: "TeamOutlined"
						}
					}
				]
			}
		]
	},
	{
		path: "/member",
		name: "member",
		component: () => import("@/views/member/index.vue"),
		meta: {
			title: "会员中心",
			icon: "UserOutlined"
		}
	},
	{
		path: "/activity",
		name: "activity",
		component: () => import("@/views/activity/index.vue"),
		meta: {
			title: "活动管理",
			icon: "TeamOutlined"
		}
	},
	{
		path: "/order",
		name: "order",
		component: () => import("@/views/order/index.vue"),
		meta: {
			title: "订单管理",
			icon: "PayCircleOutlined"
		}
	},
	{
		path: "/fans",
		name: "fans",
		component: () => import("@/views/fans/index.vue"),
		meta: {
			title: "粉丝管理",
			icon: "FileOutlined"
		}
	}
];
