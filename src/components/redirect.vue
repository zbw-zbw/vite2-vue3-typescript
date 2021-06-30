<template></template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
	name: "Redirect",
	setup() {
		const route = useRoute();
		router.replace({ path: route.params.path as string });
	}
});
</script>

<style lang="less" scoped></style>
