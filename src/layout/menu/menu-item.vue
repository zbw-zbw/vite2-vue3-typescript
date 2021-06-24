<template>
	<template v-if="menuInfo.meta">
		<!-- 有子路由的 -->
		<a-sub-menu v-if="menuInfo.children" :key="menuInfo.name">
			<template #title>
				<span>
					<user-outlined />
					{{ menuInfo.meta.title }}
				</span>
			</template>
			<template v-for="item in menuInfo.children" :key="item.name">
				<template v-if="!item.children">
					<a-menu-item :key="item.name">
						<span>{{ item.meta.title }}</span>
					</a-menu-item>
				</template>
				<template v-else>
					<menu-item :key="item.name" :menu-info="item" />
				</template>
			</template>
		</a-sub-menu>
		<!-- 没有子路由的 -->
		<a-menu-item v-else :key="menuInfo.name">
			<component :is="menuInfo.meta.icon" />
			<span> {{ menuInfo.meta.title }} </span>
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
	FieldTimeOutlined
} from "@ant-design/icons-vue";
import { Menu } from "ant-design-vue";

export default defineComponent({
	name: "menu-item",
	components: {
		'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item,
		PieChartOutlined,
		DesktopOutlined,
		UserOutlined,
		TeamOutlined,
		FileOutlined,
		DownOutlined,
		FieldTimeOutlined
	},
	props: {
		menuInfo: {
			type: Object,
			default: () => ({})
		}
	},
	setup() {}
});
</script>

<style lang="less" scoped></style>
