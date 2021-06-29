# 技术栈：vue3 + vite2 + typeScript + ant design

## 安装依赖：yarn

## 运行项目：yarn dev

### 已封装的功能：

- vite.config.js、buildConfig.js（项目基本配置和打包配置）
- layout（包括登录页、基本布局、侧边导航、面包屑等）
- router（包括路由守卫、重定向、404 页面等）
- vuex（包括获取 token、用户信息、动态面包屑等）
- axios（包括取消重复请求、请求拦截、处理后端返回的数据及提示等）

### 文件目录说明：

- api（接口配置）
- assets（静态资源）
- components（通用组件）
- config（antd 组件的引入）
- enums（ts 公共的枚举）
- hooks（可抽离的业务逻辑）
- layout（页面布局）
- plugins（通用方法）
- router（路由配置和路由守卫）
- store（vuex-按模块分类）
- styles（通用样式文件）
- utils（工具：已有-axios 类和类型判断）
- views（系统页面）

### api 配置-demo：

```ts
/**
 * @description 删除接口
 */
export function delProductApi(id: string) {
	return axios.fetch(
		{
			url: "http://api-supply.qa.fandow.com/v1/product/" + id,
			method: RequestMethodsEnum.DELETE
		},
		{
			isShowMsg: true,
			successMsg: "删除成功"
		}
	);
}

// 第一个参数（必填）：fetch的请求配置
// 第二个参数(可选):可配置请求成功或失败的提示信息
```

### vuex-demo（同步操作）：

```ts
// 定义：state 接口数据
export interface State {
	count: number;
	fullName: string;
}

export default {
	namespaced: true, // 开启命名空间

	state: {
		count: 100
	},

	getters: {
		count: state => state.count
	},

	mutations: {
		increment(state, count: State["count"]) {
			state.count += count;
		}
	}
} as Module<State, RootState>;
```

```ts
// 组件内使用
import { useStore } from "vuex";
import { key } from "@/store";

// 获取store 相当于$store
const store = useStore(key);

// 同步写法
const count = computed(() => store.state.demo.count);
const increment = () => store.commit("demo/increment", 100); // demo为模块名称
```

### vuex-demo（异步请求）

```ts
export interface State {
	token: string;
}

export default {
	namespaced: true,
	state: {
		token: getLocalStorage("token", "") // 用户token
	},
	getters: {
		token: state => state.token
	},
	mutations: {
		setToken: (state: State, token: State["token"]) => {
			state.token = token;
		}
	},
	actions: {
		// 用户登录（处理token）
		async login({ commit }, userInfo) {
			try {
				const res = await loginApi(userInfo);
				const { code, data } = res;
				if (code === 200) {
					setLocalStorage("userInfo", data);
					setLocalStorage("token", data.authorization);
				}
				return Promise.resolve(res);
			} catch (error) {
				return Promise.reject(error);
			}
		}
	}
} as Module<State, RootState>;
```

```ts
// 组件内使用：
const { code, message } = await store.dispatch("user/login", loginParams); // user为模块名称
```
