// 爱奇艺一面
// 返回数组中第一次出现的只出现一次的元素

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

arr = ['a', 'a', 'b', 'c', 'e', 'f'];
const res = temp(arr);
console.log(res)