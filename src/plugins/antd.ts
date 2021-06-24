import { Plugin } from "vue";
import { Alert, Breadcrumb, Button, Col, Dropdown, Form, Input, Layout, Menu, Row, Space } from "ant-design-vue";

// 中间件
const antdInstall: Plugin = app => {
	app
		.use(Row)
		.use(Col)
		.use(Menu)
		.use(Layout)
		.use(Breadcrumb)
		.use(Button)
		.use(Dropdown)
		.use(Space)
		.use(Alert)
		.use(Form)
		.use(Input);
};

export default antdInstall;
