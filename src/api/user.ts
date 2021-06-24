import axios from "@/utils/http";
import { LoginParams } from "./models/userModals";
import { RequestMethodsEnum } from "@/enums/httpEnum";

enum UrlEnum {
	login = "http://api-supply.qa.fandow.com/v1/login/sign-in",
	getProductList = "http://api-supply.qa.fandow.com/v1/product"
}

/**
 * @description 用户登录
 */
export function login(data: LoginParams) {
	return axios.fetch(
		{
			url: UrlEnum.login,
			method: RequestMethodsEnum.POST,
			data
		},
		{ isReturnCode: true }
	);
}

/**
 * @description 请求产品列表
 */
export function getProductList(params: object) {
	return axios.fetch({
		url: UrlEnum.getProductList,
		method: RequestMethodsEnum.GET,
		params
	});
}
