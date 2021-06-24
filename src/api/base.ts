import axios from "@/utils/http";

/**
 * @description 用户登录
 */
export function Login(data: object) {
	return axios.fetch(
		{
			url: "http://api-supply.qa.fandow.com/v1/login/sign-in",
			method: "POST",
			data
		},
		{
			isShowMsg: true,
			successMsg: "登录成功！"
		}
	);
}
