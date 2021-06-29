import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import importerPlugin from "vite-plugin-importer";
import legacyPlugin from "@vitejs/plugin-legacy";
import path from "path";

import { buildConfig } from "./build/buildConfig";

const joinPath = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true // 开启这个是为了使用antd的less样式
			}
		}
	},
	plugins: [
		vue(),
		// 处理antd按需加载的插件
		importerPlugin({
			libraryName: "ant-design-vue",
			libraryDirectory: "es",
			style: true // 加载less文件
		}),
		legacyPlugin({
			targets: ["defaults", "not IE 11"] // 低版本浏览器兼容
		})
	],
	server: {
		host: "localhost", // 服务器主机名
		port: 8080, // 端口号
		open: true, // 自动打开浏览器
		// 自定义代理规则
		proxy: {
			"/api": {
				target: "xxxx", // 接口域名
				changeOrigin: true, // 请求头中host会设置成target 可通过request.getHeader("Host")拿到真实的接口域名
				ws: true, // 代理websocket
				rewrite: pathStr => pathStr.replace("/api", "") // 重写路径
			}
		}
	},
	build: buildConfig, //打包配置
	resolve: {
		alias: {
			"@": joinPath("./src") // 配置别名
		}
	}
});
