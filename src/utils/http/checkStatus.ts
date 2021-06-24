import { message as Message } from "ant-design-vue";
import { HttpCodeEnum } from "@/enums/httpEnum";

export function checkStatus(status: number, msg: string): void {
	switch (status) {
		case HttpCodeEnum.REQUEST_ERROR:
			Message.error(msg);
			break;
		// 可以在这里做重定向操作（登录页）
		case HttpCodeEnum.UN_AUTHORIZED:
			Message.error("您还没有授权！");
			break;
		case HttpCodeEnum.FORBIDDEN:
			Message.error("您没有权限访问！");
			break;
		case HttpCodeEnum.NOT_FOUNT:
			Message.error("未找到您要访问的资源！");
			break;
		case HttpCodeEnum.REQUEST_TIMEOUT:
			Message.error("网络请求超时！");
			break;
		case HttpCodeEnum.SERVER_ERROR:
			Message.error("服务器错误，请联系管理员！");
			break;
		case HttpCodeEnum.SERVER_UN_USE:
			Message.error("服务器过载或正在维护！");
			break;
		case HttpCodeEnum.SERVER_TIMEOUT:
			Message.error("网关超时！");
			break;
		case HttpCodeEnum.HTTP_NOT_SUPPORT:
			Message.error("http版本不支持该请求！");
			break;
		default:
			Message.error(msg);
	}
}
