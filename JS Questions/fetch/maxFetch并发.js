/*
* 批量请求数据，所有的url地址在urls 参数中， 同时可以通过max 参数控制请求的并发度，当所有请求结束之后，需要执行callback 函数。
* 发请求的函数直接使用 fetch 即可。
*/

/*
解决方案：
第一段是发起max 个请求数，第二段是请求数达到max之后，每结束一个请求，再递归发起一个新的请求
handler 处理逻辑：
1：result 结果收集，传递给callback
2：终止条件：count === len，调用callback
3：递归条件：执行下一个fetch，index++
*/

// 定义fetch 方法， 返回promise，使用setTimeout 模拟异步请求
function fetch(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve(url)}, Math.random() * 10000);
    })
}

function sendRequest(urls, max, callback) {
    let count = 0, index = 0, len = urls.length, result = new Array(len);

    const fetchByIndex = (inputIndex) => {
        fetch(urls[inputIndex]).then((data) => {
            handler(data, inputIndex);
        }).catch((error) => {
            handler(error, inputIndex);
        })
    }
    
    // 参数不能为index， 因为index 会随着请求执行结束而变化，可能会造成结果混乱
    const handler = (data, inputIndex) => {
        count++;
        result[inputIndex] = data;
        if (count === len) {
            callback(result);
        }
        if (index < len-1) {
            fetchByIndex(index+1);
        }
        index++;
    }

    // 开max 个并发请求，index 随着subIndex 增加
    for (let subIndex = 0; subIndex < Math.min(max, len); subIndex++) {
        index= subIndex;
        fetchByIndex(subIndex);
    }
}

sendRequest(['1','2','3','4'], 2, (data)=> {console.log(data)});