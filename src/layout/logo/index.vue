<template>
	<h1 class="logo">
		<img src="@/assets/logo.png" alt="fandow" width="50" />
		<span class="company-name">凡岛网络</span>
	</h1>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: "logo"
});
</script>

<style lang="less" scoped>
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
		margin-right: 12px;
		vertical-align: middle;
	}

	.company-name {
		font-size: 18px;
	}
}
</style>
