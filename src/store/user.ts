import { Module } from "vuex";
import { State as RootState } from "./index";
import { loginApi } from "@/api/user";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

export interface BreadCrumbType {
	path: string;
	title: string;
}

export interface State {
	token: string;
	userInfo: object;
	breadcrumbItems: BreadCrumbType[];
}

export default {
	namespaced: true,
	state: {
		token: getLocalStorage("token", ""),	// 用户token
		userInfo: getLocalStorage("userInfo", {}),	// 用户信息
		breadcrumbItems: [] // 面包屑
	},
	getters: {
		token: state => state.token,
		breadcrumbItems: state => state.breadcrumbItems
	},
	mutations: {
		setToken: (state: State, token: State["token"]) => {
			state.token = token;
		},
		setUserInfo: (state: State, userInfo: State["userInfo"]) => {
			state.userInfo = userInfo;
		},
		changeBreadCrumbItems: (state: State, breadcrumbItems: State["breadcrumbItems"]) => {
			state.breadcrumbItems = breadcrumbItems;
		}
	},
	actions: {
		// 用户登录（处理token和userInfo）
		async login({ commit }, userInfo) {
			try {
				const res = await loginApi(userInfo);
				const { code, data } = res;
				if (code === 200) {
					setLocalStorage("userInfo", data);
					setLocalStorage("token", data.authorization);
					commit("setUserInfo", data);
					commit("setToken", data.authorization);
				}
				return Promise.resolve(res);
			} catch (error) {
				return Promise.reject(error);
			}
		}
	}
} as Module<State, RootState>;
