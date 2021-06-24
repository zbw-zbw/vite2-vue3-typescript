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
		const { isShowMsg, isShowSuccessMsg, successMsg, isShowErrorMsg, errorMsg, isReturnCode } = options;

		// code msg data 都需要后端配合统一格式（在type.ts中定义的）
		const { code, message, data } = res.data;
		// 是否请求成功
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

		// 直接返回res（有些接口可能需要code值进行判断）
		if (isReturnCode) return res.data;

		// 没有返回值直接reject
		if (!data) return Promise.reject(res.data);

		// 接口请求成功，直接返回结果
		if (isSuccess) return data;

		// 统一错误提示信息
		if (code === -1) {
			if (message) {
				Message.error(message);
				Promise.reject(new Error(message));
			} else {
				Message.error("操作失败，系统异常！");
				Promise.reject(new Error("操作失败，系统异常！"));
			}
			return Promise.reject();
		}

		// 请求失败的处理（根据CRM的具体业务来定）
		if (!isSuccess) Message.error(message || "请求失败！");

		return res.data;
	},

	/**
	 * @description 请求拦截器
	 */
	requestInterceptors: config => {
		const token = "Bearer nTYEm7oNMGChXer3AhIy4cBkTYcQfdUOdJJVuQ3X"; // 请求前加上token
		token && (config.headers["Authorization"] = token);
		return config;
	},

	/**
	 * @description 响应拦截器
	 */
	responseInterceptors: res => {
		return res.data;
	},

	/**
	 * @description: 响应拦截器的错误处理
	 */
	responseInterceptorsCatch: error => {
		const { response } = error || {};
		const msg: string = response?.data?.error?.message;
		// 判断请求是否被取消
		const isCancel = axios.isCancel(error);
		if (isCancel) {
			return Promise.reject("重复请求被取消！");
		} else {
			// 处理业务异常
			checkStatus(error.response?.status, msg);
		}
		return error;
	}
};

const commonAxios = new Axios({
	timeout: 5000,
	headers: {
		"Content-Type": "application/json; charset=UTF-8"
	},
	transform: commonTransform,
	// 请求配置项（可选）：为了某些接口需要单独的配置
	requestOptions: {
		isReturnCode: false,
		errorMsgType: "normal",
		apiUrl: "http://localhost:8080"
	}
});

export default commonAxios;
