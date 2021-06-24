<template>
	<a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" theme="dark">
		<template v-for="item in menuList" :key="item.name">
			<my-menu-item :menu-info="item" />
		</template>
	</a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
import MyMenuItem from "./menu-item.vue";
import {
	PieChartOutlined,
	DesktopOutlined,
	UserOutlined,
	TeamOutlined,
	FileOutlined,
	DownOutlined,
	FieldTimeOutlined
} from "@ant-design/icons-vue";

import { routes } from "@/router";
import { RouteRecordRaw } from "vue-router";

interface DataType {
	collapsed: boolean;
	selectedKeys: string[];
	openKeys: string[];
}

export default defineComponent({
	name: "menu",
	components: {
		MyMenuItem,
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
			collapsed: ref<boolean>(false),
			selectedKeys: ref<string[]>(["1"]),
			openKeys: []
		});

		const menuList: Array<RouteRecordRaw> = routes;

		return { ...toRefs(data), menuList };
	}
});
</script>

<style lang="less" scoped>
.site-layout-background {
	background: #fff;
}

:deep(.ant-menu) .ant-menu-item {
	margin-top: 0 !important;
}
</style>
