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

41.浅拷贝和赋值的区别, 对象第一层的引用是否更改

42.Object.getOwnPropertySymbols(obj), Symbol.for("aaa"), Symbol.keyFor(sa)

## 第十六章

43.const set = new Set(); set.size, set.add(100), set.delete(100), set.has(100) //去重

44.const map = new Map(); map.size, map.set() map.get(), map.has(), map.delete() // Map允许使用对象当做key

45.WeakMap和WeakSet 都是弱引用, 只能引用类型(对象)做key, 不能遍历

46.vue3的响应式
```
  const weakMap = new WeakMap()

  const obj1Map = new Map()
  obj1Map.set('name', [obj1NameFn1, obj1NameFn2])
  obj1Map.set('age', [obj1AgeFn1, obj1AgeFn2])

  weakMap.set(obj1, obj1Map)

  obj1.name = 't08'
  const targetMap = weakMap.get(obj1)
  const fns = targetMap.get('name')
  fns.forEach( item => item() )
```

47.Array.includes(NaN)

## 第十七章

48.Object.fromEntries(new URLSearchParams(queryString))

49.console.log(globalThis)

50.const reg = new FinalizationRegistry((value)=>{}) // 注册的对象会被监听销毁
reg.register(obj, 'obj')

51.let info = new WeakRef(obj) 用来做弱引用赋值

## 第十八章

52.Proxy和Reflect 结合使用
```
const obj = {
  _name: 123,
  get name() {
    return this._name
  }
  set name(value){
    this._name = value
  }
}
const objProxy = new Proxy(obj, {
  get: (target, key, receiver) => {
    return Reflect.get(target, key, receiver)
  },
  set: (target, key, newValue, receiver) => {
    Refelect.set(target, key, newValue, receiver)
  }
})
```

53.尽量使用Reflect方法替换Object方法

## 第十九章

54.Promise: 承诺,大家约定俗成按照此方式写回调

55.resolve(参数) reject不分三种情况 
```
  1> 普通的值或者对象 pending -> fulfilled
  2> 传入一个Promise 由传入Promise决定
  3> 传入一个对象, 并且这个对象实现then方法,根据then函数决定
```

## 第二十章

56.promise -> reject 如果没有错误回调会报错

57.catch返回值 一个新的Promise 用resolve包裹

58.如果then和catch没有return 则参数是undefined

## 第二十一章

## 第二十二章

59.迭代器协议:一个无参或者一个参数的函数,拥有next方法,返回{done,value}的对象

60.可迭代对象:{
  params,
  index,
  迭代器
}
```
  const obj = {
    names: [111,222,333],
    [Symbol.iterator]: function() {
      let index = 0;
      return {
        next: ()=>{
          if (index < this.names.length){
            return {done: false, value: this.names[index]}
          } else {
            return {done: true, value: undefined}
          }
        }
      }
    }
  }
```

61.生成器
```
  function* foo() {
    const value1 = 100
    console.log(value1)
    const n = yield 100 // 第一次执行next的返回值是100, next里的参数是n

    const value2 = 200
    console.log(value2)
    yield 200

    const value3 = 300
    console.log(value3)
    yield bar()

    return 123
  }

  const generator = foo();

  const bar1 = generator.next(1000) // bar1: 100 
```

## 第二十三章

62.await 后面跟的是promise函数, 返回值是resolve和reject

63.await用法
``` js
  async function foo() {
    const aaa = await getData();
  }

  function getData() {
    throw new Error();
  }

  foo().catch(){

  }

```

64.js代码同一时刻只做一件事, 通过事件循环来处理异步操作(分配给浏览器的其他线程).其他线程维护了一个事件队列,再通过js线程执行回调.

65.在执行宏任务前,必须要保证微任务被清空

66.浏览器事件循环
宏任务:settimeout, dom监听, ajax
微任务:promise().then(), queueMicrotask

67.定时器300ms之后才会加入到宏任务队列,并不是先加入队列等待
```
  setTimeout(()=>{}, 300)
```

68.node中 nexttick 微任务会优先于 other micro

## 第二十四章

69.commonJs导出
```
  module.exports{}
  exports = module.exports
``` 

## 第二十六章

70.模块被加载的时候已经执行了一遍代码

71. AMD, CMD: 使用库, 使用define函数

72.本地打开js跨域原因: 引用模块不支持file协议

## 第二十七章

73.peerDependencies: 前置依赖包

74.依赖的版本规范: semver

75.^x.y.z: x是保持不变, y和z最新,~x.y.z: x和y保持不变, z最新

## 第二十九章

76.JSON.stringify(obj, callback, space) 会调用obj.toJSON()

77.JSON实现深拷贝不会转化funciton,自引用

78.localstorage是同一域名下可以访问

## 第三十章

79.设置cookie过期 document.cookie= 'name='' max-age=0'(需要后端设置httponly)

80.Bom: window, document, history, location

81.window继承 EventTarget
```
  window.addEventListener('t08',() => {
    console.log('触发了t08事件')
  })
  window.dispatchEvent(new Event('t08')) // 派发事件
```

82.history.pushState(), location.pathname

## 第三十一章

83.函数参数如果有默认值,会有函数参数作用域

84.函数参数,函数,变量变量提升, 函数 > 参数 > 变量