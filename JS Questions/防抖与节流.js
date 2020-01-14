// 防抖 触发高频事件后,n秒之后函数才会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
// 每次触发事件时都取消之前的延时调用方法
function debounce(handler, delay) {
    if (handler) { // 如果存在handler 
        let timer = null; // 定义一个空的定时器变量
        return () => { // 高阶函数，函数里返回一个函数，每次触发 handler 点击事件时，会执行 return 里面的 code
            if (timer) { // 如果有定时器，就清空定时器
                clearTimeout(timer);
                timer = null;
            }

            let context = this; // 指定 handler 里面的this, 否则this会指向外面的window
            var args = arguments; // 传递 handler 的参数，比如 event 事件
            // 重新开启一个定时器，在定时器中执行 handler，并且把 arguments 传给 handler
            timer = setTimeout(() => {
                handler.apply(context, args);
            }, delay);
        }
    } else {
        return () => {};
    }
    
}

// 节流 是在指定时间间隔内 无论用户触发事件多少次 只执行一次 并且按照最新触发的参数执行
// 每次触发事件时都判断当前是否有等待执行的延时函数
function throttle(handler, delay) {
    if (handler) { // 如果 handler 存在
        let timer = null; // 定义一个空的定时器
        let params = undefined; // 定义 handler 的参数，因为在指定事件间隔内，如果用户触发了 handler 好几次，需要记录下最后一次的参数，并把此参数传给定时器中的 handler 去执行
        return () => { // 高阶函数，函数里返回一个函数，每次触发 handler 点击事件时，会执行 return 里面的 code
            let context = this; // 指定 handler 里面的this, 否则this会指向外面的window
            
            if (timer) { // 如果有定时器，就把最新的 arguments 记录下来给 params
                params = arguments;
            } else { // 如果没有定时器，就开启一个新的定时器，
                timer = setTimeout(() => {
                    handler.apply(context, params); // 把最新的 参数传给 handler 去执行，
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
