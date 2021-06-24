<template>
	<a-layout class="layout-wrapper">
		<a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
			<!-- Logo区 -->
			<h1 class="logo">
				<img src="@/assets/logo.png" alt="fandow" width="50" />
			</h1>

			<!-- 侧边导航区 -->
			<a-menu v-model:selectedKeys="selectedKeys" mode="inline">
				<a-menu-item key="1">
					<pie-chart-outlined />
					<span>店铺管理</span>
				</a-menu-item>
				<a-menu-item key="2">
					<desktop-outlined />
					<span>粉丝管理</span>
				</a-menu-item>
				<a-sub-menu key="sub1">
					<template #title>
						<span>
							<user-outlined />
							<span>商品管理</span>
						</span>
					</template>
					<a-menu-item key="3">所有商品</a-menu-item>
					<a-menu-item key="4">商品评论列表</a-menu-item>
					<a-menu-item key="5">新人福利</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub2">
					<template #title>
						<span>
							<team-outlined />
							<span>会员中心</span>
						</span>
					</template>
					<a-menu-item key="6">优惠券管理</a-menu-item>
					<a-menu-item key="8">会员列表</a-menu-item>
				</a-sub-menu>
				<a-menu-item key="9">
					<file-outlined />
					<span>订单管理</span>
				</a-menu-item>
				<a-menu-item key="10">
					<team-outlined />
					<span>活动管理</span>
				</a-menu-item>
				<a-menu-item key="11">
					<desktop-outlined />
					<span>数据统计</span>
				</a-menu-item>
				<a-menu-item key="12">
					<user-outlined />
					<span>权限管理</span>
				</a-menu-item>
				<a-menu-item key="13">
					<pie-chart-outlined />
					<span>自定义菜单设置</span>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<!-- 头部区 -->
			<a-layout-header class="header">
				<a-row type="flex" align="middle">
					<a-col :span="8">
						<a-alert :message="now" type="success" closable showIcon>
							<template #icon>
								<field-time-outlined />
							</template>
						</a-alert>
					</a-col>
					<a-col :span="16" style="text-align: right">
						<a-space>
							<a-button type="primary" @click="togglePublic">切换活动公众号</a-button>
							<a-dropdown>
								<template #overlay>
									<a-menu @click="onClickDropItem">
										<a-menu-item key="settings"> <user-outlined />设置 </a-menu-item>
										<a-menu-item key="exit"> <user-outlined />退出 </a-menu-item>
									</a-menu>
								</template>
								<a-button type="primary">
									WISVIP（viptest公众号）
									<down-outlined />
								</a-button>
							</a-dropdown>
						</a-space>
					</a-col>
				</a-row>
			</a-layout-header>
			<a-layout-content class="main-content">
				<!-- 面包屑 -->
				<a-breadcrumb class="breadcrumb">
					<a-breadcrumb-item>
						<router-link to="/home">Home</router-link>
					</a-breadcrumb-item>
					<a-breadcrumb-item>
						<router-link to="/detail">Detail</router-link>
					</a-breadcrumb-item>
				</a-breadcrumb>

				<!-- 主内容 -->
				<div class="content-wrapper">
					<router-view />
				</div>
			</a-layout-content>

			<!-- 尾部区 -->
			<a-layout-footer class="footer-wrapper">
				本公众号店铺首页链接为：
				<a target="_blank" href="http://viplocal.wismall.com/shop/default/createNewUrl/token/547bcb48040a7.html"
					>http://viplocal.wismall.com/shop/default/createNewUrl/token/547bcb48040a7.html</a
				>
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
import {
	PieChartOutlined,
	DesktopOutlined,
	UserOutlined,
	TeamOutlined,
	FileOutlined,
	DownOutlined,
	FieldTimeOutlined
} from "@ant-design/icons-vue";
import { MenuInfo } from "ant-design-vue/lib/menu/src/interface";
import { defineComponent, onBeforeUnmount, reactive, ref, toRefs } from "vue";
import format from "@/plugins/format";

interface DataType {
	now: string;
	onClickDropItem: Function;
	collapsed: boolean;
	selectedKeys: string[];
	togglePublic: Function;
}

export default defineComponent({
	name: "App",

	components: {
		PieChartOutlined,
		DesktopOutlined,
		UserOutlined,
		TeamOutlined,
		FileOutlined,
		DownOutlined,
		FieldTimeOutlined
	},

	setup() {
		const data: DataType = reactive({
			now: format(new Date()),
			collapsed: ref<boolean>(false),
			selectedKeys: ref<string[]>(["1"]),
			onClickDropItem: ({ key }: MenuInfo) => {
				console.log(key);
			},
			togglePublic: () => {
				console.log("切换公众号");
			}
		});

		const timer = setInterval(() => {
			data.now = format(new Date());
		}, 1000);

		onBeforeUnmount(() => {
			clearInterval(timer);
		});

		// 注册一个全局的错误捕获事件
		window.addEventListener("unhandledrejection", event => {
			console.warn(`未被捕获的Promise异常: ${event.reason}`);
		});

		return { ...toRefs(data) };
	}
});
</script>

<style lang="less" scoped>
.layout-wrapper {
	min-height: 100vh;

	// logo区
	.logo {
		width: 100%;
		height: 64px;
		margin: 0;
		text-align: center;

		img {
			margin-top: 8px;
			vertical-align: middle;
		}
	}

	// 侧边导航区
	.site-layout-background {
		background: #fff;
	}

	:deep(.ant-menu) .ant-menu-item {
		margin-top: 0 !important;
	}

	// 头部区
	.header {
		padding: 0 16px;
		background: #fff;
	}

	// 内容区
	.main-content {
		margin: 0 16px;

		.breadcrumb {
			margin: 16px 0;
		}

		.content-wrapper {
			padding: 24px;
			background: #fff;
			height: calc(100vh - 188px);
			overflow: auto;
		}
	}

	// 尾部区
	.footer-wrapper {
		text-align: center;
	}
}
</style>
