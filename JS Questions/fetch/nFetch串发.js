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

let result = [];
sendRequest([1, 2, 3, 4], 0, result);
setTimeout(() => {
    console.log(result);
}, 10000)

// 方案二 ******************************************
// function nFetch(urls, callback) {
//     const len = urls.length;
//     let result = [], index = 0;

//     function fetch(url) {
//         const promise = new Promise(function(resolve, reject) {
//             setTimeout(() => {
//                 resolve(url);
//             }, 0);
//         });
//         promise.then((res) => {
//             handler(res);
//         }).catch((err) => {
//             handler(err);
//         })
//     }

//     function handler(res) {
//         result.push(res);
//         if (index === len-1) {
//             callback(result);
//         } else if (index < len-1) {
//             index++;
//             setTimeout(() => {
//                 fetch(urls[index]);
//             }, 2000);
//         }
//     }

//     if (len > 0) {
//         fetch(urls[index]);
//     }
// }

// nFetch([1, 2, 3, 4], (res)=>{console.log(res)})