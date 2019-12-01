// "快速排序"的思想很简单，整个排序过程只需要三步：

// 　　（1）在数据集之中，选择一个元素作为"基准"（pivot）。

// 　　（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

// 　　（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

// reference： http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html

// 最优和平均时间复杂度为 O(nlogn)， 最差的时间复杂度为O(n^2)
// 最优的情况下空间复杂度为：O(logn)  ；每一次都平分数组的情况
// 最差的情况下空间复杂度为：O( n )   ；退化为冒泡排序的情况

var quickSort = function(arr) {
　　if (arr.length <= 1) { //如果数组长度小于等于1无需判断直接返回即可 
        return arr;
    }
　　var pivotIndex = Math.floor(arr.length / 2); //取基准点 
　　var pivot = arr.splice(pivotIndex, 1)[0];  //取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数
　　var left = [];  //存放比基准点小的数组
　　var right = []; //存放比基准点大的数组 
　　for (var i = 0; i < arr.length; i++){ //遍历数组，进行判断分配 
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]); //比基准点小的放在左边数组 
　　　　} else {
　　　　　　right.push(arr[i]); //比基准点大的放在右边数组 
　　　　}
　　}

    //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1； 
　　return quickSort(left).concat([pivot], quickSort(right));
};

function main() {
    let arr = [5,6,4,3,8,9,56];
    let res = quickSort(arr);

    console.log(res);
    
}

main();


/**
 * 写个快排
 */

const array = [2,5,6,9,73,7,72,48,83,3];

function quickSort(array, left, right) {
    if (right - left < 1) return;
    if (right - left === 1) {
        if (array[left] > array[right]) {
            const temp = array[left];
            array[left] = array[right];
            array[right] = temp;
        }
        return;
    }
    const midValue = array[Math.ceil((left + right) / 2)];
    let leftIndex = left;
    let rightIndex = right;
    while(leftIndex < rightIndex) {
        let bigger = null;
        while(leftIndex < rightIndex) {
            if (array[leftIndex] < midValue) {
                leftIndex++;
            } else {
                bigger = leftIndex;
                leftIndex++;
                break;
            } 
        }
        let less = null;
        while(leftIndex < rightIndex) {
            if (array[rightIndex] > midValue) {
                rightIndex--;
            } else {
                less = rightIndex;
                rightIndex --;
                break;
            } 
        }
        if (bigger !== null && less !== null) {
            const temp = array[bigger];
            array[bigger] = array[less];
            array[less] = temp;
        } else if (bigger !== null || less !== null) {
            if (less) {
                quickSort(array, left, less);
                quickSort(array, less + 1, right);
            } else {
                quickSort(array, left, bigger - 1);
                quickSort(array, bigger, right);
            }
        } else {
            quickSort(array, left, array[leftIndex] >= midValue ? leftIndex - 1 : leftIndex);
            quickSort(array, array[leftIndex] >= midValue ? leftIndex : leftIndex + 1, right);
        }
    }
}
quickSort(array, 0, array.length - 1);
console.log(array);