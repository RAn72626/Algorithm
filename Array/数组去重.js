// 输入一个数组，去掉数组中重复的元素，返回一个数组，其包含唯一的元素

// 方法一： 主要考察个人对object的使用，利用key来进行筛选。

function unique(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var res = [];
    var obj = {};

    for (var i=0; i<arr.length; i++) {
        if (!obj[arr[i]]) {
            res.push(arr[i]);
            obj[arr[i]] = 1;
        }
    }

    return res;
}

// 方法二： 利用 js 中 Array 和 Object 的方法
// 返回出现重复数为1的元素，也可以返回出现任意次数的元素
let resObj = array.reduce((prevObjRes, curr) => {
    if (prevObjRes[curr]) {
        prevObjRes[curr] += 1;
    } else {
        prevObjRes[curr] = 1;
    }

    return prevObjRes;
}, {});

Object.keys(resObj).filter(item => resObj[item] === 1);

////////////////////////////////////////////////////////
let res = Object.entries(array.reduce((prevObjRes, curr) => {
    if (prevObjRes[curr]) {
        prevObjRes[curr] += 1;
    } else {
        prevObjRes[curr] = 1;
    }

    return prevObjRes;
}, {})).filter(item => item[1] === 1).map(item => item[0]);

