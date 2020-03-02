function nFetch(urls, callback) {
    const len = urls.length;
    let result = [], index = 0;

    function fetch(url) {
        const promise = new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(url);
            }, 0);
        });
        promise.then((res) => {
            handler(res);
        }).catch((err) => {
            handler(err);
        })
    }

    function handler(res) {
        result.push(res);
        if (index === len-1) {
            callback(result);
        } else if (index < len-1) {
            index++;
            setTimeout(() => {
                fetch(urls[index]);
            }, 2000);
        }
    }

    if (len > 0) {
        fetch(urls[index]);
    }
}

nFetch([1, 2, 3, 4], (res)=>{console.log(res)})