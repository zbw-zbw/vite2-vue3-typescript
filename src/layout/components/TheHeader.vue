<template>
  <a-row>
    <a-col :span="16">
      <span class="menu-fold" @click="() => $emit('update:collapsed', !collapsed)">
        <component :is="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
      </span>
    </a-col>
    <a-col :span="8" align="right">
      <a-space size="middle" class="right-content">
        <a-tooltip placement="bottom">
          <template #title>
            <span>刷新</span>
          </template>
          <ReloadOutlined class="cur-point" />
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template #title>
            <span>全屏</span>
          </template>
          <ExpandOutlined class="cur-point" />
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
            {{
              userName
            }}
          </a-avatar>
          <template #overlay>
            <a-menu>
              <div style="padding: 5px 12px">你好，叶诗鑫~</div>
              <a-menu-item @click="$router.push('/personal-center')">
                <UserOutlined />个人中心
              </a-menu-item>
              <a-menu-item @click="handleLogOut">
                <PoweroffOutlined />退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { createVNode, defineComponent, ref } from "@vue/runtime-core";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ReloadOutlined,
  LockOutlined,
  ExpandOutlined,
  BellOutlined,
  PoweroffOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons-vue";

import { Modal } from 'ant-design-vue';

export default defineComponent({
  name: 'TheHeader',
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
    BellOutlined,
    PoweroffOutlined,
    QuestionCircleOutlined
  },
  setup() {
    /**
   * @description 修改头像
  */
    const userList = ["Ye", "YeShi", "YeShiXin", "sitkinyip"];
    const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
    const userName = ref<string>(userList[0]);
    const avatarBgColor = ref<string>(colorList[0]);
    const changeUserName = () => {
      const index = Math.random() * 4 >>> 0;	// 学以致用 位运算符取整
      console.log(index);
      userName.value = userList[index];
      avatarBgColor.value = colorList[index];
    };

    /**
     * @description 退出登录
     */
    const handleLogOut = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        icon: createVNode(QuestionCircleOutlined),
        okText: '确定',
        cancelText: '取消',
        onOk() {
          localStorage.clear();
          window.location.reload();
        }
      })
    }

    return {
      userName,
      avatarBgColor,
      changeUserName,
      handleLogOut
    };
  }
})
</script>

<style lang="less" scoped>
.menu-fold {
  cursor: pointer;
  font-size: 18px;
}

.right-content {
  font-size: 18px;
}

.cur-point {
  cursor: pointer;
}
</style>