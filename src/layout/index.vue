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
				<template v-for="item in menuList" :key="item.name">
					<menu-item :menu-data="item" />
				</template>
			</a-menu>
		</a-layout-sider>
		<!-- 右侧 -->
		<a-layout>
			<!-- 头部区 -->
			<a-layout-header class="header-wrapper">
				<the-header v-model:collapsed="collapsed" />
			</a-layout-header>
			<!-- 内容区 -->
			<a-layout-content class="main-content">
				<tab-views />
			</a-layout-content>
			<!-- 尾部区 -->
			<!-- <a-layout-footer class="footer-wrapper">
				<the-footer />
			</a-layout-footer> -->
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
import MenuItem from "./components/MenuItem.vue";
import TabViews from "./components/TabViews.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

import { computed, defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import router, { routes } from "@/router";
import { BreadCrumbType } from "@/store/user";
import { useStore } from "vuex";
import { key } from "@/store";

interface MenuStateType {
	selectedKeys: string[];
	currentOpenKeys: string[];
	rootSubMenuKeys: string[];
}

export default defineComponent({
	name: "Layout",

	components: {
		MenuItem,
		TheHeader,
		TheFooter,
		TabViews
	},

	setup() {
		const store = useStore(key);
		/**
		 *	@description 菜单相关数据
		 */
		const menuState = reactive({
			selectedKeys: [], // 当前选中项
			currentOpenKeys: [], // 当前展开菜单
			rootSubMenuKeys: [] // 根菜单列表
		}) as MenuStateType;

		const collapsed = ref<boolean>(false); // 是否折叠

		const currentRoute = useRoute(); // 获取当前路由实例

		const menuList = computed(() => routes.find(item => item.name === "Layout")!.children); // 所有菜单列表
		menuList.value!.forEach(item => item.meta && menuState.rootSubMenuKeys.push(item.name as string));

		/**
		 * @description	subMenu展开/关闭的回调（单一展开效果）
		 */
		const onOpenChange = (openKeys: string[]) => {
			const latestOpenKey = openKeys[openKeys.length - 1];
			if (menuState.rootSubMenuKeys.indexOf(latestOpenKey!) === -1) {
				menuState.currentOpenKeys = openKeys;
			} else {
				menuState.currentOpenKeys = latestOpenKey ? [latestOpenKey] : [];
			}
		};

		/**
		 * @description	点击MenuItem的回调（进行路由跳转）
		 */
		const onClicktItem = ({ _, key }) => {
			router.push({ name: key });
		};

		/**
		 * @description	获取菜单当前选中项和展开项
		 */
		const getMenuCurrentKeys = () => {
			menuState.selectedKeys = [currentRoute.name as string];
			menuState.currentOpenKeys = currentRoute.matched.map(item => item.name as string);
		};

		/**
		 * @description 监听菜单折叠和路由变化
		 */
		watch(
			() => [collapsed.value, currentRoute.fullPath],
			([newCollapsed]) => {
				!newCollapsed && getMenuCurrentKeys(); // 解决菜单折叠状态下，点击MenuItem不失焦问题
				/**
				 * @description 动态改变面包屑
				 */
				const breadcrumbItems: BreadCrumbType[] = currentRoute.matched.map(item => ({
					path: item.path,
					title: item.meta.title as string
					// isLink: item.name === 'Home' || !item.children.length	// 看看是否需要禁止跳转
				}));

				store.commit("user/changeBreadCrumbItems", breadcrumbItems);
			},
			{ immediate: true }
		);

		return {
			collapsed,
			menuList,
			...toRefs(menuState),
			onOpenChange,
			onClicktItem
		};
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

	:deep(.ant-menu) {
		span {
			white-space: nowrap;
		}
		.ant-menu-item {
			margin-top: 0 !important;
		}
	}

	// 头部
	.header-wrapper {
		padding: 0 16px;
		background: #fff;
		border-bottom: 1px solid #eee;
	}

	// 尾部
	.footer-wrapper {
		text-align: center;
	}
}
</style>
