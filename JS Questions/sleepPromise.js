// 写一个异步函数，sleep（timestamp）之后再执行 .then

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // sleep
            // resolve 时，会触发 then 方法绑定的回调函数，并且把异步执行的结果传递过去
            resolve(1);
            reject(2);
        }, time);
        
    })
}

let test = sleep(5000);
// 使用 then 指定 resolve 和 reject 的回调函数，
// then 和 catch 返回的都是 promise实例，后续还可以继续then catch
test.then((res) => {
    // 参数 res 是由 resolve() 传递出来的
        console.log(res)
    },
    // (err) => {
    //     console.log(err)
    // }
    // catch 指定 reject 的回调函数, 参数 err 是由reject 传递出来的
    // catch 可以捕获前面所有的错误，如果后续有then, 没错误的时候，会跳过 catch 直接执行 then
).catch((err) => {
    console.log(err);
}).then(() => {
    console.log('then after catch')
});
