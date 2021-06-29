import axios from "@/utils/http";
import { LoginParams } from "./models/userModals";
import { RequestMethodsEnum } from "@/enums/httpEnum";

/**
 * @description 用户登录（采购的接口哈哈哈哈）
 */
export function loginApi(data: LoginParams) {
	return axios.fetch(
		{
			url: "http://api-supply.qa.fandow.com/v1/login/sign-in",
			method: RequestMethodsEnum.POST,
			data
		},
		{ isReturnCode: true }
	);
}
