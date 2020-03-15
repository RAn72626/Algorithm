/**
 * 每次从数组的第一个元素开始遍历，比较这个元素与后面元素的大小
 * 如果大于后面的元素，则交换位置，拿着后面大的元素继续比较 （Math.max.apply(null, [1,4,3])）
 * 如果小于后面的元素，则继续向后比较
 * 然后循环继续从第一个元素开始往后比较，笔记到 length-index 个位置的元素停止，因为后面的已经排好序了
*/

/**
 * 时间复杂度是 O(n^2), 空间复杂度为 0 （交换的变量 temp 不计入空间复杂度）
 * 比较适合处理半排序状态的数组
 * 相比于快排的优势是，不会爆栈。快排用的是递归，递归的问题是当数据很大时，会爆栈
*/

function bubbleSort(array) {
    const len = array.length;
    for (let index = 0; index < len; index++) {
        let isSwrapped = false;
        for (let subIndex = 0; subIndex < len - index - 1; subIndex++) {
            if (array[subIndex] > array[subIndex+1]) {
                swap(array, subIndex, subIndex+1);
                isSwrapped = true;
            }
        }
        if (!isSwrapped) {
            break;
        }
        console.log(index)
    }
}

function swap(array, index, nextIndex) {
    const temp = array[index];
    array[index] = array[nextIndex];
    array[nextIndex] = temp;
}

const case1 = [1, 23, 3, 4, 6, 4, 9, 12, 0, 1234];
bubbleSort(case1);
console.log(case1);