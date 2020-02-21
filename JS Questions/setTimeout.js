for (var i=0; i< 3; i++) {
    setTimeout(function() {
        // console.log(i);
    }, i*100);
    // console.log(i);
}

// 首先执行for loop 里面的console，打印出0，1，2。然后 i = 3, 不满足循环条件，停止执行for 循环。接下来按照 Event loop 执行下一个时间周期里的setTimeout 异步事件，打印出此时i 的值 为3.
// 如果想避免这种bug, 可以使用 let, 因为let 有块级作用域
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
    
}
// 除了 let 之外，可以使用值传递
// 定义函数并且执行，把i传递给函数，就保留了当前i的值

for (var i = 0; i < 5; i++) {
    const temp = function(i) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    }
    // 值传递。把当前的值传入temp(), 并且temp() 已经执行了
    temp(i);
}