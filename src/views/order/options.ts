/**
 * @description 订单搜索下拉框
 */
const orderSearchList = [
	{
		label: "订单编号",
		value: "orderNum"
	},
	{
		label: "外部单号",
		value: "outSideNum"
	},
	{
		label: "收货人姓名",
		value: "receiveName"
	},
	{
		label: "微医生账号",
		value: "customName"
	},
	{
		label: "收货人手机号",
		value: "receivePhone"
	}
];

/**
 * @description 订单类型下拉框
 */
const orderTypeList = [
	{
		label: "全部",
		value: "all"
	},
	{
		label: "普通订单",
		value: "normal"
	}
];

/**
 * @description 售后状态下拉框
 */
const afterSaleStatusList = [
	{
		label: "全部",
		value: "all"
	},
	{
		label: "售后中",
		value: "afterSaling"
	},
	{
		label: "售后结束",
		value: "afterSaled"
	}
];

/**
 * @description 订单状态下拉框
 */
const orderStatusList = [
	{
		label: "全部",
		value: "all"
	},
	{
		label: "待付款",
		value: "waitPay"
	},
	{
		label: "待发货",
		value: "waitSend"
	},
	{
		label: "已发货",
		value: "send"
	},
	{
		label: "已完成",
		value: "complete"
	},
	{
		label: "已关闭",
		value: "closed"
	},
	{
		label: "售后中",
		value: "afterSaling"
	}
];

/**
 * @description 配送方式下拉框
 */
const deliveryMethodList = [
	{
		label: "全部",
		value: "all"
	},
	{
		label: "快递发货",
		value: "express"
	}
];

/**
 * @description 付款方式下拉框
 */
const payMethodList = [
	{
		label: "全部",
		value: "all"
	},
	{
		label: "微信支付",
		value: "wechat"
	}
];

export default {
	orderSearchList,
	orderTypeList,
	afterSaleStatusList,
	orderStatusList,
	deliveryMethodList,
	payMethodList
};
