let a = true, b = undefined, c = 'string', d = 0, e = Symbol();
let f = null, g = [], h = {};
let j = function () {};

// typeof 只能准确判断 基本类型和 Function
// console.log(typeof a, typeof b, typeof c, typeof d, typeof e);
// console.log(typeof f, typeof g, typeof h);
// console.log(typeof j);

// Object.prototype.toString.call 可以判断所有类型， 不能校验自定义类型
// console.log(Object.prototype.toString.call(a))
// console.log(Object.prototype.toString.call(b))
// console.log(Object.prototype.toString.call(c))
// console.log(Object.prototype.toString.call(d))
// console.log(Object.prototype.toString.call(e))
// console.log(Object.prototype.toString.call(f))
// console.log(Object.prototype.toString.call(g))
// console.log(Object.prototype.toString.call(h))
// console.log(Object.prototype.toString.call(j))

// instanceof 不能校验原始数据类型
// console.log(g instanceof Array, h instanceof Object);
// console.log( j instanceof Function);
