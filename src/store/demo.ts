import { Module } from "vuex";
import { State as RootState } from "./index";

// state 接口数据
export interface State {
	count: number;
	fullName: string;
}

export default {
	namespaced: true,	// 开启命名空间

	state: {
		count: 100,
		fullName: "kyrie wen"
	},

	getters: {
		count: state => state.count,
		fullName: state => state.fullName
	},

	mutations: {
		INCREMENT(state, count: State["count"]) {
			state.count += count;
		},
		CHANGE_FULL_NAME(state, fullName: State["fullName"]) {
			state.fullName = fullName;
		}
	},

	actions: {
		increment({ commit }, value: number) {
			commit("INCREMENT", value);
		}
	}
} as Module<State, RootState>;
