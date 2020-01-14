// 如何实现一个 实例化中的 new

// 定义一个 function
function Parent(name, age) {
    this.name = name;
    this.age = age;
}

function _new(fn, ...args) {
    // ...args 回你把参数析构承诺一个数组
    console.log(fn.prototype, args);

    const obj = Object.create(fn.prototype); // Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
    const res = fn.apply(obj, args); // 把构造函数fn 的this 指向新创建的对象obj, 并且把参数 args 传过去
    return res instanceof Object ? res : obj;
}

const newObj = _new(Parent, 'lily', '28');

console.log(newObj, newObj.name, newObj.age, typeof(newObj), newObj instanceof(Parent));