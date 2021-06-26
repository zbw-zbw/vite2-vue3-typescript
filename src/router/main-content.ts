/**
 * @description 侧边导航区的所有路由
 */
export default [
	{
		path: "/personal-center",
		name: "PersonalCenter",
		component: (/* webpackChunkName: "PersonalCenter" */) => import("@/views/personal-center/index.vue"),
		meta: {
			title: "个人中心",
			hidden: true
		}
	},
	{
		path: "/demo",
		name: "Demo",
		component: (/* webpackChunkName: "Demo" */) => import("@/views/demo/index.vue"),
		meta: {
			title: "写个demo",
			icon: "PieChartOutlined"
		}
	},
	{
		path: "/shop-design",
		name: "shopDesign",
		component: () => import("@/views/shop-design/index.vue"),
		meta: {
			title: "店铺管理",
			icon: "PieChartOutlined"
		},
		children: [
			{
				path: "/shop-design/index",
				name: "shopDesignIndex",
				component: () => import("@/views/shop-design/index.vue"),
				meta: {
					title: "首页设置",
					icon: "UserOutlined"
				}
			}
		]
	},
	{
		path: "/goods",
		name: "Goods",
		component: () => import("@/views/goods/index.vue"),
		meta: {
			title: "商品管理",
			icon: "DesktopOutlined"
		},
		children: [
			{
				path: "/goods/allGoods",
				name: "AllGoods",
				component: () => import("@/views/goods/index.vue"),
				meta: {
					title: "所有商品",
					icon: "PieChartOutlined"
				}
			},
			{
				path: "/goods/category",
				name: "AllGoodsCategory",
				component: () => import("@/views/goods/index.vue"),
				meta: {
					title: "商品分类",
					icon: "PieChartOutlined"
				},
				children: [
					{
						path: "/goods/category/cosmetic",
						name: "AllGoodsCosmetic",
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
		name: "Member",
		component: () => import("@/views/member/index.vue"),
		meta: {
			title: "会员中心",
			icon: "UserOutlined"
		}
	},
	{
		path: "/activity",
		name: "Activity",
		component: () => import("@/views/activity/index.vue"),
		meta: {
			title: "活动管理",
			icon: "TeamOutlined"
		}
	},
	{
		path: "/order",
		name: "Order",
		component: () => import("@/views/order/index.vue"),
		meta: {
			title: "订单管理",
			icon: "PayCircleOutlined"
		}
	},
	{
		path: "/fans",
		name: "Fans",
		component: () => import("@/views/fans/index.vue"),
		meta: {
			title: "粉丝管理",
			icon: "FileOutlined"
		}
	}
];
