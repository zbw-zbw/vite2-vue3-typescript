import axios from "@/utils/http";
import { RequestMethodsEnum } from "@/enums/httpEnum";

/**
 * @description 请求产品档案列表（采购的接口哈哈哈哈）
 */
export function getProductListApi(params: object) {
	return axios.fetch({
		url: "http://api-supply.qa.fandow.com/v1/product",
		method: RequestMethodsEnum.GET,
		params
	});
}

/**
 * @description 删除产品档案（采购的接口哈哈哈哈）
 */
export function delProductApi(id: string) {
	return axios.fetch(
		{
			url: "http://api-supply.qa.fandow.com/v1/product/" + id,
			method: RequestMethodsEnum.DELETE
		},
		{
			isShowMsg: true,
			successMsg: "删除成功"
		}
	);
}
