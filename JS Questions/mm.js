Promise.prototype.all = function(promises) {
    let index = promises.length;
    let result = [];

    return new Promise((resolve, reject) => {
        promises.map(item => {
            item.then((res) => {
                index--;
                result.push(res);
                if (index === 0) {
                    resolve(result);
                }
            })
        })
    })
}