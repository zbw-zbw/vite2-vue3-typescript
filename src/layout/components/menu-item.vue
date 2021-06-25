<template>
	<template v-if="menuData.meta">
		<!-- 判断是否有子路由 -->
		<a-sub-menu v-if="menuData.children?.length" :key="menuData.name">
			<template #title>
				<component :is="menuData.meta.icon"></component>
				<span>{{ menuData.meta.title }}</span>
			</template>
			<template v-for="item in menuData.children" :key="item.name">
				<template v-if="!item.children">
					<a-menu-item :key="item.name">
						<component :is="item.meta.icon" />
						<span>{{ item.meta.title }}</span>
					</a-menu-item>
				</template>
				<!-- 深层子路由（递归） -->
				<template v-else>
					<menu-item :key="item.name" :menu-data="item" />
				</template>
			</template>
		</a-sub-menu>
		<!-- 无子路由直接渲染 -->
		<a-menu-item v-else :key="menuData.name">
			<component :is="menuData.meta.icon" />
			<span> {{ menuData.meta.title }} </span>
		</a-menu-item>
	</template>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import {
	PieChartOutlined,
	DesktopOutlined,
	UserOutlined,
	TeamOutlined,
	FileOutlined,
	DownOutlined,
	FieldTimeOutlined,
	PayCircleOutlined,
	UsergroupAddOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
	name: "menu-item",
	components: {
		PieChartOutlined,
		DesktopOutlined,
		UserOutlined,
		TeamOutlined,
		FileOutlined,
		DownOutlined,
		FieldTimeOutlined,
		PayCircleOutlined,
		UsergroupAddOutlined
	},
	props: {
		menuData: {
			type: Object,
			default: () => ({})
		}
	},
	setup() {}
});
</script>

<style lang="less" scoped></style>
