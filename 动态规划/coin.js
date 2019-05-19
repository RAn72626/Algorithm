const coins = [1, 3, 5];

/*
* 问题分解过程
* 分解： 第一步： 取一个硬币，coins = [1, 3, 5], first = a， a 属于 coins, 检查目标值 sum - a > 0， 找到 min(C f(sum-a))
* 第 n 步分解： 取一个硬币，coins = [1, 3, 5], a < coins, a 是 [1, 3, 5] 中的一个值
*  检查目标值： sum(n) - coins - n > 0, 目标值减去已经取过的值减去本次取得值， min(C f(sum-a))
*/

// 目标结果叫做使用硬币数

// function minCoins(coins, sum) {
//     // 最小硬币数
//     let minResult = Number.MAX_VALUE;
    
//     (coins || []).forEach(item => {
//         if (sum - item > 0) {           
//             minResult = Math.min(minCoins(coins, sum-item) + 1, minResult);
//         } else if (sum - item === 0) {
//             // 终止条件 和 剪枝条件
//             minResult = Math.min(1, minResult);
//         } else {
//             // sum < a 终止条件
//             // 不进行任何处理
//         }
//     })

//     return minResult;
// }

function minCoins(coins, sum) {
    // 最小硬币数

    // 新加入的硬币数组
    let curr_coins = [];
    let coin_numnber = Number.MAX_VALUE;

    (coins || []).forEach(item => {
        if (sum - item > 0) {        
            // 分解   
            const next = minCoins(coins, sum-item);
            const nextCoinNumber = next.length + 1;
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
// console.log(minCoins(coins, 3));
// console.log(minCoins(coins, 5));

