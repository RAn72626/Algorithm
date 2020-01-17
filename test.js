var b = 10;
// print 20
// （）是立即执行（）内的函数表达式
(function b() {
    var b = 20; // 在当前的块级作用域中，定义变量b
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

