<template>
	<div class="error404">
		<div class="error404-body-con">
			<div class="error404-body-con-title">4<span>0</span>4</div>
			<p class="error404-body-con-message">迷路的孩子是否还记得家的方向？</p>
			<div class="error404-btn-con">
				<a-button @click="goHome" size="large" class="back-home">返回首页</a-button>
				<a-button @click="backPage" size="large" type="primary" class="back">返回上一页</a-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import router from "@/router";

export default {
	name: "404",
	setup() {
		const backPage = () => {
			router.go(-1);
		};
		const goHome = () => {
			router.push({ name: "home" });
		};

		return { backPage, goHome };
	}
};
</script>
<style lang="less" scoped>
.error404 {
	&-body-con {
		width: 700px;
		height: 500px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		&-title {
			text-align: center;
			font-size: 240px;
			font-weight: 700;
			color: #2d8cf0;
			height: 260px;
			line-height: 260px;
			margin-top: 40px;

			span {
				display: inline-block;
				color: #19be6b;
				font-size: 230px;
				animation: errorAnimation 2s ease 0s infinite;
			}
		}

		&-message {
			display: block;
			text-align: center;
			font-size: 20px;
			font-weight: 500;
			letter-spacing: 12px;
			color: #dddde2;
		}
	}

	&-btn-con {
		text-align: center;
		padding: 10px 0;

		.back,
		.back-home {
			width: 200px;
		}

		.back {
			margin-left: 16px;
		}
	}
}

@keyframes errorAnimation {
	0% {
		transform: rotateZ(0deg);
	}
	50% {
		transform: rotateZ(180deg);
	}
	100% {
		transform: rotateZ(360deg);
	}
}
</style>
