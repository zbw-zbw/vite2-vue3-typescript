<template>
	<config-provider>
		<router-view></router-view>
	</config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";

export default defineComponent({
	name: "App",
	components: { ConfigProvider }, // 全局上下文
	setup() {
		// 注册一个全局的错误捕获事件
		window.addEventListener("unhandledrejection", event => {
			event.preventDefault();
			console.warn(`捕获到异常: ${event.reason}`);
		});
	}
});
</script>

<style lang="less">
@import url("@/styles/common.less");
</style>
