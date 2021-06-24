/**
 * @description 判断是否为某个类型
 */
export function is(val: unknown, type: string) {
	return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * @description 是否为数字类型
 */
export function isNumber(val: unknown) {
	return is(val, "Number");
}

/**
 * @description 是否为字符串类型
 */
export function isString(val: unknown) {
	return is(val, "String");
}

/**
 * @description 是否为布尔类型
 */
export function isBoolean(val: unknown) {
	return is(val, "Boolean");
}

/**
 * @description 是否已定义
 */
export function isDef(val: unknown) {
	return typeof val !== "undefined";
}

/**
 * @description 是否为undefined类型
 */
export function isUnDef(val: unknown) {
	return !isDef(val);
}

/**
 * @description 是否为对象类型
 */
export function isObject(val: any) {
	return val !== null && is(val, "Object");
}

/**
 * @description 是否为函数类型
 */
export function isFunction(val: unknown) {
	return is(val, "Function");
}

/**
 * @description 是否为数组类型
 */
export function isArray(val: any) {
	return val && Array.isArray(val);
}

/**
 * @description:  是否为时间类型
 */
export function isDate(val: unknown) {
	return is(val, "Date");
}
