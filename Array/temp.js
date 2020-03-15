function maxSubarray(array) {
    if (array.length === 0) {
        return 0;
    } else {
        let res = array[0], sum = 0;
        for (let item of array) {
            if (sum > 0) {
                sum += item;
            } else {
                sum = item;
            }
            res = Math.max(sum, res);
        }
        return res;
    }
}

let array = [-2,1,-3,4,-1,2,1,-5,4];
const res = maxSubarray(array);
console.log(res)