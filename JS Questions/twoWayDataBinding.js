{/* <input id="example" value="init"> */}

let state = {
    value: 'example',
};

// 数据劫持
Object.defineProperty(state, 'value', {
    get() {
        // 收集依赖
        return val;
    },
    set(newValue) {
        document.getElementById('example').value = newValue;
        val = newValue;
    }
});

// 监听 input 变化
document.getElementById('example').addEventListener('change', (event) => {
    state.value = event.target.value;
});
