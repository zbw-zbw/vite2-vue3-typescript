// 默认过期时间为7天
const DEFAULT_CACHE_TIMEOUT = 7 * 24 * 60 * 60 * 1000;

/**
 * @description 从localStorage中拿数据
 */
export function getLocalStorage(key: string, def: any = null) {
	const stringData = localStorage.getItem(key);
	if (stringData) {
		try {
			const { expire, value } = JSON.parse(stringData);
			// 没过期直接返回value
			if (expire > Date.now()) return value;
		} catch (error) {
			return def;
		}
	}
	return def;
}

/**
 * @description 往localStorage中存储数据(利用字符串形式存放，让数据具备有效期)
 */
export function setLocalStorage(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIMEOUT) {
	const stringData = JSON.stringify({
		value,
		expire: expire ? Date.now() + expire : null
	});
	localStorage.setItem(key, stringData);
}
