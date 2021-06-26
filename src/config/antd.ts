import { Plugin } from "vue";
import {
	Alert,
	Breadcrumb,
	Button,
	Col,
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
	Tooltip
} from "ant-design-vue";

// 中间件
const antdInstall: Plugin = app => {
	app
		.use(Row)
		.use(Col)
		.use(Layout)
		.use(Menu)
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
		.use(Tooltip);
};

export default antdInstall;
