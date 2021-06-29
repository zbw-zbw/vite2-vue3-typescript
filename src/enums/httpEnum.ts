/**
 * @description 请求方式
 */
export enum RequestMethodsEnum {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE"
}

/**
 * @description 常见的状态码
 */
export enum HttpCodeEnum {
	REQUEST_ERROR = 400,
	UN_AUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUNT = 404,
	REQUEST_TIMEOUT = 408,
	SERVER_ERROR = 500,
	SERVER_UN_USE = 503,
	SERVER_TIMEOUT = 504,
	HTTP_NOT_SUPPORT = 505
}
