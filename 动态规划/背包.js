// 1、写个分解过程，得到递推公式（进阶版：伪码（包含逻辑和变量））
// 2、翻译代码
//     2.1 确定输入和输出
//     2.2 确定中间变量-参数和过渡变量
//     2.3 写方法-关注伪码逻辑部分的实现
//     2.4 依据逻辑，补充终止条件和剪枝条件
//     2.5 验证代码运行，排除错误（终止条件和剪枝条件导致循环）
//     2.6 优化代码-优化空间；节省运算（*尽早剪枝，*计算复用，去掉多余运算-不可能出现的运算）
// 3、*题目扩展-结果数据表现改动，*增加条件-剪枝条件和终止条件改变，内容扩充-题目增加难度，需要其他算法配合
//     3.1 题目扩展-结果数据表现改动，先关注主逻辑的转换，以此替换其他的
//     3.2 增加条件-剪枝条件和终止条件改变，直接修改终止条件和剪枝条件

// 有 n 个重量个价值分别为 w_i, v_i 的物品。
// 从这些物品中选出总重量不超过 W 的物品，使其总价值最大。

// 示例
// n w             // n 是物品个数 ，w 是标识总重
// 1 2 3 4 5       // W_i 每个物品的总量
// 5 4 3 2 1       // V_i 每个物品的价值

/*
* 分解过程：
* 选择第i个物品 a, W_a, V_a 的选择结果有两种： 选 or 不选
* 选的结果： V = V_a + V_余（i+1, W - W_a)   , i+1 是剩余物品的下标
* 不选的结果： V = 0 + V_余（i+1, W)
* V = Max (v1, v0)

* 选择第二个物品b, W_b, V_b
*/

// 存储结果：i 之后所有物品在W_BAG 的限制下的最大价值

// const N_BAG = 6;
// const W_BAG = 20;
// const W = [1, 2, 3, 4, 5, 6];
// const V = [6, 5, 4, 3, 2, 1];

// const DP = [];
// for (let i=0; i<=N_BAG; i++) {
//     const item = [];
//     for (let j=0; j<=W_BAG; j++) {
//         item.push(-1);
//     }
//     DP.push(item);
// }

// let sum = 0;
// let cache = 0;

// // 取第 i 个物品， weight 是背包里剩余的重量空间
// function maxValue(i, weight) {
//     // 背包里面没有剩余的重量空间了，直接返回0
//     if (weight === 0) {
//         return 0;
//     }
//     // i 超出背包里要求的总数目了，直接返回0
//     if (i >= N_BAG) {
//         return 0;
//     }
//     // 已经计算过了，直接使用
//     if (DP[i][weight] !== -1) {
//         return DP[i][weight];
//     }

//     // 取 i 个 物品

//     const V_i = V[i];
//     const W_i = W[i];
//     if (V_i  && W_i) {
//         let selected = V_i;
//         let unselected = 0;
//         // 第 i 个物品的重量大于背包目前剩余的重量空间 ，不选
//         if (W_i > weight) {
//             selected = 0;
//         } else {
//             if (DP[i+1][weight - W_i] !== -1) {
//                 selected += DP[i+1][weight - W_i];
//             } else {
//                 selected += maxValue(i+1, weight - W_i);
//                 // DP[i+1][weight - W_i] = selected; 
//             }
//         }
       

//         if (DP[i+1][weight] !== -1) {
//             unselected += DP[i+1][weight];
//         } else {
//             unselected += maxValue(i+1, weight);
//         }

//         DP[i][weight] = Math.max(selected, unselected);
//         return DP[i][weight];
//     } else {
//         return 0;
//     }
    
// }


const N_BAG = 6;
const W_BAG = 20;
const W = [1, 2, 3, 4, 5, 6];
const V = [6, 5, 4, 3, 2, 1];

let sum = 0;
let cache = 0;

// 取第 i 个物品， weight 是背包里剩余的重量空间
function maxValue(i, weight) {
    // 背包里面没有剩余的重量空间了，直接返回0
    if (weight === 0) {
        return [];
    }
    // i 超出背包里要求的总数目了，直接返回0
    if (i >= N_BAG) {
        return [];
    }

    // 取 i 个 物品

    const V_i = V[i];
    const W_i = W[i];
    if (V_i  && W_i) {
        let selected = [i];
        let v_selected = V_i;
        let unselected = [];
        let v_unselected = 0;
        // 第 i 个物品的重量大于背包目前剩余的重量空间 ，不选
        if (W_i > weight) {
            selected = [];
            v_selected = 0;
        } else {
            selected = selected.concat(maxValue(i+1, weight - W_i));
            v_selected += selected.reduce((prev, curr) => prev + curr, 0);

        }
 
        unselected = unselected.concat(maxValue(i+1, weight));
        v_unselected += unselected.reduce((prev, curr) => prev + curr, 0);

        return v_selected >= v_unselected ? selected : unselected;
        
    } else {
        return [];
    }
    
}


console.log(maxValue(0, W_BAG).map(item => `${W[item]}_${V[item]}`));
// console.log(sum, cache);
// console.log(DP);
