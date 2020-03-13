// Reducer 纯函数，用于更新 state
// 输入参数是 prevState 和 action （action 包含 TYPE 和 payload 结果）
// Reducer 里定义很多 case，根据 TYPE 找到相应的 case 更新 state
// 更新 state时 可以使用 第三方库 immutable 和 immer，提高深拷贝的性能
// 传统的深拷贝需要使用深度优先，递归遍历所有的属性，很耗时

export default function reducer(prevState, action) {
    let newState = prevState;
    // update newState

    return newState;
}