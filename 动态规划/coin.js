// 假设有几种硬币，如1、3、5，并且数量无限。请找出能够组成某个数目的找零所使用最少的硬币数。 

const coins = [1, 3, 5];

/*
* 问题分解过程
* 分解： 第一步： 取一个硬币，coins = [1, 3, 5], first = a， a 属于 coins, 检查目标值 sum - a > 0， 找到 min(C， f(sum-a)+1)， C是上一轮求得的最小值
* 第 n 步分解： 取一个硬币，coins = [1, 3, 5], a < coins, a 是 [1, 3, 5] 中的一个值
*  检查目标值： sum(n) - coins - n > 0, 目标值减去已经取过的值减去本次取得值，coins 是已经取过的值，n 是本次取得值， min(C f(sum-a))
*/
// 时间复杂度一般为 O(nlogn)

// 目标结果叫做使用硬币数
// 参数 coins 是可选硬币的数组，sum 是希望组成的数目和
function minCoins(coins, sum) {
    // 最小硬币数
    let minResult = Number.MAX_VALUE;
    
    // 需要使用 forEach 而不能使用 for loop 的原因是 使用for loop 可能会把此数组当做对象来处理，从而取到的是对象的key
    // 防御式编程
    (coins || []).forEach(item => {
        // sum - item > 0
        // 尝试取此硬币的方案，然后递归，依次调用此方法取下一次的硬币
        // 然后比较取此硬币的结果和上一次的结果，取最小值
        if (sum - item > 0) {           
            minResult = Math.min(minCoins(coins, sum-item) + 1, minResult);
        } 
        // sum - item === 0
        // 此硬币恰好等于希望组成的硬币和，取此硬币，然后将 1 与 上次的最小结果比较，取最小值
        else if (sum - item === 0) {
            // 终止条件 和 剪枝条件
            minResult = Math.min(1, minResult);
        } else {
            // sum < a 终止条件
            // 不进行任何处理
        }
    })

    return minResult;
}

function minCoinsArr(coins, sum) {
    // 最小硬币数

    // 新加入的硬币数组
    let curr_coins = [];
    let coin_numnber = Number.MAX_VALUE;

    (coins || []).forEach(item => {
        if (sum - item > 0) {        
            // 分解   
            // next 保存取这个硬币之后，然后递归下去，得到的满足硬币组合和的所取硬币的方案
            const next = minCoinsArr(coins, sum-item);
            // 此方案 所取硬币的总数
            const nextCoinNumber = next.length + 1;
            // 比较此次所得的硬币的总数 和 之前 的最小硬币总数
            // 如果此次所得的硬币总数 比较小，则coin_number 等于此次计算的最小硬币总数的结果
            // curr_coins 等于 当前所取到的硬币组合
            if (coin_numnber > nextCoinNumber) {
                coin_numnber = nextCoinNumber;
                curr_coins = [item].concat(next);
            }
            
        } else if (sum - item === 0) {
            // 终止条件 和 剪枝条件
            if (coin_numnber > 1) {
                coin_numnber = 1;
                curr_coins = [item];
            }
            
        } else {
            // sum < a 终止条件
            // 不进行任何处理
        }
    })

    return curr_coins;
}

console.log(minCoins(coins, 15));
console.log(minCoinsArr(coins, 15));

// console.log(minCoins(coins, 3));
// console.log(minCoins(coins, 5));

