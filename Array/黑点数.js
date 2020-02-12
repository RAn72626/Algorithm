/*
* 计算一张给定的白底黑点的图片中，黑点的个数
* 使用二维数组模拟图片的像素值
**/

function getNum(arr) {
    let index = 2;
    const rowLen = arr.length;
    if (rowLen > 0) {
        const colLen = arr[0].length;
        for (let i=0; i<rowLen; i++) {
            for (let j=0; j<colLen; j++) {
                if (arr[i][j] === 1) {
                    arr[i][j] = index;
                    checkAround(i, j, arr, rowLen, colLen, index);
                    index++;
                } else if (arr[i][j] > 1) {
                    const val = arr[i][j];
                    checkAround(i, j, arr, rowLen, colLen, val);
                }
            }
        }
        console.log(arr, 'arr');
        return index-2;
    } else {
        return 0;
    }
}

function checkAround(i, j, arr, rowLen, colLen, val) {
    if (i-1>-1 && arr[i-1][j] === 1) {
        arr[i-1][j] = val;
    } 
    if (i+1 < rowLen && arr[i+1][j] === 1) {
        arr[i+1][j] = val;
    }
    if (j-1>-1 && arr[i][j-1] === 1) {
        arr[i][j-1] = val;
    }
    if (j+1 < colLen && arr[i][j+1] === 1) {
        arr[i][j+1] = val;
    }
    return arr;
}

function main () {
    const arr = [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1],
        [0, 1, 0, 0, 1, 0],
    ];
    const res = getNum(arr);
    console.log(res, 'res');
}

main();