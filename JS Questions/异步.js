for (var i=0; i< 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, i*100);
    console.log(i);
}

// 首先执行for loop 里面的console，打印出0，1，2。然后 i = 3, 不满足循环条件，停止执行for 循环。接下来按照 Event loop 执行下一个时间周期里的setTimeout 异步事件，打印出此时i 的值 为3.
// 如果想避免这种bug, 可以使用 let, 因为let 有块级作用域