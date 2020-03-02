// 尝试请求若干次，若成功则返回结果，若全失败则返回失败

function fetch(url) {
    return new Promise((resolve, reject) => {
        const isSuccess = Math.random() > 0.8;
        if (isSuccess) {
            resolve('now is ' + new Date().valueOf());
        } else {
            reject('failed');
        }
    });
}

function repeatFetch(url, n) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let isFetching = false;
        let error = null;
        const time = setInterval(() => {
            if (index < n) {
                if (!isFetching) {
                    isFetching = true;
                    fetch(url).then((data) => {
                        clearInterval(time);
                        resolve(data); 
                        isFetching = false;
                        index++;
                    }).catch((value) => {
                        error = value;
                        index++;
                        isFetching = false;
                    });
                } else {
                    // 处理超时
                }
            }
            if (index >= n) {
                reject(error);
                clearInterval(time);
            }
        }, 100);
    });
}

repeatFetch('21212', 4).then((data) => { console.log(data) }).catch((error) => { console.log(error); })

