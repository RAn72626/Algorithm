const matrix = [
    [0, 1, 2, 5],
    [2, 3, 4, 7],
    [4, 4, 4, 8],
    [5, 7, 7, 9]
];

// row = matrix.length
// col = matrix[0].length - 1
// 选中一个点 matrix[0][col-1]

// matrix[0][col-1] > target => col = col - 1
// matrix[0][col - 1] < target => row = row + 1

function search(matrix, target) {
    const row = matrix.length;
    const col = matrix[0].length;

    let startRow = 0;
    let colStart = col - 1;

    while (startRow < row && colStart >= 0) {
        if (matrix[startRow][colStart] === target) {
            return true;
        } else if (matrix[startRow][colStart] < target) {
            startRow ++;
        } else {
            colStart --;
        }
    }

    return false;

}

console.log(search(matrix, 6));

/**
 * 给定一个有N×M的整型矩阵matrix和一个整数K，matrix每行每列都排好序了。
    实现一个函数，判断K是否在matrix中。

    核心在于创造判定条件：从右上角找
*/

// const matrix = [
//     [0, 1, 2, 5],
//     [2, 3, 4, 7],
//     [4, 4, 4, 8],
//     [5, 7, 7, 9]
// ];
// function findValue(matrix, value) {
//     let x_index = 0;
//     let y_index = matrix[0].length - 1;
//     let isSearched = false;
//     while(x_index < matrix.length && y_index < matrix[0].length) {
//         if (matrix[x_index][y_index] > value) {
//             y_index --;
//         } else if (matrix[x_index][y_index] === value){
//             isSearched = true;
//             break;
//         } else {
//             x_index ++;
//         }
//     }
//     if (isSearched) {
//         return { x: x_index, y: y_index };
//     } else {
//         return false;
//     }
// }
// const value = 4;
// const result = findValue(matrix, value);
// if (result) {
//     console.log(`${value}在矩阵的第${result.x + 1}行的第${result.y + 1}列`);
// } else {
//     console.log(`矩阵中并不存在${value}`);
// }