<template>
	<a-layout class="layout-wrapper">
		<!-- 左侧 -->
		<a-layout-sider v-model:collapsed="collapsed" collapsible theme="dark">
			<!-- logo区 -->
			<logo />
			<!-- 导航区 -->
			<a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" theme="dark">
				<aside-menu />
			</a-menu>
		</a-layout-sider>
		<!-- 右侧 -->
		<a-layout>
			<!-- 头部区 -->
			<a-layout-header class="header">
				<page-header />
			</a-layout-header>

			<!-- 内容区 -->
			<a-layout-content class="main-content">
				<tab-views />
			</a-layout-content>
			<!-- 尾部区 -->
			<a-layout-footer class="footer-wrapper">
				<page-footer />
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
import PageHeader from "./header/index.vue";
import Logo from "./logo/index.vue";
import AsideMenu from "./menu/index.vue";
import TabViews from "./tab-views/index.vue";
import PageFooter from "./footer/index.vue";

import { defineComponent, ref, reactive, toRefs } from "vue";
import { Layout } from "ant-design-vue";

interface DataType {
	collapsed: boolean;
	selectedKeys: string[];
	openKeys: string[];
}

export default defineComponent({
	name: "App",

	components: {
		PageHeader,
		Logo,
		AsideMenu,
		PageFooter,
		TabViews
	},

	setup() {
		const data: DataType = reactive({
			collapsed: ref<boolean>(false),
			selectedKeys: ref<string[]>(["1"]),
			openKeys: []
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

	.header {
		padding: 0 16px;
		background: #fff;
	}
	.main-content {
		margin: 0 16px;
	}

	.footer-wrapper {
		text-align: center;
	}
}
</style>
