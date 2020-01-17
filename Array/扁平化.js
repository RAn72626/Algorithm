// 编写一个程序将数组扁平化，并去除其中重复部分的数据，最终得到一个升序且并不重复的数组

let arr = [[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10];
console.log(arr.join(','));
let set = new Set(arr.join(',').split(','));
console.log(Array.from(set).sort());
function uniqueArr(arr, set) {
    if (Array.isArray(arr)) {
        arr.map(item => {
            uniqueArr(item, set);
        })
    } else {
        set.add(arr);
    }

    return set;
}

let res = Array.from(uniqueArr(arr, set)).sort();

function quickSort(arr) {
    const len = arr.length;
    if (len < 2) {
        return arr;
    }

    let left = [], right = [];
    let pivot = Math.floor(len/2);
    let pivotVal = arr.splice(pivot,1)[0];
    for (let item of arr) {
        if (item < pivotVal) {
            left.push(item);
        } else {
            right.push(item);
        }
    }

    return quickSort(left).concat([pivotVal], quickSort(right));
}

// console.log(set, res, quickSort(res), )




