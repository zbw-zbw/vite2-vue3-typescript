import { AxiosRequestConfig } from "axios";
import { AxiosTransform } from "./axiosTransform";

// 扩展axios配置（继承axios的自带配置：如timeout、headers等）
export interface CreateAxiosOptions extends AxiosRequestConfig {
	transform?: AxiosTransform;
	requestOptions?: RequestOptions;
}

// 请求配置接口
export interface RequestOptions {
	// 是否显示提示信息
	isShowMsg?: boolean;
	// 是否显示成功信息
	isShowSuccessMsg?: boolean;
	// 成功的文本信息
	successMsg?: string;
	// 是否显示失败信息
	isShowErrorMsg?: boolean;
	// 错误的文本信息
	errorMsg?: string;
	// 接口地址，不填则使用默认apiUrl
	apiUrl?: string;
	// 错误消息提示类型
	errorMsgType?: "normal" | "modal";
}

// 这里要跟后端定好一个返回的数据格式规范
export interface Result<T = any> {
	code: number;
	type?: "success" | "warning" | "error";
	message: string;
	data?: T;
}
