<template>
	<div class="order-info">
		<!-- 操作栏和提示 -->
		<a-row class="top-msg">
			<a-col :span="16">
				<span>订单号：12345678900000121</span>
				<a @click="onMore('1')" class="common-gap">更多</a>
				<span>下单时间：2021-06-29 15:51:30</span>
				<span class="common-gap">普通订单</span>
			</a-col>
		</a-row>

		<!-- 订单实时状态 -->
		<a-row class="order-status flex-center">
			<a-col :span="8" class="desc">
				<h3 class="title">商家已发货，等待交易成功</h3>
				<div class="rules">
					订单来源为xx的订单，将在发货后所有包裹有物流签收信息的情况下自动完成，<a @click="onMoreRules">查看更多规则</a>
				</div>
			</a-col>

			<!-- 订单步骤条 -->
			<a-col :span="16" class="steps">
				<a-steps :current="3" labelPlacement="vertical">
					<a-step v-for="item in orderSteps" :key="item.date">
						<template #title>{{ item.status }}</template>
						<template #description>
							<span>{{ item.date }}</span>
						</template>
					</a-step>
				</a-steps>
			</a-col>
		</a-row>

		<!-- 包裹列表 -->
		<a-tabs type="card" v-model:activeKey="currentPackage" class="packages">
			<a-tab-pane v-for="item in packages" :key="item.id" :tab="item.title" class="package">
				<!-- 发货信息 -->
				<a-row class="send-info">
					<a-col :span="6">
						<div class="message">发货方式：快递</div>
						<div class="message">发货人：网点管家云端版</div>
						<div class="message">发货时间：2021-06-30 10:33:00</div>
						<div class="message">运单号：韵达快递4000001203123</div>
						<div class="shop-info">
							<img src="@/assets/logo.png" width="50" height="50" />
							<div class="name">WIS水润面膜女补水保湿</div>
							<div class="num">数量： 1</div>
						</div>
					</a-col>

					<!-- 物流信息 -->
					<a-col :span="18" class="delivery">
						<div class="title">物流状态：<span class="status">运输中</span></div>
						<a-steps progress-dot direction="vertical">
							<a-step status="wait" v-for="delivery in item.data.deliverys" :key="delivery.date">
								<template #title>{{ delivery.date }}</template>
								<template #description>
									{{ delivery.desc }}
									<div>{{ delivery.status }}</div>
								</template>
							</a-step>
						</a-steps>
					</a-col>
				</a-row>
			</a-tab-pane>
		</a-tabs>

		<!-- 收货人、配送、付款、买家信息 -->
		<a-row class="total-msg">
			<a-col :span="5">
				<div class="title">收货人信息<a @click="onCopy('12312')" class="copy-btn">复制</a></div>
				<div class="msg">收货人：叫我欧文就好</div>
				<div class="msg">联系电话：18888888888</div>
				<div class="msg">收货地址：广东省 广州市 黄埔区 芯大厦B栋</div>
			</a-col>
			<a-col :span="5" :offset="1">
				<div class="title">配送信息</div>
				<div class="msg">配送方式：快递</div>
				<div class="msg">发货时间：2021-06-30 11:18:00</div>
			</a-col>
			<a-col :span="5" :offset="1">
				<div class="title">付款信息</div>
				<div class="msg">实付金额：159.80</div>
				<div class="msg">付款方式：支付宝 用户付</div>
				<div class="msg">付款时间：2021-06-30 09:00:00</div>
			</a-col>
			<a-col :span="5" :offset="1">
				<div class="title">买家信息</div>
				<div class="msg">买家：叫我欧文就好</div>
				<div class="msg">买家留言：麻烦尽快发货，谢谢！</div>
			</a-col>
		</a-row>

		<!-- 商品信息 -->
		<a-table :columns="columns" :data-source="data" :pagination="false" class="commodity-info">
			<template #name="{ text, record }">
				<div class="commodity-ceil">
					<img src="@/assets/logo.png" width="60" height="60" />
					<div class="commodity-msg">
						<a @click="onMore('1')">{{ text }}</a>
						<span class="count">规格：3盒</span>
						<span>规格编码：【水润面膜24片WIS达人直播*3】</span>
					</div>
				</div>
			</template>
		</a-table>

		<!-- 价格汇总 -->
		<section class="all-price">
			<div>
				<span class="label">商品总价：</span>
				<span class="value">￥198.00</span>
			</div>

			<div>
				<span class="label">运费：</span>
				<span class="value">￥0.00</span>
			</div>

			<div>
				<span class="label">优惠：</span>
				<span class="value">￥10.00</span>
			</div>

			<div class="final-price">
				<span class="label">实收金额：</span>
				<span class="value">￥188.00</span>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { message } from "ant-design-vue";

const columns = [
	{
		title: "商品",
		dataIndex: "name",
		slots: { customRender: "name" }
	},
	{
		align: "center",
		title: "单价(元)",
		className: "column-money",
		dataIndex: "money"
	},
	{
		align: "center",
		title: "数量",
		dataIndex: "num"
	},
	{
		align: "center",
		title: "优惠(元)",
		dataIndex: "coupon"
	},
	{
		align: "center",
		title: "小计(元)",
		dataIndex: "total"
	},
	{
		align: "center",
		title: "售后状态",
		dataIndex: "afterSale"
	},
	{
		align: "right",
		title: "发货状态",
		dataIndex: "delivery"
	}
];

const data = [
	{
		key: "1",
		name: "WIS水润面膜女补水保湿",
		money: "198.00",
		num: "1件",
		coupon: "10.00",
		total: "188.00",
		afterSale: "主动退款",
		delivery: "已发货"
	}
];

export default defineComponent({
	name: "OrderDetail",
	setup() {
		/**
		 * @description 查看更多
		 */
		const onMore = (id: string) => {
			console.log(id);
		};

		/**
		 * @description 查看更多规则
		 */
		const onMoreRules = () => {
			console.log("12312");
		};

		/**
		 * @description 订单信息
		 */
		const orderSteps = [
			{
				status: "买家下单",
				date: "2021-06-30 09:45:00"
			},
			{
				status: "买家付款",
				date: "2021-06-30 10:45:00"
			},
			{
				status: "确认库存",
				date: "2021-06-30 11:45:00"
			},
			{
				status: "商家发货",
				date: "2021-06-30 12:45:00"
			},
			{
				status: "交易成功"
			}
		];

		/**
		 * @description 当前包裹
		 */
		const currentPackage = ref<string>("1");

		/**
		 * @description 包裹信息
		 */
		const packages = [
			{
				id: "1",
				title: "包裹1",
				data: {
					deliverys: [
						{
							date: "2021-06-30 10:21:19",
							desc: "【黄埔区】一已到达科学大道 快递员 欧文（18888888888）正在为您派送。快件已消毒，小哥体温正常。您也可以联系小哥将快件放置指定代收点或快递柜，祝您身体健康，生活愉快！",
							status: "派送中"
						},
						{
							date: "2021-06-29 12:48:32 ",
							desc: "【广州市】一已到达广州转运中心 快递员 欧文（18888888888）",
							status: "运输中"
						},
						{
							date: "2021-06-28 21:12:54 ",
							desc: "【广州市】一已到达广州市 快递员 欧文（18888888888）",
							status: "运输中"
						}
					]
				}
			},
			{
				id: "2",
				title: "包裹2",
				data: {
					deliverys: [
						{
							date: "2021-06-30 10:21:19",
							desc: "【黄埔区】一已到达科学大道 快递员 欧文（18888888888）正在为您派送。快件已消毒，小哥体温正常。您也可以联系小哥将快件放置指定代收点或快递柜，祝您身体健康，生活愉快！",
							status: "已送达"
						},
						{
							date: "2021-06-29 12:48:32 ",
							desc: "【广州市】一已到达广州转运中心 快递员 欧文（18888888888）",
							status: "派送中"
						},
						{
							date: "2021-06-28 21:12:54 ",
							desc: "【广州市】一已到达广州市 快递员 欧文（18888888888）",
							status: "运输中"
						}
					]
				}
			}
		];

		/**
		 * @description 复制收货人信息
		 */
		const onCopy = (val: string) => {
			console.log(val);
			message.success("内容已复制到剪切板！");
		};

		return { onMore, onMoreRules, orderSteps, currentPackage, packages, onCopy, columns, data };
	}
});
</script>

<style lang="less" scoped>
.order-info {
	.top-msg {
		margin-bottom: 12px;
	}

	.common-gap {
		padding: 0 12px;
	}

	.order-status {
		border: 1px solid #ececec;

		.desc {
			align-self: flex-start;
			padding: 40px 20px;
			border-right: 1px solid #ececec;

			.title {
				font-weight: bold;
				font-size: 18px;
			}
		}

		.steps {
			padding: 0 20px;
		}

		:deep(.ant-steps-item-title) {
			color: #000;
			font-size: 14px;
		}

		:deep(.ant-steps-item-description) {
			font-size: 12px;
		}
	}

	.packages {
		margin: 20px 0;

		.package {
			padding: 20px;
			border: 1px solid #ececec;
			border-top: none;

			.send-info {
				.message {
					margin-bottom: 10px;
				}

				.shop-info {
					color: #aaa;
					margin-top: 20px;

					.name {
						width: 50px;
						margin: 2px 0;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			.delivery {
				.title {
					margin-bottom: 12px;

					.status {
						color: orange;
					}
				}

				:deep(.ant-steps-item-content) {
					width: inherit;

					.ant-steps-item-title,
					.ant-steps-item-description {
						font-size: 14px;
					}
				}
			}
		}
	}

	.total-msg {
		padding: 20px;
		background: #f5f5f5;

		.title {
			font-weight: bold;
			margin-bottom: 12px;
		}

		.copy-btn {
			margin-left: 8px;
		}

		.msg {
			margin-bottom: 10px;
		}
	}

	.commodity-info {
		margin: 20px 0;

		:deep(.ant-table-thead > tr > th) {
			background: #f5f5f5;
		}

		.commodity-ceil {
			display: flex;
			align-items: center;

			.commodity-msg {
				display: flex;
				flex-direction: column;
				margin-left: 8px;
			}
		}
	}

	.all-price {
		text-align: right;

		.label,
		.value {
			width: 100px;
			display: inline-block;
		}

		.final-price {
			margin-top: 20px;
			font-weight: bold;

			.value {
				color: rgb(235, 82, 82);
			}
		}
	}
}
</style>
