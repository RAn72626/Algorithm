// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例:
// 输入: [-2,1,-3,4,-1,2,1,-5,4],
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
// 复杂度为 O(n)

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
          // console.log(sum, res)
          res = Math.max(sum, res);
      }
      return res;
  }
};
 
let nums = [-2,1,-3,4,-1,2,1,-5,4];
const res = maxSubArray(nums);
console.log(res)