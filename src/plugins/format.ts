/**
 * @description: 时间戳/中国标准时间转为YYYY-MM-DD hh:mm:ss(由第二个参数决定)
 * @param {string | number} time	时间戳或中国标准时间
 * @param {string} type 如：YYYY-MM-DD 或 YYYY-MM-DD hh:mm 或 YYYY-MM-DD hh:mm:ss
 * @return {string}	返回指定格式的时间
 */

type DateType = Date | string | number;

export default function format(time: DateType, type = "YYYY-MM-DD hh:mm:ss") {
	let date;
	// 传入的是时间戳
	if (typeof time === "number" && !isNaN(time)) {
		let timeLength = time.toString().length;
		// 10位时间戳
		if (timeLength === 10) {
			date = new Date(time * 1000 + 8 * 3600 * 1000);
		} else if (timeLength === 13) {
			// 13位时间戳
			date = new Date(time + 8 * 3600 * 1000);
		} else {
			throw new TypeError("请传入10位或13位的时间戳！");
		}
	} else {
		// 传入的是中国标准时间
		date = new Date(Date.parse(time as string) + 8 * 3600 * 1000);
	}
	// 校验传入的时间格式
	if (!date.toJSON()) throw new TypeError("传入的时间格式不正确！");

	let length = 19;
	if (type.toLocaleLowerCase() === "yyyy-mm-dd") {
		length = 10;
	} else if (type.toLocaleLowerCase() === "yyyy-mm-dd hh:mm") {
		length = 16;
	}
	return date.toJSON().substr(0, length).replace("T", " ").replace(/-/g, "-");
}
