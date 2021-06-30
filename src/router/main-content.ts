/**
 * @description 侧边导航区的所有路由
 */
export default [
	{
		path: "/home",
		name: "Home",
		component: (/* webpackChunkName: "Home" */) => import("@/views/home/index.vue")
	},
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
			title: "Vuex Demo",
			icon: "PaperClipOutlined"
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
		component: () => import("@/views/shop-design/index.vue"),
		meta: {
			title: "商品管理",
			icon: "DesktopOutlined"
		},
		children: [
			{
				path: "/goods/allGoods",
				name: "AllGoods",
				component: () => import("@/views/shop-design/index.vue"),
				meta: {
					title: "所有商品",
					icon: "PieChartOutlined"
				}
			},
			{
				path: "/goods/category",
				name: "AllGoodsCategory",
				component: () => import("@/views/shop-design/index.vue"),
				meta: {
					title: "商品分类",
					icon: "PieChartOutlined"
				},
				children: [
					{
						path: "/goods/category/cosmetic",
						name: "AllGoodsCosmetic",
						component: () => import("@/views/shop-design/index.vue"),
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
		component: () => import("@/views/shop-design/index.vue"),
		meta: {
			title: "会员中心",
			icon: "UserOutlined"
		}
	},
	{
		path: "/activity",
		name: "Activity",
		component: () => import("@/views/shop-design/index.vue"),
		meta: {
			title: "活动管理",
			icon: "TeamOutlined"
		}
	},
	{
		path: "/order",
		name: "Order",
		component: (/* webpackChunkName: Order */) => import("@/views/order/index.vue"),
		meta: {
			title: "订单管理",
			icon: "PayCircleOutlined"
		}
	},
	{
		path: "/order/detail",
		name: "OrderDetail",
		component: (/* webpackChunkName: OrderDetail */) => import("@/views/order/detail.vue"),
		meta: {
			title: "订单详情",
			hidden: true
		}
	},
	{
		path: "/fans",
		name: "Fans",
		component: () => import("@/views/shop-design/index.vue"),
		meta: {
			title: "粉丝管理",
			icon: "FileOutlined"
		}
	}
];
