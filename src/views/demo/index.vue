<template>
	<div>
		<span>count：{{ count }}</span> &nbsp; &nbsp;
		<a-button type="primary" @click="increment">count++</a-button>
		<br />
		<br />
		<span>我的名字：{{ fullName }}</span> &nbsp; &nbsp;
		<a-button type="primary" @click="changeFullName">修改名字</a-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, UnwrapRef, toRaw, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { key } from "@/store";
import { getProductList, login } from "@/api/user";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

export default defineComponent({
	name: "demo",
	components: {
		UserOutlined,
		LockOutlined
	},
	setup() {
		// 获取store 相当于$store
		const store = useStore(key);

		// 同步写法（直接通过mutation更新state） 直接获取state或getters获取state
		const fullName = computed(() => store.state.demo.fullName);
		const changeFullName = () => store.commit("demo/CHANGE_FULL_NAME", "kyrie irving");

		// 异步写法（通过dispatch分发action） 直接获取state或getters获取state
		const count = computed(() => store.getters["demo/count"]);
		const increment = () => store.dispatch("demo/increment", 100);

		onMounted(async () => {
			// 获取产品列表
			const productParams = {
				page: 1,
				perPage: 10,
				product_type: 1
			};
			try {
				const res = await getProductList(productParams);
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		});

		return {
			count,
			fullName,
			increment,
			changeFullName
		};
	}
});
</script>

<style lang="less" scoped></style>
