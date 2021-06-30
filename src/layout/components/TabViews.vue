<template>
	<div class="tab-views">
		<!-- 面包屑 -->
		<a-breadcrumb class="breadcrumb">
			<template v-for="item in breadcrumbItems" :key="item.path">
				<a-breadcrumb-item v-if="item.title">
					<router-link :to="item.path">{{ item.title }}</router-link>
					<!-- <router-link v-if="item.isLink" :to="item.path">{{ item.title }}</router-link> -->
					<!-- <a v-else href="javascript:;" style="cursor: text">{{ item.title }}</a> -->
				</a-breadcrumb-item>
			</template>
		</a-breadcrumb>

		<!-- 主内容 -->
		<div class="content-wrapper">
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
import { key } from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
	name: "TabViews",
	setup() {
		const store = useStore(key);
		const breadcrumbItems = computed(() => store.getters["user/breadcrumbItems"]);

		return { breadcrumbItems };
	}
});
</script>

<style lang="less" scoped>
.breadcrumb {
	height: 52px;
	line-height: 52px;
	padding-left: 20px;
	background: #fff;
	border-bottom: 1px solid #eee;
}

.content-wrapper {
	height: calc(100vh - 118px);
	padding: 20px;
	overflow: auto;
}
</style>
