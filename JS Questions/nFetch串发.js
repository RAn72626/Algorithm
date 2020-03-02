// 深信服一面
// n 个 fetch 请求，在发完一个fetch 请求之后，等2秒再发送下一次fetch 请求，直至所有请发发完

function sendRequest (urls, index, result) {
    const len = urls.length;
    if (index < len) {
        const url = urls[index];
        fetch(url).then((res) => {
            console.log(res, 'res')
            result.push(res);
            setTimeout(() => {
                sendRequest(urls, index+1, result);
            }, 2000);
        })
    } 
}

function fetch(url) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(url);
        }, 0);
    })
}

console.log(sendRequest([1, 2, 3, 4], 0, []));