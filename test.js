let obj = {};


Object.defineProperty(obj, 'readOnlyProp', {

  value: 'This property is read only',

  writable: false,

  enumerable: true,

  configurable: false

});

console.log(obj)

Object.defineProperty(obj, 'readOnlyProp', {

  value: 'Thi222',

});

