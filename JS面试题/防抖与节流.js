// 防抖
function debounce(handler, delay) {
    if (handler) { // 如果存在handler 
        let timer = null; // 定义一个空的定时器变量
        return () => { // 高阶函数，函数里返回一个函数，每次触发 handler 点击事件时，会执行 return 里面的 code
            if (timer) { // 如果有定时器，就清空定时器
                clearTimeout(timer);
                timer = null;
            }
            // 重新开启一个定时器，在定时器中执行 handler，并且把 arguments 传给 handler
            timer = setTimeout(() => {
                handler(arguments);
            }, delay);
        }
    } else {
        return () => {};
    }
    
}

// 节流 是在指定时间间隔内 无论用户触发事件多少次 只执行一次 并且按照最新触发的参数执行
function throttle(handler, delay) {
    if (handler) { // 如果 handler 存在
        let timer = null; // 定义一个空的定时器
        let params = undefined; // 定义 handler 的参数，因为在指定事件间隔内，如果用户触发了 handler 好几次，需要记录下最后一次的参数，并把此参数传给定时器中的 handler 去执行
        return () => { // 高阶函数，函数里返回一个函数，每次触发 handler 点击事件时，会执行 return 里面的 code
            if (timer) { // 如果有定时器，就把最新的 arguments 记录下来给 params
                params = arguments;
            } else { // 如果没有定时器，就开启一个新的定时器，
                timer = setTimeout(() => {
                    handler(params); // 把最新的 参数传给 handler 去执行，
                    clearTimeout(timer); // 清空定时器
                    timer = null;
                }, delay);

            }
        }
    } else {
        return () => {}
    }
}

{/* <input onChange="throttleHandleChange" />

methods: {
    throttleHandleChange: throttle(this.handler, 200),
    handler: function(e) {
        console.log(e);
    }
}, */}