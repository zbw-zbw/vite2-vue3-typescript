import axios, { AxiosResponse } from "axios";

import { Axios } from "./Axios";
import { checkStatus } from "./checkStatus";

import { AxiosTransform } from "./axiosTransform";
import { RequestOptions, Result } from "./types";
import { message as Message, Modal } from "ant-design-vue";

/**
 * @description 拦截器和数据处理（可选）
 */
const commonTransform: AxiosTransform = {
	/**
	 * @description 请求成功后的处理
	 */
	handleResData: (res: AxiosResponse<Result>, options: RequestOptions) => {
		const { isShowMsg, isShowSuccessMsg, successMsg, isShowErrorMsg, errorMsg } = options;

		// code msg result 都需要后端配合统一格式（在type.ts中定义的）
		const { code, message, data } = res.data;
		// 请求成功
		const isSuccess = data && code === 200;

		// 显示提示信息
		if (isShowMsg) {
			if (isSuccess && (isShowSuccessMsg || successMsg)) {
				Message.success(successMsg || "操作成功！");
			} else if (!isSuccess && (isShowErrorMsg || errorMsg)) {
				Message.error(errorMsg || "操作失败！");
			} else if (!isSuccess && options.errorMsgType === "modal") {
				Modal.confirm({ title: "错误", content: message });
			}
		}

		// 没有返回值的时候直接reject
		if (!data) return Promise.reject(data);

		// 接口请求成功，直接返回结果
		if (code === 200) return data;

		// 接口请求失败，统一提示错误信息
		if (code === -1) {
			if (message) {
				Message.error(message);
				Promise.reject(new Error(message));
			} else {
				const systemError = "操作失败，系统异常！";
				Message.error(systemError);
				Promise.reject(new Error(systemError));
			}
			return Promise.reject();
		}

		// 请求失败（这个得根据CRM的具体业务来定）
		if (!isSuccess) Message.error(res.data.message);

		return res.data;
	},

	/**
	 * @description 请求拦截器
	 */
	requestInterceptors: config => {
		const token = "xxxx"; // 请求前加上token
		token && (config.headers.token = token);
		return config;
	},

	/**
	 * @description 响应拦截器
	 */
	responseInterceptors: res => {
		return res;
	},

	/**
	 * @description: 响应拦截器的错误处理
	 */
	responseInterceptorsCatch: error => {
		const { response } = error || {};
		const msg: string = response?.data?.error?.message;
		// 判断请求是否被取消
		const isCancel = axios.isCancel(error);
		// 处理业务异常
		isCancel ? console.warn("请求被取消！") : checkStatus(error.response?.status, msg);
		return error;
	}
};

const commonAxios = new Axios({
	timeout: 5000,
	headers: {
		"Content-Type": "application/json; charset=UTF-8"
	},
	transform: commonTransform,
	// 请求配置项（可选）：为了某些接口需要单独的其他配置
	requestOptions: {
		apiUrl: "http://localhost:8080",
		errorMsgType: "normal"
	}
});

export default commonAxios;
