import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import demo, { State as DemoState } from "./demo";

// 汇总各模块的状态类型
export interface State {
	demo: DemoState;
}

// 生成一个密钥 为了后续使用useStore时传入密钥让ts能够类型推断
export const key: InjectionKey<Store<State>> = Symbol();

// 考虑到CRM项目后续庞大起来 这里使用modules进行分类
export const store = createStore<State>({
	modules: { demo }
});

// 向组件注入$store的类型声明
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
