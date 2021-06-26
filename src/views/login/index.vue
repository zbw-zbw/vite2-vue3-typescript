<template>
	<div class="login">
		<div class="login-wrapper">
			<img class="common-img logo" src="http://crm.wqc.so/public/images/login_logo.png" alt="IRY-LOGO" />
			<img class="common-img welcome" src="http://crm.wqc.so/public/images/login_welcome.png" alt="welcome-crm" />
			<a-form ref="loginFormRef" @submit="submitLogin" :model="LoginState" :rules="LoginRules">
				<a-form-item name="username">
					<a-input v-model:value.trim="LoginState.username" placeholder="用户名" autocomplete="off">
						<template #prefix>
							<UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
						</template>
					</a-input>
				</a-form-item>
				<a-form-item name="password">
					<a-input v-model:value.trim="LoginState.password" type="password" placeholder="密码" autocomplete="off">
						<template #prefix>
							<LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
						</template>
					</a-input>
				</a-form-item>
				<a-button class="login-btn" type="primary" html-type="submit" :loading="loginLoading">登录</a-button>
			</a-form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from "@vue/runtime-core";
import { message as Message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import router from "@/router";
import { store } from "@/store";
import { useRoute } from "vue-router";

interface LoginState {
	username: string;
	password: string;
}

export default defineComponent({
	name: "Login",
	components: { UserOutlined, LockOutlined },
	setup() {
		const loginFormRef = ref();
		const loginLoading = ref(false);

		// 登录接口参数
		const LoginState: UnwrapRef<LoginState> = reactive({
			username: "",
			password: ""
		});

		// 登录表单校验规则
		const LoginRules = {
			username: [{ required: true, message: "用户名不能为空！", trigger: "blur" }],
			password: [{ required: true, message: "密码不能为空！", trigger: "blur" }]
		};

		const currentRoute = useRoute();
		// 用户点击登录
		const submitLogin = async () => {
			const loginParams = toRaw(LoginState);
			const { username, password } = loginParams;
			if (!username || !password) return Message.error("用户名或密码不能为空！");
			loginLoading.value = true;
			const hide = Message.loading("登录中...", 0);
			const { code, message } = await store.dispatch("user/login", loginParams).finally(() => {
				hide();
				loginLoading.value = false;
			});

			// 登录成功跳转到首页
			if (code === 200) {
				Message.success("登录成功！");
				// 判断是否需要重定向页面
				const redirect = currentRoute.query.redirect as string;
				const targetPath = redirect ? redirect : "/";
				router.replace(targetPath);
			} else {
				Message.error(message || "登录失败！");
			}
		};

		return {
			loginFormRef,
			loginLoading,
			LoginState,
			LoginRules,
			submitLogin
		};
	}
});
</script>

<style lang="less" scoped>
.login {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url("http://crm.wqc.so/public/images/login_bg.jpg");

	.login-wrapper {
		width: 350px;
		background: #fff;
		padding: 40px;

		.common-img {
			display: block;
			text-align: center;
			margin: 0 auto 40px;
		}

		.logo {
			width: 50%;
		}

		.welcome {
			width: 80%;
		}

		.login-btn {
			width: 100%;
			text-align: center;
		}
	}
}
</style>
