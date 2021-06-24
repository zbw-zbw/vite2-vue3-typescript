import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";

import { isFunction } from "@/utils/is-type";

// 存放每个请求的唯一标识和取消函数（使用Map结构）
let pendingMap = new Map<string, Canceler>();

// 拼接每个请求的各个参数，确保每个请求拥有唯一标识
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.url, config.method, qs.stringify(config.data), qs.stringify(config.params)].join("&");

// 封装一个取消重复请求的类
export class AxiosCanceler {
	/**
	 * @description 往请求队列中添加请求
	 */
	addPending(config: AxiosRequestConfig) {
		this.removePending(config);
		const url = getPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken((cancel: Canceler) => {
				// 判断 如果当前等待队列中不存在当前请求就添加进去
				if (!pendingMap.has(url)) {
					pendingMap.set(url, cancel);
				}
			});
	}

	/**
	 * @description 从请求队列中移除请求
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);
		if (pendingMap.has(url)) {
			const cancel = pendingMap.get(url);
			// 如果pending队列中存在当前请求 调用cancel函数来移除当前请求
			cancel && isFunction(cancel) && cancel(url);
			pendingMap.delete(url);
		}
	}
}
