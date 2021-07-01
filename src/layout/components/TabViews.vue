<template>
	<div class="tab-views">
		<!-- tabs标签 -->
		<a-tabs
			class="tabs"
			v-model:activeKey="activeKey"
			hide-add
			type="editable-card"
			@tabClick="onClickTab"
			@edit="onEditTab"
		>
			<a-tab-pane v-for="pane in panes" :key="pane.fullPath" :tab="pane.title"></a-tab-pane>
		</a-tabs>

		<!-- 主内容 -->
		<div class="content-wrapper" ref="scrollContent">
			<a-card>
				<!-- router-view 过渡 -->
				<router-view v-slot="{ Component }">
					<transition name="zoom-fade" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</a-card>
		</div>
	</div>
</template>

<script lang="ts">
import router from "@/router";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { defineComponent, nextTick, ref, watch } from "@vue/runtime-core";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";

export default defineComponent({
	name: "TabViews",
	setup() {
		const route = useRoute();
		const activeKey = ref<string>(route.fullPath);
		const panes = ref(getLocalStorage("panes") || []);

		const scrollContent = ref();

		watch(
			() => route.fullPath,
			newVal => {
				// 路由跳转 页面滚动到content顶部
				nextTick(() => scrollContent.value && scrollContent.value.scrollTo(0, 0));

				activeKey.value = newVal;
				router.push({ path: newVal });
				// 判断当前路由是否已经存在tab标签里
				const isExitTab = panes.value.some(item => item.fullPath === newVal);
				if (isExitTab) return void 0;
				panes.value.push({ fullPath: newVal, title: route.meta.title as string });
			},
			{ immediate: true }
		);

		/**
		 * @description 缓存tab标签列表
		 */
		watch(
			panes.value,
			newVal => {
				setLocalStorage("panes", newVal);
			},
			{ immediate: true, deep: true }
		);

		/**
		 * @description 点击tab触发跳转
		 */
		const onClickTab = (activeKey: string) => {
			router.push({ path: activeKey });
		};

		/**
		 * @description 删除tab标签
		 */
		const onEditTab = (targetKey: string, action: string) => {
			if (action !== "remove") return;
			if (panes.value.length <= 1) return message.warn("已经是最后一页了！");

			// 删除指定的tab
			const delIdx = panes.value.findIndex(item => item.fullPath === targetKey);
			panes.value.splice(delIdx, 1);

			// 如果删除当前路由 判断需要跳转的路由（向左或向右）
			if (targetKey !== route.fullPath) return;
			const targetIdx = delIdx >= 1 ? delIdx - 1 : delIdx;
			const targetPath = panes.value[targetIdx].fullPath;
			activeKey.value = targetPath;
			router.push({ path: targetPath });
		};

		return {
			panes,
			activeKey,
			onClickTab,
			onEditTab,
			scrollContent
		};
	}
});
</script>

<style lang="less" scoped>
.tabs {
	background: #fff;
	border-bottom: none;
	padding: 12px 20px 0;

	:deep(.ant-tabs-bar) {
		margin: 0;
		border-bottom: none;
	}
}

.content-wrapper {
	height: calc(100vh - 118px);
	padding: 20px;
	overflow: auto;
}
</style>
