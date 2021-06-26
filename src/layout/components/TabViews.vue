<template>
	<div class="tab-views">
		<!-- 面包屑 -->
		<a-breadcrumb class="breadcrumb">
			<a-breadcrumb-item>
				<router-link to="/demo">首页</router-link>
			</a-breadcrumb-item>
			<a-breadcrumb-item>店铺管理</a-breadcrumb-item>
			<a-breadcrumb-item>
				<router-link to="/shop-design/index">首页设置</router-link>
			</a-breadcrumb-item>
		</a-breadcrumb>

		<!-- 主内容 -->
		<div class="content-wrapper">
			<router-view />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: "TabViews"
});
</script>

<style lang="less" scoped>
.breadcrumb {
	margin: 16px 0;
}

.content-wrapper {
	padding: 24px;
	background: #fff;
	height: calc(100vh - 188px);
	overflow: auto;
}
</style>
