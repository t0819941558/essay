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

11.browserslist 是通过 caniuse网站来查找 浏览器符合条件的版本

## 第三章

12.postcss-preset-env 是处理postcss的插件

13.css-loader的importloaders的作用是，当在css中遇到@imort重新使用postcss-loader

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

28.devtool: none, false 是production ， cheap-module-sourcemap和sourcewmap 是 developmentr

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

 39. eslint ：{
   env: {},
   parserOptions:{},
   rules:{},
   entends:{}
 }

 ## 第九章





 


