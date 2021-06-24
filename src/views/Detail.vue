<template>
  <div>
    <span>count：{{ count }}</span> &nbsp; &nbsp;
    <a-button type="primary" @click="increment">count++</a-button>
    <br />
    <br />
    <span>我的名字：{{ fullName }}</span> &nbsp; &nbsp;
    <a-button type="primary" @click="changeFullName">修改名字</a-button>

    <div style="margin: 24px 0">
      <a-form layout="inline" :model="LoginState" :rules="LoginRules">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="LoginState.username" placeholder="用户名">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="LoginState.password" type="password" placeholder="密码">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleLogin">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, UnwrapRef, toRaw } from "@vue/runtime-core";
import { useStore } from "vuex";
import { key } from "@/store";
import { Login } from "@/api/base";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface LoginState {
  username: string;
  password: string;
}

export default defineComponent({
  name: "detail",
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    // 获取store 相当于$store
    const store = useStore(key);

    // 同步写法（直接通过mutation更新state） 直接获取state或getters获取state
    const fullName = computed(() => store.state.demo.fullName)
    const changeFullName = () => store.commit('demo/CHANGE_FULL_NAME', 'kyrie irving')

    // 异步写法（通过dispatch分发action） 直接获取state或getters获取state
    const count = computed(() => store.getters["demo/count"]);
    const increment = () => store.dispatch('demo/increment', 100);

    const LoginState: UnwrapRef<LoginState> = reactive({
      username: '',
      password: '',
    });

    const LoginRules = {
      username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
      password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }],
    }

    const handleLogin = async () => {
      const res = await Login(toRaw(LoginState))
      console.log(res);
    };

    return {
      count,
      fullName,
      increment,
      changeFullName,
      LoginState,
      LoginRules,
      handleLogin,
    };
  }
});
</script>

<style lang="less" scoped></style>