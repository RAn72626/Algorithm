// （）的块级作用域
var b = 10;
// print 20
// （）是立即执行（）内的函数表达式
(function b() {
    var b =  20; // 在当前的块级作用域中，定义变量b
    console.log(b);  // 首先从当前作用域找b, 如果没有再从内往外作用域寻找
})();

// print 20
(function b(b) { // 把外层的b作为参数传递给函数b
    b = 20;
    console.log(b);
})(b);

// print 10
(function b(b) {
    console.log(b);  // 把外层的b作为参数传递给函数b
})(b);

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
    console.log(ab)
    ab = 5
    
    // var ab = 20;
    console.log(ab)
}

temp();
