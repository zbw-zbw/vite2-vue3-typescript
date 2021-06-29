# 技术栈：vue3 + vite2 + typeScript + ant design

### 已封装的功能：

- vite.config.js、buildConfig.js（项目基本配置和打包配置）
- layout（包括登录页、基本布局、侧边导航、面包屑等）
- router（包括路由守卫、重定向、404页面等）
- vuex（包括获取token、用户信息、动态面包屑等）
- axios（包括取消重复请求、请求拦截、处理后端返回的数据及提示等）

### 文件目录说明：

- api（接口配置）
- assets（静态资源）
- components（通用组件）
- config（antd组件的引入）
- enums（ts公共的枚举）
- hooks（可抽离的业务逻辑）
- layout（页面布局）
- plugins（通用方法）
- router（路由配置和路由守卫）
- store（vuex-按模块分类）
- styles（通用样式文件）
- utils（工具：已有-axios类和类型判断）
- views（系统页面）

### api配置-demo：



```ts
/**
 * @description 删除接口
 */
export function delProductApi(id: string) {
	return axios.fetch(
		{
			url: "http://api-supply.qa.fandow.com/v1/product/" + id,
			method: RequestMethodsEnum.DELETE
		},
		{
			isShowMsg: true,
			successMsg: "删除成功"
		}
	);
}

// 第一个参数（必填）：fetch的请求配置
// 第二个参数(可选):可配置请求成功或失败的提示信息

```
