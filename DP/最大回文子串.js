// 给定一个字符串 s，找到 s 中最长的回文子串。

// DP 问题的解决方案复杂，不可枚举
// 所以把大问题化为小问题解决，找到小问题可枚举的方案
// 或者是把问题分步骤解决，目的也是简化问题

// dp[i][j] = s[i] === s[j] && (j-i<2 || dp[i+1][j-1])
function check(s) {
    const len = s.length;

    let res = '';
    let dp = Array.from(new Array(len), () => new Array(len).fill(0));
    
    // 从末尾开始遍历
    // for (let i=len-1; i>=0; i--) {
    //     for (let j=i; j<len; j++) {
    //         dp[i][j] = s[i] === s[j] && (j-i<2 || dp[i+1][j-1]);
    //         if (dp[i][j] && j-i+1 > res.length) {
    //             res = s.substring(i, j+1);
    //         }
    //     }
    // }

    // 从头开始遍历
    for (let i=0; i<len; i++) {
        for (let j=i; j>=0; j--) {
            dp[i][j] = s[i] === s[j] && (i-j<2 || dp[i-1][j+1]);
            if (dp[i][j] && i-j+1 > res.length) {
                res = s.substring(j, i+1);
            }
        }
    }
    return res;
}

console.log(check('abbano'))