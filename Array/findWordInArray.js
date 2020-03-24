// 在二维数组中，搜索单词，搜索过程中， 数组的元素只能被访问一次
// 递归遍历 + 回溯

function findWord(array, word) {
    const firstLetter = word.slice(0, 1);

    for (let i=0; i<array.length; i++) {
        for (let j=0; j<array[0].length; j++) {
            if (array[i][j] === firstLetter) {
                if (check(array, i, j, word, {})) {
                    return true;
                }
            }
        }
    }
    return false;
}

function check(array, row, col, word, visited) {
    if (word.length === 0) {
        return true;
    }
    
    const key = row + '-' + col;
    if (row > array.length-1 || row < 0 || col > array[0].length-1 || col < 0 || 
        visited[key] || array[row][col] !== word.slice(0, 1)) {
            return false;
    }

    visited[key] = true;
    const newWorld = word.slice(1);
    const success = check(array, row-1, col, newWorld, visited) ||
                    check(array, row+1, col, newWorld, visited) ||
                    check(array, row, col-1, newWorld, visited) ||
                    check(array, row, col+1, newWorld, visited);

    visited[key] = success;
    return success;
}

const array = [
    ['a', 'c', 'd', 'z'],
    ['x', 't', 'r', 'o'],
    ['f', 'i', 'w', 'o'],
]

console.log(findWord(array, 'zoowt'));