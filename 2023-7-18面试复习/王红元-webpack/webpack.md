# webpack： 静态的，模块化，现代的 打包工具

## 第一章

1.js 的演化， 从一开始的js只做表单校验， 到后来的前端请求变多， jquery时代， 到三大框架时代。 模块化不好处理， 所以需要webpack

2.BFC 的作用 ，单独一块 content，position： absolue， 解决margin塌陷问题（float）。文字环绕的本质是 环绕的文字，不能占用float的块

3.vite底层使用的是rollup

4.require ('webpack')后 会是返回一个complier 的函数

5.cli这种东西，就是 通过node去解析config

6.commonjs 是require 和modules.exports es6 是import 和export

7.webpack output 必须是绝对路径

8.loader 是对模块中的源代码进行转换

9.css-loader是对.css文件进行解析，但是没有插入到页面样式。style-loader是插入到页面内

10.postcss-loader是为了转换样式（prefix）

11.browserslist 是通过 Can I Use 网站来查找 浏览器符合条件的版本

## 第三章

12.postcss-preset-env 是处理postcss的插件

13.css-loader的importloaderss属性的作用是，当在css中遇到@imort重新使用postcss-loader

14.less-loader 的javascriptEnabled改为true 是针对 antd对less的报错

15..avif使用file-loader .png|.jpg使用url-loader .svg使用svgr，babel-loader

16.file-loader options: {
  name: 'img/[name].[hash:6].[ext]'
}

17.url-loader 转换成 base64 嵌入到js里，所以没有 png资源（小的图片，减少请求）
url-loader options: {
  name: 'img/[name].[hash:6].[ext]',
  limit: 100 * 1024
} (目前reactresource使用url-loader)

## 第四章

18.webpack5 加载 资源 使用 type：'asset/resource' (file-loader) | 'asset/inline' (url-loader)

19. type: 'asset'{
  generator: {
    name: 'img/[name].[hash:6][ext]'
  },
  parser:{
    dataUrlCondition:{
      maxSize: 100* 1024
    }
  }
} (在 url和file之间切换，原来的url-loader)

20.loader是用来转化特定的模块类型，plugin 是用来执行更广泛的任务（将css单独分离成css文件，styleloader会放到行内style）

21.常见的plugin：CleanWebpackPlugin ,HtmlWebpackPlugin({title, template}), DefinePlugin({BASE_URL: `'./'`}), copy-webpack-plugin

22.commonjs 的module.exports.aaa = exports.aaa

## 第五章

22.webpack es module和 commonjs module可以相互引用的原因是，webpack__require(自己实现require可以做处理)

23.webpack不会重复引用的原理：使用文件路径做key， 文件执行函数做value

24.webpack es 解析比commonjs 多了一步判断是否是es 和 exports的函数代理

24.webpack——modules 是记录所有函数的执行方法， webpack——modules--cache记录key和value， webpack——require是require函数

25.source-map是映射到原始的源文件

26.source-map的缺点，大小是源文件2.5倍

## 第六章

27.eval函数是因为能在最后加mapping的注释，能够映射

28.devtool: none, false 是production ， cheap-module-sourcemap和sourcewmap 是 development

29.no-resourece-source-map 是没有# mappingurl

30.babel的作用， jsx， es6 -> es5， typescript

31.babel的原理， js代码执行经过parsing变成AST然后变成Bytecode。是一个js的编译器
 词法分析-> 语法分析-> AST-> plugin -> new AST -> code Generator

 ## 第七章

 32.babel-loader 使用预设 @babel/preset-env polyfill

 33.elementplus, babel，umi 都是采用多包管理

 34.option: {useBuildIns：'usage'} 用来控制 polyfill

 35.@babel/preset-react 应对 jsx

 36.@babel/preset-typescript 应对 ts

 ## 第八章

 37.tsc --no-emit（不新增js） --watch

 38.npx 执行的都是 node_modules下的bin里的命令

 39.eslint ：{
   env: {},
   parserOptions:{},
   rules:{},
   entends:{}
 }

 ## 第九章

40.HMR优势，模块级的替换，不用刷新页面，对比（webpack --watch）

41.热更新需要指定监听哪些模块，框架实现 vue（vue-loader） react(react-refresh)

42.webpack-dev-server创建了两个服务 express（内存种存放静态文件）、scoket（推送信息到浏览器）

## 第十章

43.output:{
  publicPath: './' // 为了使打包出来的文件引用相对路径而不是绝对路径 ./build/bundle.js
}

44.devserver和output的 publicPath 一般是一样的

45.dev-server配置
```javascript
devserver:{
  proxy:{
    '/api' :{
      target: 'http://',
      changeOrigin: true
    }
  } // 解决跨域问题
}
```

46.webpack使用require('http-proxy-middleware')来完成proxy

47.刷新路由，返回404的解决方案， 生产环境要配置nginx（如果找不到当前页面返回index.html）。开发环境 proxy: {
  historyApiFallback: true
}

48.resolve: {
  extensions: ['.js', 'tsx'],
  alias: {

  }
}

## 第十一章

49.cross-env的作用:cross-env 能够提供一个设置环境变量的scripts，这样我们就能够以unix方式设置环境变量，然而在windows上也能够兼容的。

50.optimization:{
  splitChunks: {
    chunks: 'all',
    name: 'development',
  }
}react 默认值

51.chunk.js 是异步加载build， bundle.js是同步加载build

## 第十二章

52.通过魔法注释来给异步打的包取名字， 路由的懒加载也是一样的原理， 再点击后才下载element.js
```
button.addEventListener("click", ()=>{
  import(/* webpackChunkName: 'element' */'./element').then({default: element}) => {
    document.body.appendChild(element)
  }
}) 
```
53.runtimechunk 导入，解析等运行时代码分包

54.CDN：content Delivery Network 源节点 -> 父节点 -> 边缘节点 -> 用户

55.script defer='defer' 资源会下载，但会等js解析后，才会执行

56.process.env 里所有的值都是 string 类型

57.[hash]: 所有文件都变, [chunkhash] 模块统一变， js改了， css也变, [contenthash] 文件内容不改就不会变

## 第十三章

58.DLL：Dynamic Link Library 是软件在windows上实现共享函数库的一种方式

59.Teser 进行 压缩

60.Tree Shaking

## 第十四章

61.HTTP压缩 accept gzip const CompressionPlugin = require('compression-webpack-plugin')

62.直接 npm run build， 方便npm publish。挂载信息到window

```
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[contentHash:6][ext]',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd'，
    library: 'why'
  }
} 
```

## 第十五章

63.webpack 包分析 运用插件webpack-bundle-analyzer vite包分析也可以用

64.const complier = webpack(config) complier.run((err, stats)=>{}) t08-cli

65.自定义插件实现自己的apply

66.this.hooks.beforeCompile.tap(()=>{
  // 将函数放入map， 等call的时候执行
})

## 第十六章

67.webpack源码：webpack-cli判断 安装包 -> 注册 option为plugin -> this.hooks.call ()

68.自定义loader，传入参数为 content（模块内容） NormalLoader，PitchLoader。 返回内容 this.callback && this.async 
获取options this.getOption()（库 loader-utils）

69.自定义loader
```
module.exports = function (content){
  console.log(content, '执行了normalLoader')
} // 执行顺序从右到左

module.exports.pitch = function (content){
  console.log(content, '执行了pitchLoader')
} // 执行顺序从左到右
```

## 第十七章

70.plugin hook， new SyncHook()（require('tapable')） this.hook.call 调用， this.hook.tap 定义

71.自定义plugin
```
  class CustomPlugin {
    apply (complier){
      complier.hooks.afterEmit.tapAsync('CustomPlugin', (compilation, callback)=>{
        console.log('执行了自定义plugin')
        callback();
      })
    }
  }

  module.exports = CustomPlugin
```

72.const names = [undefined, false, 'abc', ''].filter(Boolean)

73.webpack常用配置
```
webpackConfig = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  }
  resolve: {
    extensions: ['.js', 'tsx'],
    modules: ['node_modules'],
    alias: {
      '@': './src'
    }
  }
  module: {
    rules: [{
      test: '/.less/',
      use: [
        'style-loader',
        'css-loader',
        'postCss-loader',
        'less-loader' // 通过content，返回新的js 模块
      ]
    }]
  }
  plugins: [
    new HtmlWebpackPlugin(), // 实现apply
    new DefinePlugin(),
    new ReactRefreshPlugin(),
    new WebpackBundleAnalyzer()
  ]
}
```

## 第十八章

74.vue-cli-service  configureWebpack chainWebpack

75.gulp 是一系列 task执行任务， rollup 是一个模块化打包工具

## 第十九章

76.rollup 优势打包多种格式
```
output：[{
  format: 'umd',
  name: 't08Utils',
  file: 'dist/t08.umd.js'
},{
  format: 'es',
  name: 't08Utils',
  file: 'dist/t08.es.js'
},{
  format: 'cjs',
  name: 't08Utils',
  file: 'dist/t08.commonjs.js'
}]

```

77.rollup 默认只支持 es模块化

## 第二十章

78.rollup --environment ENV:development process.ENV === 'development'

79.vite 将 ts、less的请求，编译成 es的js文件，从而直接被浏览器使用

80.vite 打包速度快是因为 pre-build 将 devDependencies 里的包打包放到了node_module下的.vite里

81.vite 编译快是因为 使用esbuild，直接转换成 机器代码不用转化成ast

82.esbuild 平替 babel

