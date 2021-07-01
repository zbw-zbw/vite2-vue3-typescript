<template>
	<a-row>
		<a-col :span="16">
			<span class="menu-fold" @click="() => $emit('update:collapsed', !collapsed)">
				<component :is="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
			</span>
			<!-- 面包屑 -->
			<a-breadcrumb class="breadcrumb">
				<template v-for="item in breadcrumbItems" :key="item.path">
					<a-breadcrumb-item v-if="item.title">
						<router-link :to="item.path">{{ item.title }}</router-link>
					</a-breadcrumb-item>
				</template>
			</a-breadcrumb>
		</a-col>
		<a-col :span="8" align="right">
			<a-space size="middle" class="right-content">
				<a-tooltip placement="bottom">
					<template #title>
						<span>刷新</span>
					</template>
					<ReloadOutlined class="cur-point" @click="refresh" />
				</a-tooltip>
				<a-tooltip placement="bottom">
					<template #title>
						<span>{{ fullScreenDOM === "ExpandOutlined" ? "全屏" : "退出全屏" }}</span>
					</template>
					<component :is="fullScreenDOM" class="cur-point" @click="toggleFullScreen"></component>
				</a-tooltip>
				<a-tooltip placement="bottom">
					<template #title>
						<span>锁屏</span>
					</template>
					<LockOutlined class="cur-point" />
				</a-tooltip>
				<a-tooltip placement="bottom">
					<template #title>
						<span>暂无未读消息</span>
					</template>
					<BellOutlined class="cur-point" />
				</a-tooltip>
				<a-dropdown>
					<a-avatar
						size="large"
						class="cur-point"
						:style="{ background: avatarBgColor, verticalAlign: 'middle', marginTop: '-8px', userSelect: 'none' }"
						@click="changeUserName"
					>
						{{ userName }}
					</a-avatar>
					<template #overlay>
						<a-menu>
							<div style="padding: 5px 12px">你好，超管~</div>
							<a-menu-item @click="$router.push('/personal-center')"><UserOutlined />个人中心</a-menu-item>
							<a-menu-item @click="handleLogOut"><PoweroffOutlined />退出登录</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</a-space>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { computed, createVNode, defineComponent, ref } from "@vue/runtime-core";
import {
	UserOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	ReloadOutlined,
	LockOutlined,
	ExpandOutlined,
	CompressOutlined,
	BellOutlined,
	PoweroffOutlined,
	QuestionCircleOutlined
} from "@ant-design/icons-vue";

import { Modal } from "ant-design-vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
	name: "TheHeader",
	props: {
		collapsed: {
			type: Boolean,
			default: false
		}
	},
	components: {
		UserOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		ReloadOutlined,
		LockOutlined,
		ExpandOutlined,
		CompressOutlined,
		BellOutlined,
		PoweroffOutlined,
		QuestionCircleOutlined
	},
	setup() {
		const route = useRoute();
		const store = useStore(key);
		const breadcrumbItems = computed(() => store.getters["user/breadcrumbItems"]);

		/**
		 * @description 刷新
		 */
		const refresh = () => {
			router.replace({ name: "Redirect", params: { path: route.fullPath } });
		};

		/**
		 * @description 切换全屏
		 */
		const fullScreenDOM = ref<string>("ExpandOutlined");
		const toggleFullScreen = () => {
			if (fullScreenDOM.value === "ExpandOutlined") {
				document.documentElement.requestFullscreen();
				fullScreenDOM.value = "CompressOutlined";
			} else {
				document.exitFullscreen();
				fullScreenDOM.value = "ExpandOutlined";
			}
		};

		/**
		 * @description 修改头像
		 */
		const userList = ["超", "超级管理员", "admin"];
		const colorList = ["#f56a00", "#7265e6", "#ffbf00"];
		const userName = ref<string>(userList[2]);
		const avatarBgColor = ref<string>(colorList[0]);
		const changeUserName = () => {
			const index = (Math.random() * 3) >>> 0; // 学以致用 位运算符取整
			console.log(index);
			userName.value = userList[index];
			avatarBgColor.value = colorList[index];
		};

		/**
		 * @description 退出登录
		 */
		const handleLogOut = () => {
			Modal.confirm({
				title: "您确定要退出登录吗？",
				icon: createVNode(QuestionCircleOutlined),
				onOk() {
					localStorage.clear();
					window.location.reload();
				}
			});
		};

		return {
			breadcrumbItems,
			refresh,
			fullScreenDOM,
			toggleFullScreen,
			userName,
			avatarBgColor,
			changeUserName,
			handleLogOut
		};
	}
});
</script>

<style lang="less" scoped>
.menu-fold {
	cursor: pointer;
	font-size: 18px;
}

.breadcrumb {
	height: 52px;
	line-height: 52px;
	padding-left: 20px;
	display: inline-block;
	margin-top: -8px;
	vertical-align: middle;
}

.right-content {
	font-size: 18px;
}

.cur-point {
	cursor: pointer;
}
</style>
