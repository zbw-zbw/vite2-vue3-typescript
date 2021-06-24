import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestOptions, Result } from "./types";
export class AxiosTransform {
	/**
	 * @description 请求成功后的处理
	 */
	handleResData?: (res: AxiosResponse<Result>, option: RequestOptions) => any;

	/**
	 * @description 请求失败后的处理
	 */
	requestCatch?: (error: Error) => Promise<any>;

	/**
	 * @description 请求拦截器
	 */
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

	/**
	 * @description 响应拦截器
	 */
	responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

	/**
	 * @description 请求拦截器的错误处理
	 */
	requestInterceptorsCatch?: (error: any) => void;

	/**
	 * @description 响应拦截器的错误处理
	 */
	responseInterceptorsCatch?: (error: any) => void;
}
