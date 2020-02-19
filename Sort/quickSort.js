/**
 * 写个快排，再来一次 长工推荐答案
 * 用于解决 Top K 问题，另外一种方案是 最小堆
 * 最优和平均时间复杂度为 O(nlogn)， 
 * 最差的时间复杂度为O(n^2/2), 每次选的基准值都在最边上，要全部挪一遍
 * 没有空间复杂度，存储基准值的变量是常量复杂度，默认为没有
 */

const array = [2,5,6,9,73,7,72,48,83,3, 5, 7, 73];

function quickSort(array, left, right) {
    if (left >= right) {
        return;
    }

    const currVal = array[left]; // 获取基准值
    let leftIndex = left, rightIndex = right;

    while (leftIndex < rightIndex) {  // 移动左右指针
        while (leftIndex < rightIndex) {
            if (array[rightIndex] < currVal) {  // 找到右侧小于基准值的值，和左侧交换
                array[leftIndex] = array[rightIndex];
                break;
            }
            rightIndex--;
        }
        while (leftIndex < rightIndex) {
            if (array[leftIndex] > currVal) {  // 找到左侧大于基准值的值，和右侧交换
                array[rightIndex] = array[leftIndex];
                break;
            }
            leftIndex++;
        }
    }
    array[leftIndex] = currVal;
    quickSort(array, left, leftIndex-1);  // 左右分治法
    quickSort(array, rightIndex+1, right);
}

quickSort(array, 0, array.length - 1);

console.log(array)