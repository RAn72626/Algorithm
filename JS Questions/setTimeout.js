// setTimeout 内的方法推到宏任务队列中，等待主线程的任务执行结束再执行
// 执行宏任务队列中的方法时，此处取内存中的i的值，是3，所以会全部都打印3
for (var i=0; i< 3; i++) {
    setTimeout(function() {
        // console.log(i);
    }, i*100);
    // console.log(i);
}

// 首先执行for loop 里面的console，打印出0，1，2。然后 i = 3, 不满足循环条件，停止执行for 循环。接下来按照 Event loop 执行下一个时间周期里的setTimeout 异步事件，打印出此时i 的值 为3.
// 第一，如果想避免这种bug, 可以使用 let, 因为let 有块级作用域，会保存当前作用域中的i的值
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        // console.log(i);
    }, 1000);
    
}
// 定义函数并且执行，把i传递给函数，就保留了当前i的值
// 第二，调用函数，创建函数作用域
for (var i = 0; i < 5; i++) {
    const temp = function(i) {
        setTimeout(() => {
            // console.log(i);
        }, 1000);
    }
    // 值传递。把当前的值传入temp(), 并且temp() 已经执行了
    temp(i);
}

// 第三，立即执行函数，创建函数作用域
for (var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(() => {
            // console.log(i)
        }, 1000);
    })(i);
}

// 第四，附加参数，一旦定时器到期，它们会作为参数传递给function 
// setTimeout(func, delay, param)
for (var i = 0; i < 5; i++) {
    setTimeout((i) => {
        // console.log(i)
    }, 1000, i);
}


// 随机执行 setTimeout， setImmediate
// 如果放在回调函数或者异步函数里，先执行setImmediate，后执行setTimeout
setTimeout(() => {
    console.log('setTimeout')
}, 0);

setImmediate(() => {
    console.log('set immediate')
})