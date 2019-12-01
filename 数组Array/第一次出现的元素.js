// [a, b, b, c, e, f]
// 爱奇艺一面

function temp(arr) {
    let res = {};

    arr.forEach(element => {
        if (res[element]) {
            res[element]++;
        }else {
            res[element] = 1;
        }
    });

    for (let i=0; i<arr.length; i++) {
        if (res[arr[i]] === 1) {
            return arr[i];
        }
    }
}