// （)() 立即执行函数表达式 有自己独立的作用域，外界不可访问
// 'use strict'
// ES5 有两种声明变量的方式，var 和 function
// funciton 声明之后不可以再修改。在 use stric 下会报错，在非 strict 模式下，不报错，但不会修改
var b = 10;
// print 20
// （）是立即执行（）内的函数表达式
(function b() {
    var b =  20; // 在当前的作用域中，定义变量b
    console.log(b);  // 首先从当前作用域找b, 如果没有再从内往外作用域寻找
})();

// print 20
(function b(b) { // 把外层的b作为参数传递给函数b
    b = 20;
    // console.log(b);
})(b);

// print 10
(function b(b) {
    // console.log(b);  // 把外层的b作为参数传递给函数b
})(b);

// ****************************************
// 类型的隐式转换，引用类型在比较运算符时，会调用本类型的toString()和valueOf()
// let a = {
//     i: 1,
//     toString() {
//         return a.i++
//     }
// }
let a = {
    i: 1,
    valueOf() {
        return a.i++
    }
}
if (a==1 && a==2 && a==3) {
    // console.log(1);
}

// () 是块级作用域，（）里面应为表达式，当寻找变量时，会首先在当前作用域中查找，如果没有找到，再查找外层作用域
var ab = 10;
function temp() {
    // console.log(ab)
    ab = 5
    
    // var ab = 20;
    // console.log(ab)
}

temp();

var obj = {
    '1': 3,
    '2': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
// console.log(obj)

// 
// example 1
var a1={}, b1='123', c1=123;
a1[b1]='b1'; // a1['123'] = 
a1[c1]='c1'; // a1['123'] = 
a1[c2] = 'c2'
// console.log(a1[b1], a1);

// example 2
var a2={}, b2=Symbol('123'), c2=Symbol('123');
a2[b2]='b2';
a2[c2]='c2';
// console.log(a2[b2], a2);

// example 3
var a3={}, b3={key:'123'}, c3={key:'226'};
a3[b3]='b3';
a3[c3]='c3';
// console.log(a3[b3], a3);