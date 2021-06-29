export const buildConfig = {
  target: 'modules',  // 默认值
  polyfillDynamicImport: true,  // 自动注入动态导入的polyfill
  outDir: 'dist',  // 打包目录
  assetsDir: 'assets',  // 静态资源目录
  assetsInlineLimit: 4096,  // 小于这个阈值的导入将作为base64 URL内联（设置为0禁用内联）
  cssCodeSplit: true, // 开启css代码拆分
  sourcemap: true,  // 生成源代码文件
};