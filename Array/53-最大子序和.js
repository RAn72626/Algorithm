// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例:

// 输入: [-2,1,-3,4,-1,2,1,-5,4],
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
// 进阶:

// 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

// 解法一：动态规划
// 求和，然后判断和是否小于0，因为只要前面的和小于0，那么后面的数加上前面的和就一定比自身小，所以又重新求和，并和之前的最大子序和比较，取最大值。

// js中的最小值不是Number.MIN_VALUE。因为Number.MIN_VALUE是最小的正小数(5e-324)。

// 最小的数应该是最大值的负数，即  - Number.MAX_VALUE。

var maxSubArray = function(nums) {
    var max = -Number.MAX_VALUE;
    var sum = 0;
    for (let num of nums) {
      if (sum < 0) {
        sum = 0;
      }
      sum += num;
      max = Math.max(max, sum);
    }
    return max;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  const len = nums.length;
  if (len === 0) {
      return 0;
  } else if (len > 0) {
      let res = nums[0], sum = 0;
      for (const item of nums) {
          if (sum > 0) {
              sum += item;
          } else {
              sum = item;
          }
          console.log(sum, res)
          res = Math.max(sum, res);
      }
      return res;
  }
};
 
