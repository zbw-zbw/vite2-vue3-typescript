import axios from "axios";

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import type { CreateAxiosOptions, RequestOptions, Result } from "./types";

import { isFunction } from "@/utils/is-type";
import { AxiosCanceler } from "./AxiosCancel";

// Axios类
export class Axios {
	private axiosInstance: AxiosInstance;
	private options: CreateAxiosOptions;

	constructor(options: CreateAxiosOptions) {
		this.options = options;
		this.axiosInstance = axios.create(options);
		this.setupInterceptors();
	}

	/**
	 * @description 获取当前axios实例
	 */
	getAxios(): AxiosInstance {
		return this.axiosInstance;
	}

	/**
	 * @description 创建axios实例
	 */
	private createAxios(config: CreateAxiosOptions): void {
		this.axiosInstance = axios.create(config);
	}

	/**
	 * @description 重新配置axios
	 */
	private configAxios(config: CreateAxiosOptions) {
		if (!this.axiosInstance) return;
		this.createAxios(config);
	}

	/**
	 * @description 获取axios传入的配置
	 */
	private getTransform() {
		return this.options.transform;
	}

	/**
	 * @description 拦截器配置
	 */
	private setupInterceptors() {
		const transform = this.getTransform();
		if (!transform) return;

		const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
			transform;

		// 实例化一个取消重复请求对象
		const axiosCanceler = new AxiosCanceler();

		// 请求拦截器处理
		this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
			// 默认开启取消重复请求
			const { headers: { ignoreCancelToken } = { IgnoreCancelToken: false } } = config;

			// 判断 如果开启取消重复请求 则把当前请求添加到pending队列中
			!ignoreCancelToken && axiosCanceler.addPending(config);
			// 如果实例化axios时，传入了请求拦截处理函数则直接调用
			if (requestInterceptors && isFunction(requestInterceptors)) {
				config = requestInterceptors(config);
			}
			return config;
		});

		// 请求拦截器的错误捕获
		requestInterceptorsCatch &&
			isFunction(requestInterceptorsCatch) &&
			this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

		// 响应拦截器处理
		this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
			res && axiosCanceler.removePending(res.config);
			if (responseInterceptors && isFunction(responseInterceptors)) {
				responseInterceptors(res);
			}
			return res;
		});

		// 响应拦截器的错误捕获
		responseInterceptorsCatch &&
			isFunction(responseInterceptorsCatch) &&
			this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
	}

	/**
	 * @description  请求方法
	 */
	fetch<T = any>(config: AxiosRequestConfig, option?: RequestOptions): Promise<T> {
		const transform = this.getTransform();

		const { handleResData } = transform || {};

		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request<any, AxiosResponse<Result>>(config)
				.then((res: AxiosResponse<Result>) => {
					// 判断当前请求是否被取消
					const isCancel = axios.isCancel(res);
					// 这里是为了处理接口响应成功的情景（比如一些操作成功的提示信息）
					if (handleResData && isFunction(handleResData) && !isCancel) {
						const ret = handleResData(res, option || {});
						resolve(ret);
					}
					reject(res as unknown as Promise<T>);
				})
				.catch((err: Error) => {
					reject(err);
				});
		});
	}
}
