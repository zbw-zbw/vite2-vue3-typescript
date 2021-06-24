import { Module } from "vuex";
import { State as RootState } from "./index";
import { login } from "@/api/user";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

export interface State {
	token: string;
	userInfo: object;
}

export default {
	namespaced: true,
	state: {
		token: getLocalStorage("token", ""),
		userInfo: getLocalStorage("userInfo", {})
	},
	getters: {
		token: state => state.token
	},
	mutations: {
		setToken: (state: State, token: State["token"]) => {
			state.token = token;
		},
		setUserInfo: (state: State, userInfo: State["userInfo"]) => {
			state.userInfo = userInfo;
		}
	},
	actions: {
		// 用户登录（处理token和userInfo）
		async login({ commit }, userInfo) {
			try {
				const res = await login(userInfo);
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
