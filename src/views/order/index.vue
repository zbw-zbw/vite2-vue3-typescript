<template>
	<div>
		<!-- 顶部提示信息 -->
		<a-alert type="info" show-icon closable>
			<template #message>
				线上线下订单管理，售后问题批量解决。
				<a @click="handleAfterOrder">立即查看</a>
			</template>
		</a-alert>

		<!-- 搜索表单 -->
		<a-form ref="orderFormRef" :model="orderForm" class="search-form">
			<a-row type="flex" justify="start" :gutter="[16, 16]">
				<a-col :xxl="4" :xl="6">
					<a-form-item label="订单搜索" name="orderSearchType">
						<a-select v-model:value="orderForm.orderSearchType">
							<a-select-option v-for="item in options.orderSearchList" :key="item.value" :value="item.value">{{
								item.label
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :xxl="4" :xl="6">
					<a-form-item name="orderNum">
						<a-input v-model:value="orderForm.orderNum" />
					</a-form-item>
				</a-col>

				<a-col :xxl="16" :xl="12"></a-col>

				<a-col :xxl="8" :xl="13">
					<a-form-item label="下单时间" class="no-margin-item">
						<a-row>
							<a-col :span="11">
								<a-form-item name="orderStartTime">
									<a-date-picker class="full-width" show-time v-model:value="orderForm.orderStartTime" />
								</a-form-item>
							</a-col>
							<a-col :span="2" class="text-align-c"><span class="date-gap">至</span></a-col>
							<a-col :span="11">
								<a-form-item name="orderEndTime">
									<a-date-picker class="full-width" show-time v-model:value="orderForm.orderEndTime" />
								</a-form-item>
							</a-col>
						</a-row>
					</a-form-item>
				</a-col>
				<a-col :xxl="6" :xl="5">
					<a-space class="order-time-btns">
						<a-button size="small" @click="hanldeOrderTime('today')">今</a-button>
						<a-button size="small" @click="hanldeOrderTime('yesterday')">昨</a-button>
						<a-button size="small" @click="hanldeOrderTime('week')">近7天</a-button>
						<a-button size="small" @click="hanldeOrderTime('month')">近30天</a-button>
					</a-space>
				</a-col>

				<a-col :xxl="10" :xl="6"></a-col>

				<a-col :xxl="4" :xl="6">
					<a-form-item label="商品名称" name="name">
						<a-input v-model:value="orderForm.name" />
					</a-form-item>
				</a-col>
				<a-col :xxl="4" :xl="6">
					<a-form-item label="订单类型" name="orderType">
						<a-select v-model:value="orderForm.orderType">
							<a-select-option v-for="item in options.orderTypeList" :key="item.value" :value="item.value">{{
								item.label
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :xxl="4" :xl="6">
					<a-form-item label="售后状态" name="afterSaleStatus">
						<a-select v-model:value="orderForm.afterSaleStatus">
							<a-select-option v-for="item in options.afterSaleStatusList" :key="item.value" :value="item.value">{{
								item.label
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>

				<a-col :xxl="12" :xl="6"></a-col>

				<a-col :xxl="4" :xl="6">
					<a-form-item label="订单状态" name="orderStatus">
						<a-select v-model:value="orderForm.orderStatus">
							<a-select-option v-for="item in options.orderStatusList" :key="item.value" :value="item.value">{{
								item.label
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :xxl="4" :xl="6">
					<a-form-item label="配送方式" name="delivery">
						<a-select v-model:value="orderForm.delivery">
							<a-select-option v-for="item in options.deliveryMethodList" :key="item.value" :value="item.value">{{
								item.label
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :xxl="4" :xl="6">
					<a-form-item label="付款方式" name="payMethod">
						<a-select v-model:value="orderForm.payMethod">
							<a-select-option v-for="item in options.payMethodList" :key="item.value" :value="item.value">{{
								item.label
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>

				<a-col :xxl="12" :xl="6"></a-col>
			</a-row>

			<a-form-item class="submit-btns">
				<a-button type="primary" @click="onSubmit">筛选</a-button>
				<a-button class="reset" @click="OnReset">重置</a-button>
			</a-form-item>
		</a-form>

		<!-- tabs -->
		<a-tabs type="card" v-model:activeKey="currentTab" @change="onChangeTab">
			<a-tab-pane v-for="item in options.orderStatusList" :key="item.value" :tab="item.label">
				<!-- 表头 -->
				<a-row class="table-title">
					<a-col :span="8" class="text-align-l">商品</a-col>
					<a-col :span="3" class="text-align-r padding-r-16">单价(元)/数量</a-col>
					<a-col :span="2">售后</a-col>
					<a-col :span="3">买家 / 收货人</a-col>
					<a-col :span="2">配送方式</a-col>
					<a-col :span="2">实收金额(元)</a-col>
					<a-col :span="2">订单状态</a-col>
					<a-col :span="2" class="text-align-r">操作</a-col>
				</a-row>

				<!-- loading -->
				<div class="table-loading" v-if="tableLoading"><a-spin :spinning="tableLoading" /></div>

				<!-- 列表数据 -->
				<template v-else>
					<div v-for="item in [1, 2, 3]">
						<!-- 表格操作栏 -->
						<a-row class="table-action">
							<a-col :span="16" class="text-align-l">
								<span>订单号：12345678900000121</span>
								<a @click="onMore('1')" class="more">更多</a>
								<span>下单时间：2021-06-29 15:51:30</span>
							</a-col>
							<a-col :span="8" class="text-align-r">
								<a @click="onDetail('1')">查看详情</a>
								<span class="space">-</span>
								<a @click="onRemark('1')">备注</a>
							</a-col>
						</a-row>

						<!-- 表格数据 -->
						<a-row class="table-data">
							<a-col :span="8" class="goods-data">
								<img src="@/assets/logo.png" class="margin-right-8" width="60" height="60" />
								<div>
									<a @click="onMore('1')">WIS水润面膜女补水保湿 破尿酸清洁收缩毛孔 紧致控油</a>
									<div class="count">3盒</div>
									<div class="order-status">已发货</div>
								</div>
							</a-col>
							<a-col :span="3" class="ceil padding-r-16 price">
								<div>159.80</div>
								<div>1件</div>
							</a-col>
							<a-col :span="2" class="ceil"></a-col>
							<a-col :span="3" class="ceil">
								<a>叫我欧文就好</a>
								<div>Kyrie Wen</div>
								<div>18888888888</div>
							</a-col>
							<a-col :span="2" class="ceil">快递寄出</a-col>
							<a-col :span="2" class="ceil">159.80</a-col>
							<a-col :span="2" class="ceil">商家已发货</a-col>
						</a-row>
					</div>

					<!-- 分页 -->
					<a-pagination
						class="text-align-r"
						show-quick-jumper
						v-model:current="currentPage"
						:total="100"
						@change="onPageChange"
					/>
				</template>
			</a-tab-pane>
		</a-tabs>

		<!-- 卖家备注弹窗 -->
		<a-modal v-model:visible="remarkModal.visible" title="卖家备注" @ok="handleRemark">
			<a-textarea
				placeholder="请输入..."
				v-model:value="remarkModal.remark"
				:autoSize="{ minRows: 2, maxRows: 10 }"
				showCount
				:maxlength="256"
			/>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw, UnwrapRef } from "@vue/runtime-core";
import router from "@/router";
import options from "./options";

/**
 * @description 搜索表单接口
 */
interface IOrderForm {
	orderSearchType: string | undefined;
	orderNum: string | undefined;
	orderStartTime: string | undefined;
	orderEndTime: string | undefined;
	name: string | undefined;
	orderType: string | undefined;
	afterSaleStatus: string | undefined;
	orderStatus: string | undefined;
	delivery: string | undefined;
	payMethod: string | undefined;
}

export default defineComponent({
	name: "Order",
	setup() {
		/**
		 * @description 点击立即查看
		 */
		const handleAfterOrder = () => {
			console.log("立即查看");
		};

		/**
		 * @description 表单ref
		 */
		const orderFormRef = ref();

		/**
		 * @description 搜索表单
		 */
		const orderForm: UnwrapRef<IOrderForm> = reactive({
			orderSearchType: "",
			orderNum: "",
			orderStartTime: "",
			orderEndTime: "",
			name: "",
			orderType: "",
			afterSaleStatus: "",
			orderStatus: "",
			delivery: "",
			payMethod: ""
		});

		/**
		 * @description 筛选下单时间
		 */
		const hanldeOrderTime = type => {
			console.log("type", type);
		};

		/**
		 * @description 点击筛选
		 */
		const onSubmit = () => {
			console.log("submit", toRaw(orderForm));
		};

		/**
		 * @description 点击重置
		 */
		const OnReset = () => {
			orderFormRef.value.resetFields();
		};

		/**
		 * @description 当前tab的订单状态
		 */
		const currentTab = ref<string>("all");

		/**
		 * @description 改变tab的订单状态
		 */
		const onChangeTab = (activeKey: string) => {
			console.log(activeKey);
		};

		const tableLoading = ref<boolean>(false);

		/**
		 * @description 查看更多
		 */
		const onMore = (id: string) => {
			console.log(id);
		};

		/**
		 * @description 查看订单详情
		 */
		const onDetail = (id: string) => {
			console.log(id);
			router.push({ path: "/order/detail" });
		};

		/**
		 * @description 卖家备注数据
		 */
		const remarkModal = reactive({
			visible: false,
			remark: ""
		});

		/**
		 * @description 打开卖家备注弹窗
		 */
		const onRemark = (id: string) => {
			console.log(id);
			remarkModal.remark = "";
			remarkModal.visible = true;
		};

		/**
		 * @description 提交卖家备注
		 */
		const handleRemark = (id: string) => {
			console.log(id);
		};

		/**
		 * @description 列表分页
		 */
		const currentPage = 1;
		const onPageChange = page => {
			console.log(page);
		};

		onMounted(() => {
			tableLoading.value = true;
			setTimeout(() => {
				tableLoading.value = false;
			}, 2000);
		});

		return {
			handleAfterOrder,
			orderForm,
			orderFormRef,
			options,
			hanldeOrderTime,
			onSubmit,
			OnReset,
			currentTab,
			onChangeTab,
			tableLoading,
			onMore,
			onDetail,
			remarkModal,
			onRemark,
			handleRemark,
			currentPage,
			onPageChange
		};
	}
});
</script>

<style lang="less" scoped>
.search-form {
	margin: 16px 0;
	padding: 16px;
	background: #fafafa;

	.order-time-btns button {
		height: 32px;
	}
	.no-margin-item {
		margin-bottom: 0;
	}
	.date-gap {
		vertical-align: middle;
		display: inline-block;
		margin-top: 5px;
	}
}

.table-title {
	padding: 12px;
	margin-bottom: 16px;
	text-align: center;
	background: #fafafa;
}

.table-loading {
	width: 100%;
	text-align: center;
	padding: 20px 0;
	background: #fff;
}

.table-action {
	padding: 16px;
	background: #fafafa;
	border: 1px solid #ececec;

	.more {
		padding: 0 12px;
	}

	.space {
		padding: 0 4px;
	}
}

.table-data {
	margin-bottom: 16px;
	border: 1px solid #ececec;
	border-top: none;
	text-align: right;

	.ceil {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-right: 1px solid #ececec;
	}

	.price {
		align-items: flex-end;
	}

	.goods-data {
		display: flex;
		align-items: center;
		text-align: left;
		padding: 12px;

		.count {
			margin: 6px 0 2px;
		}
	}

	.order-status {
		color: red;
		padding: 0 4px;
		text-align: center;
		display: inline-block;
		border: 1px solid red;
	}
}

.submit-btns {
	margin-left: 70px;

	.reset {
		margin-left: 10px;
	}
}

.margin-right-8 {
	margin-right: 8px;
}

.padding-r-16 {
	padding-right: 16px;
}
</style>
