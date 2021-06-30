import { Plugin } from "vue";
import {
	Alert,
	Breadcrumb,
	Button,
	Col,
	Card,
	Dropdown,
	Form,
	Input,
	Layout,
	Menu,
	Modal,
	Row,
	Space,
	Table,
	Avatar,
	Tooltip,
	Popover,
	Popconfirm,
	Select,
	DatePicker,
	Tabs,
	Steps
} from "ant-design-vue";

// 中间件
const antdInstall: Plugin = app => {
	app
		.use(Row)
		.use(Col)
		.use(Card)
		.use(Menu)
		.use(Layout)
		.use(Breadcrumb)
		.use(Button)
		.use(Dropdown)
		.use(Space)
		.use(Alert)
		.use(Form)
		.use(Input)
		.use(Modal)
		.use(Table)
		.use(Avatar)
		.use(Popover)
		.use(Popconfirm)
		.use(Select)
		.use(DatePicker)
		.use(Tabs)
		.use(Steps)
		.use(Tooltip);
};

export default antdInstall;
