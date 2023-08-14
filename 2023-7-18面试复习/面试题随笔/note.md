## 知识点

1.post和put 的区别， put 是 set值，无法new map

2.http ie浏览器 get url 2083 个字符

3.一个TCP连接 同时只能发送一个 请求， 默认情况浏览器最大6个连接

4.TCP 粘包 当传输了data1，data2。 先接受了data1的部分，再接受了data2全部。 udp不会拆分为部分

5.TCP/IP 五层协议 ： 应用层（http）， 传输层（tcp/ip）,网络层（ip）, 数据链路层，物理层

6.状态码： 200， 204（无content返回）， 301（永久）， 302， 400（语法错误）， 401（权限不对）， 403（禁止访问）， 404（无对应资源） 500， 503（发版）

7.数组和对象的赋值都是做了地址的赋值

8.Math.random伴随着Math.floor

9.array.sort() 默认返回a.charCodeAt 和 b.charCodeAt

10.Commonjs和ESModule的区别
  * 写法不一样 module.exports 和 export
  * import 在静态编译期就确定代码
  * import 是值的引用, require是值的复制
  * import 导出模块不能重新定义(值的引用)
  * import 不可以写在函数体里

11.JSONP
```
// 1.通过script标签 src请求跨域
// 2.将请求函数名传入后端, 后端返回函数包裹的data
$ curl https://shanyue.tech/api/user?id=100&callback=padding

padding({
  "id": 100,
  "name": "shanyue",
  "wechat": "xxxxx",
  "phone": "183xxxxxxxx"
})
```

12.script defer和 async

*正常script标签阻塞html解析*

![Alt](https://img-blog.csdnimg.cn/img_convert/1b7fb0ea577b9b34f5482bdcfb35f99f.png)

**defer**
![Alt](https://img-blog.csdnimg.cn/img_convert/2008bbc71a37d973f84d52a9b5cd0205.png)

**async**
![Alt](https://img-blog.csdnimg.cn/img_convert/43bc493bc2c57d819f7315d84ad5363c.png)

13.parseInt(string, radix): radix是指定string的进制.string.toString(16)

14.unicode和utf编码格式: 码点->编号 码元 -> 确定一个字符的最小单元

15.浮点数的存储:符号位S(1位)指数位E(11位)有效位M(52位)

16.js 基础类型在计算机中存储为8个字节

17.js小数部位使用乘2取整法, 化为科学记数法, 然后存储

符号位:1是负数,0是非负数

指数位:11位中位数是1023 因为有负数

有效位:科学记数法的有效值, 后面补零
