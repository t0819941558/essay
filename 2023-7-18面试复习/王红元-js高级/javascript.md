# JavaScrtipt

## 第一章

1.浏览器从服务端下载index.html，遇到js文件，再去下载

2.浏览器引擎 webkit，blink： 包含 web Core负责html解析，布局渲染等， js引擎 v8，jscore

3.js为什么要转成AST，因为不同平台cpu指令集不同 AST -> 字节码

4.setTimeout 在 js引擎 Parse时候加入进去

5.作用域提升
```
  // 解析期(Parse成AST)，给globalObject 添加了全局对象
  var globalObject = {
    String: '类',
    setTimeout: '函数',
    name: undefined,
  }
  // 执行期
  var name = 't08';
  console.log(name);
  console.log(number);
  var number = 123;
```

6.js解析时候，全局上下文调用栈（当做一个宏任务）

## 第二章

7.函数在编译时期，只是做预编译， 并不会进行 变量定义

8.获取局部变量的时候，需要确定根据作用域链 递归查找。 作用域链和函数的定义有关

9.var a = b = 10 转化成 var a = 10; b = 10

10.GC 引用计数法 标记清理法

## 第三章

11.高阶函数：如果接受另一个函数作为参数，或者以一个函数作为返回值的函数
```
  function makeAdder(count) {
    function add(num) {
      return num + count
    }

    return add
  }

  const res = makeAdder(10)(5);

```

12.函数可以赋值给变量，也可以作为函数参数，还可以作为函数返回值，因此JavaScript中函数是一等公民

13.闭包： 一个函数和他作用域链里的对象

14.函数对象保存堆空间0x100

15.闭包清除， window.bar = null （标记清除法，从globalObject开始）

## 第四章

16.this和函数的调用有关系

17.this的绑定 默认绑定，隐式绑定，显式绑定，new 绑定

18.bind(this)返回一个新函数

19.new 函数的时候 默认返回当前的this对象

## 第五章

20.高阶函数(map,forEach)第二个参数绑定this

21.foo.call(null) // window

22.(p = obj.foo)() // window

23.连续赋值没有执行先后顺序
```
  let a = {n: 2};
  let b = a;
  a.x = a = {l: 2};

  a => {l: 2} b => {
    n: 2, 
    x:{ l:2 }
  }
```

## 第六章

20. ... 展开运算符、剩余参数

21.剩余参数默认是空数组

22.arguments是类数组，通过Array.from 和展开运算符改为数组

## 第七章

23.纯函数：同样的输入，同样的输出 、没有副作用

24.splice 改变原来数组的值，返回对应新数组

24.纯函数为了保证props不被修改，保持单向数据流的原则

## 第八章

25.with 语句形成作用域

26.eval 执行 string(javascript 代码)

27.use strict 函数内 age = 20 全局变量, true.foo =123 默认绑定是undefined

## 第九章

28.Object.defineProperty 存取属性描述符, 数据属性描述符
```
  const obj = {
    _name: 'name'
  }
  Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 't08'
  })
  Object.definePeoperty(obj, 'name2', {
    configurable: false,
    enumerable: false,
    get: function(){
      return this._name;
    }
    set: function(value){
      this._name = value
    }
  })
  // configurable 不可删除, 不可配置
  // enumerable 就不会在取值的时候展示出来
  // writable 不可以用 = 赋值
```

29.每个对象都是有原型的(__proto__:隐式原型)

30.Object.getPrototypeOf(obj) === obj.__proto__(浏览器实现)

31.foo因为是函数,所以有有显示原型(prototype:在new的时候 子对象.__proto__ = foo.prototype).

32.foo.prototype.constructor === foo

## 第十章

33.info.hasOwnProerty 判断非继承属性

34.Object类是所有的父类

35.instanceof 右侧是 构造**函数**

36.prototype是一个包含constructor: foo 的对象, 所以__proto__ === Object.prototype

## 第十一章

37.寄生组合式继承
```
function inheritPrototype(SubType, SuperType) {
  SubType.prototype = Objec.create(SuperType.prototype)
  Object.defineProperty(SubType.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person(name, age, friends) {
  this.name = name
  this.age = age
  this.friends = friends
}

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age, friends)
  this.sno = sno
  this.score = score
}

inheritPrototype(Student, Person)
```

## 第十二章

38.let p = new Car() p instanceof Car

39.Object.create(), 创建原型对象
```
Rectangle.prototype = Object.create(Shape.prototype, {
  // 如果不将 Rectangle.prototype.constructor 设置为 Rectangle，
  // 它将采用 Shape（父类）的 prototype.constructor。
  // 为避免这种情况，我们将 prototype.constructor 设置为 Rectangle（子类）。
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
```

## 第十三章


## 第十五章

40.foo`Hello${name}Wo${age}rld`标签魔板字符串