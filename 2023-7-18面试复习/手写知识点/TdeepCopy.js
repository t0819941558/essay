function deepCopy(obj, weakMap = new WeakMap()){
    if (obj instanceof Set){
        return new Set([...obj])
    }

    if (obj instanceof Map){
        return new Map([...obj])
    }

    if (typeof obj === 'function'){
        return obj
    }
    
    const isObject = typeof obj === 'object'
    if (!isObject){
        return obj
    }

    const base = (Array.isArray(obj)) ? [] : {};

    if (weakMap.has(obj)){
        return obj
    } else {
        weakMap.set(obj, obj)
    }

    for (let key in obj){
        base[key] = deepCopy(obj[key], weakMap)
    }

    const symbolKeys = Object.getOwnPropertySymbols(obj);

    for (let key in symbolKeys){
        base[key] = deepCopy(symbolKeys[key], weakMap)
    }

    return base

}



// 测试代码
let s1 = Symbol("aaa")
let s2 = Symbol("bbb")

const obj = {
  name: "why",
  age: 18,
  friend: {
    name: "james",
    address: {
      city: "广州"
    }
  },
  // 数组类型
  hobbies: ["abc", "cba", "nba"],
  // 函数类型
  foo: function(m, n) {
    console.log("foo function")
    console.log("100代码逻辑")
    return 123
  },
  // Symbol作为key和value
  [s1]: "abc",
  s2: s2,
  // Set/Map
  set: new Set(["aaa", "bbb", "ccc"]),
  map: new Map([["aaa", "abc"], ["bbb", "cba"]])
}

obj.info = obj

const newObj = deepCopy(obj)
console.log(newObj === obj)

obj.friend.name = "kobe"
obj.friend.address.city = "成都"
console.log(newObj)
console.log(newObj.s2 === obj.s2)

console.log(newObj.info.info.info)
