<template>
	<div>
		<a-table
			bordered
			rowKey="id"
			:loading="loading"
			:columns="columns"
			:data-source="list"
			:row-selection="rowSelection"
			:pagination="paginationOptions"
			@change="handleChange"
		>
			<template #action="{ record }">
				<a-space>
					<a-button type="primary" size="small" @click="handleEdit(record)">编辑</a-button>
					<a-popconfirm title="你确定要删除吗？" placement="left" @confirm="handleDel(record)">
						<a-button type="danger" size="small">删除</a-button>
					</a-popconfirm>
				</a-space>
			</template>
		</a-table>
	</div>
</template>

<script lang="ts">
import { delProductApi, getProductListApi } from "@/api/product";
import format from "@/plugins/format";
import { defineComponent, h, onMounted, reactive, toRefs } from "@vue/runtime-core";
import { ColumnProps } from "ant-design-vue/lib/table/interface";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { message as Message } from "ant-design-vue";

type Key = ColumnProps["key"];

interface DataType {
	key: Key;
	name: string;
	age: number;
	address: string;
}

export default defineComponent({
	name: "shop-design",
	components: {
		QuestionCircleOutlined
	},
	setup() {
		/**
		 * @description 表格数据
		 */
		const data = reactive({
			list: [],
			loading: false
		});

		/**
		 * @description 搜索参数
		 */
		const searchParams = reactive({
			page: 1,
			perPage: 10,
			product_type: 1
		});

		/**
		 * @description	表格行配置
		 */
		const columns: ColumnProps[] = [
			{
				title: "序号",
				align: "center",
				customRender: ({ index }) => index + 1
			},
			{
				title: "品牌",
				align: "center",
				dataIndex: "brand",
				customRender: ({ text, record: { id } }) => h("a", { onclick: () => openDetail(id) }, text)
			},
			{
				title: "创建人",
				align: "center",
				dataIndex: "created_by"
			},
			{
				title: "创建时间",
				align: "center",
				dataIndex: "created_at",
				customRender: ({ text }) => format(+text)
			},
			{
				title: "单品代码",
				align: "center",
				dataIndex: "mk_code"
			},
			{
				title: "货号",
				align: "center",
				dataIndex: "item_no"
			},
			{
				title: "净含量 / g",
				align: "center",
				dataIndex: "listing"
			},
			{
				title: "操作",
				align: "center",
				slots: { customRender: "action" }
			}
		];

		/**
		 * @description 表格选择行
		 */
		const rowSelection = {
			onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			},
			getCheckboxProps: (record: DataType) => ({
				disabled: record.name === "Disabled User", // Column configuration not to be checked
				name: record.name
			})
		};

		/**
		 * @description 表格分页配置
		 */
		const paginationOptions = reactive({
			current: 1,
			pageSize: 10,
			total: 0,
			showQuickJumper: true,
			showSizeChanger: true
		});

		const handleChange = pagination => {
			const { current, pageSize } = pagination;
			searchParams.page = current;
			searchParams.perPage = pageSize;
			getProductList();
		};

		/**
		 * @description	获取产品列表
		 */
		const getProductList = async () => {
			try {
				data.loading = true;
				const { items } = await getProductListApi(searchParams);
				data.list = items;
				data.loading = false;
			} catch (error) {
				console.log(error);
				data.list = error.items; // 这里走error是因为axios里我默认封装是以data为返回值，这里借用采购的接口 返回的是items
				const { currentPage: current, perPage: pageSize, totalCount: total } = error._meta;
				paginationOptions.current = current;
				paginationOptions.pageSize = pageSize;
				paginationOptions.total = total;
				data.loading = false;
			}
		};

		/**
		 * @description	打开详情
		 */
		const openDetail = id => {
			console.log(id);
			Message.warn("我只做了删除功能~");
		};

		/**
		 * @description	点击编辑
		 */
		const handleEdit = record => {
			console.log(record);
			Message.warn("我只做了删除功能~");
		};

		/**
		 * @description	点击删除
		 */
		const handleDel = async record => {
			try {
				await delProductApi(record.id);
				getProductList();
			} catch (error) {
				console.log(error);
			}
		};

		onMounted(() => {
			getProductList();
		});

		return {
			...toRefs(data),
			columns,
			rowSelection,
			paginationOptions,
			handleChange,
			handleEdit,
			handleDel
		};
	}
});
</script>

<style lang="less" scoped></style>
