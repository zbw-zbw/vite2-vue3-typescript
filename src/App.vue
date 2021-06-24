<template>
	<config-provider>
		<router-view></router-view>
	</config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from 'ant-design-vue'

export default defineComponent({
	name: "App",
	components: { ConfigProvider },
});
</script>

<style lang="less">
@import url("@/styles/common.less");
</style>
