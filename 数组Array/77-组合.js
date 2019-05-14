// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

// 示例:

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// 采用回溯法解答 https://blog.csdn.net/cshanzhizi/article/details/8887045

// 回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。

// 回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。
let combine = function(n, k) {
    let res = [];
    let ans = [];

    dfs = function(idx) {
        if (res.length === k) {
            ans.push(res.map(item => item));
        } else if (res.length < k) {
            for (let i=idx; i<=n; i++) {
                res.push(i);
                dfs(i+1);
                res.pop();
            }
        }
    }

    dfs(1);
    return ans;
}

var combine = function(n, k) {
    if (k > n || k == 0) {
        return [];
    } else if (k === 1) {
        const res = [];
        for (let i = 0; i < n; i++) {
            res.push([i + 1]);
        }
        return res;
    } else if (k === n) { 
        const res = [];
        for (let i = 0; i < n; i++) {
            res.push(i + 1);
        }
        return [res]
    } else {
        return combine(n-1, k).concat(combine(n-1, k-1).map(item => {item.push(n); return item; }));
    }
};

// concat() 方法用于连接两个或多个数组。

// 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

// 语法
// arrayObject.concat(arrayX,arrayX,......,arrayX)

function com(n,k) {
    if (k > n || k === 0) {
        return [];
    } else if (k === 1) {
        let res = [];
        for (let i=0; i<n; i++) {
            res.push([i+1]);
        }

        return res;
    } else if (n === k) {
        let res = [];
        for (let i=0; i<n; i++) {
            res.push(i+1);
        }

        return [res];
    } else {
        return combine(n-1, k).concat(combine(n-1, k-1).map(item => {item.push(n); return item; }));
    }
}