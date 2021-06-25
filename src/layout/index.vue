<template>
	<a-layout class="layout-wrapper">
		<!-- 左侧 -->
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible theme="dark">
			<!-- logo区 -->
			<h1 class="logo">
				<img src="@/assets/logo.png" alt="fandow" width="50" />
				<span class="title" :hidden="collapsed">凡岛网络</span>
			</h1>
			<!-- 导航区 -->
			<a-menu
				v-model:selectedKeys="selectedKeys"
				v-model:openKeys="currentOpenKeys"
				@openChange="onOpenChange"
				@click="onClicktItem"
				mode="inline"
				theme="dark"
			>
				<template v-for="pItem in menuList" :key="pItem.name">
					<menu-item :menu-data="pItem" />
				</template>
			</a-menu>
		</a-layout-sider>
		<!-- 右侧 -->
		<a-layout>
			<!-- 头部区 -->
			<a-layout-header class="header-wrapper">
				<div>
					<span class="menu-fold" @click="collapsed = !collapsed">
						<component :is="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
					</span>
				</div>
			</a-layout-header>
			<!-- 内容区 -->
			<a-layout-content class="main-content">
				<tab-views />
			</a-layout-content>
			<!-- 尾部区 -->
			<a-layout-footer class="footer-wrapper">
				<div>
					本公众号店铺首页链接为：
					<a target="_blank" href="http://viplocal.wismall.com/shop/default/createNewUrl/token/547bcb48040a7.html"
						>http://viplocal.wismall.com/shop/default/createNewUrl/token/547bcb48040a7.html</a
					>
				</div>
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
import MenuItem from "./components/menu-item.vue";
import TabViews from "./components/tab-views.vue";

import {
	PieChartOutlined,
	DesktopOutlined,
	UserOutlined,
	TeamOutlined,
	FileOutlined,
	DownOutlined,
	FieldTimeOutlined,
	PayCircleOutlined,
	UsergroupAddOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined
} from "@ant-design/icons-vue";

import { computed, defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router, { routes } from "@/router";

export default defineComponent({
	name: "layout",

	components: {
		MenuItem,
		TabViews,
		PieChartOutlined,
		DesktopOutlined,
		UserOutlined,
		TeamOutlined,
		FileOutlined,
		DownOutlined,
		FieldTimeOutlined,
		PayCircleOutlined,
		UsergroupAddOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined
	},

	setup() {
		const currentRoute = useRoute();
		const collapsed = ref<boolean>(false);
		const selectedKeys = ref<string[]>([]);
		const currentOpenKeys = ref<string[]>([]); // 当前展开菜单
		const rootSubmenuKeys = ref<string[]>([]); // 根菜单列表
		const menuList = computed(() => routes.find(item => item.name === "home")!.children);

		menuList.value!.forEach(item => item.meta && rootSubmenuKeys.value.push(item.name as string));

		/**
		 * @description	subMenu展开/关闭的回调（单一展开效果）
		 */
		const onOpenChange = (openKeys: string[]) => {
			const latestOpenKey = openKeys[openKeys.length - 1];
			if (rootSubmenuKeys.value.indexOf(latestOpenKey!) === -1) {
				currentOpenKeys.value = openKeys;
			} else {
				currentOpenKeys.value = latestOpenKey ? [latestOpenKey] : [];
			}
		};

		/**
		 * @description	点击MenuItem的回调（进行路由跳转）
		 */
		const onClicktItem = ({ item, key, keyPath }) => {
			router.push({ name: key });
		};

		// 监听路由变化（获取实时的菜单展开和选中项）
		watch(
			() => currentRoute.fullPath,
			() => {
				selectedKeys.value = [currentRoute.name as string];
				currentOpenKeys.value = currentRoute.matched.map(item => item.name as string);
			},
			{ immediate: true }
		);

		return { collapsed, menuList, currentOpenKeys, selectedKeys, onOpenChange, onClicktItem };
	}
});
</script>

<style lang="less" scoped>
.layout-wrapper {
	min-height: 100vh;

	// logo
	.logo {
		width: 100%;
		height: 64px;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		background: #001529;

		img {
			vertical-align: middle;
		}

		.title {
			font-size: 18px;
			padding-left: 12px;
			white-space: nowrap;
		}
	}

	// 侧边导航
	.site-layout-background {
		background: #fff;
	}

	:deep(.ant-menu) .ant-menu-item {
		margin-top: 0 !important;
	}

	// 内容
	.main-content {
		margin: 0 16px;
	}

	// 头部
	.header-wrapper {
		padding: 0 16px;
		background: #fff;
		border-bottom: 1px solid #eee;

		.menu-fold {
			cursor: pointer;
			font-size: 18px;
		}
	}

	// 尾部
	.footer-wrapper {
		text-align: center;
	}
}
</style>
