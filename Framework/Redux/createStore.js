// createStore 参数为 Reducer，applyMiddleware
// createStore 中定义了 getState, 可以通过 store.getState() 获取Store 中的state
// createStore 定义初始的 dispatch subscribe，中间件对 store.dispatch 进行二次封装，
// 封装后的 Store.dispatch 是在 connect（mapDispatchToProps）时调用，dispatch action 给 Reducer
// 初始化时，connect 会调用 store.subscribe 监听 mapStateToProps 中过滤的state 中的变量，
// 当其发生变化时，会调用React 组件的 render（）更新 view

export default function createStore(reducer, initState = {}) {
    let state = initState;
    const listeners = {
      [eventType]: []
    };
    const store = {
      getState: function () { return state; },

      // dispatch 执行监听中设定好的 callback
      dispatch(eventType, action) {
        state = reducer(state, action);
        // 寻找处理函数, 假设拷贝取所有的 listeners
        const cloneListeners = listeners[eventType].slice(0);
        // 执行所对应的处理函数
        cloneListeners.forEach(item => {
          item.call(store, [parmas]);
        //   item.apply(store, param2, params1)
        });
      },

      // 把callback 放到listeners 中，等待 dispatch 时执行 
      // 返回一个函数，方便结束监听
      subscribe(eventType, listener) {
        listeners[eventType].push(listener);
        return () => {
            let eventTypeArr = listeners[eventType];
            if (eventTypeArr.indexOf(listener) !== -1) {
                eventTypeArr.splice(eventTypeArr.indexOf(listener), 1);
            }
        };
      }
    };
    return store;
}
  
// 测试用例
const handleChange = () => {
    console.log('xxx');
}

// A页面
// 监听valueUpdate 事件，并且返回 一个函数，用于结束监听
const removeListent = store.subscribe('valueUpdate', handleChange);
const removeListentB = store.subscribe('valueUpdate', handleChangeB);

// 核心 职责
subscribe === $on // 注册事件到注册表，返回能够删除注册事件的处理函数 === 给我机会删除自己

// 结合Store带来职责上变化，多维护一个state，action通知state怎么去改变，进而触发一些事件handler
// 多了API getState()
// dispatch === (action) => { 改变一些值；并且触发事件；并且执行对应的处理函数 }
        //  === (action) => { 改变一些值；$emit() } ==> $emit() === 触发事件；并且执行对应的处理函数
// 模拟事件触发

setTimeout(() => {
    // once A页面
    // dispatch event，执行监听中定义的 callback
    store.dispatch('valueUpdate', '+0');
    // 结束监听
    removeListent();
}, 2000);