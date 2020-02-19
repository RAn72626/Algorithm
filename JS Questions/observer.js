// 实现一个简单的观察者模式（Observer）：
// let o = new Observer();
// // 添加监听
// o.listen('eventName', (param1) => {});
// // 触发
// o.trigger('eventName', 'param1');
// // 删除监听
// o.remove('eventName',  (param1) => {});

// 添加校验
// 事件名必须为字符串
function  Observer() {
    this.eventBus = []; // 数组，存储eventName
    // 数组结构
    this.handlers = {  // 对象，key 是 eventName，value 是数组，存储属于这个 eventName 的 handler

    };
    this.listen = function(eventName, handler) {
        if (typeof eventName !== 'string') {
            return false;
        }
        if (this.eventBus.indexOf(eventName) === -1) {
            this.eventBus.push(eventName);
        }
        if (this.handlers[eventName]) {
            this.handlers[eventName].push(handler);
        } else {
            this.handlers[eventName] = [handler];
        }
        // 返回 remove handler
        return () => { this.remove(eventName, handler); };
    }
    this.trigger = function(eventName) {
        if (typeof eventName === 'string' && this.eventBus.indexOf(eventName) > -1) {
            const targets = this.handlers[eventName] || [];
            targets.forEach(item => {
                // 不能破坏作用域 将事件本身传回处理函数
                item({ eventName });
            });
            return true;
        }
        return false;
    }
    this.remove = function(eventName, handler) {
        if (typeof eventName === 'string' && this.eventBus.indexOf(eventName) > -1) {
            this.handlers[eventName] = this.handlers[eventName].filter(item => item !== handler);
            if (this.handlers[eventName].length === 0) {
                this.eventBus = this.eventBus.filter(item => item !== eventName);
                delete this.handlers[eventName];
            }
        }
    }
}

// 测试用例
const o = new Observer();
const handler = (e) => {
    console.log('trigger handler', e.eventName)
};
const removeHandler = o.listen('trigger', handler);
o.trigger('trigger');
removeHandler();
// o.remove('trigger', handler);
o.trigger('trigger');