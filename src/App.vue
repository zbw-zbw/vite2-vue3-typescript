<template>
	<config-provider :locale="znCN">
		<router-view></router-view>
	</config-provider>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { ConfigProvider } from "ant-design-vue";
import znCN from "ant-design-vue/es/locale/zh_CN"; // antd中文包

export default defineComponent({
	name: "App",
	components: { ConfigProvider }, // 全局上下文
	setup() {
		// 注册一个全局的错误捕获事件
		const catchGlobalError = event => {
			event.preventDefault();
			console.warn(`捕获到异常: ${event.reason}`);
		};

		window.addEventListener("unhandledrejection", catchGlobalError);

		onBeforeUnmount(() => {
			window.removeEventListener("unhandledrejection", catchGlobalError);
		});

		return { znCN };
	}
});
</script>

<style lang="less">
@import url("@/styles/common.less");
</style>
