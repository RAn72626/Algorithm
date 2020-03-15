let array = [[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10];

function handler(array) {
    let newArray = array.join(',').split(',');
    let set = unique(newArray);
    quickSort(set, 0, set.length-1);
    return set;
}

const res = handler(array);
console.log(res)

function unique(array) {
    let obj = {};
    for (let value of array) {
        if (obj.hasOwnProperty(value)) {
            obj[value]++;
        } else {
            obj[value] = 1;
        }
    }
    return Object.keys(obj).map(item => parseInt(item));
}

function quickSort(array, left, right) {
    if (left >= right) {
        return;
    }

    let currVal = array[left];
    let leftIndex = left, rightIndex = right;

    while (leftIndex < rightIndex) {
        while (leftIndex < rightIndex) {
            if (array[rightIndex] < currVal) {
                array[leftIndex] = array[rightIndex];
                break;
            }
            rightIndex--;
        }
        while (leftIndex < rightIndex) {
            if (array[leftIndex] > currVal) {
                array[rightIndex] = array[leftIndex];
                break;
            }
            leftIndex++;
        }
    }
    array[leftIndex] = currVal;
    quickSort(array, left, leftIndex-1);
    quickSort(array, rightIndex+1, right);
}
