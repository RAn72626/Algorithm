// 写一个异步函数，sleep（timestamp）之后再执行 .then

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // sleep
        }, time)
    })
}

let test = sleep(1000);
test.then();