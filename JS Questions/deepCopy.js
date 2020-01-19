// 工具函数
const map = {
    array: 'Array',
    object: 'Object',
    function: 'Function',
    string: 'String',
    null: 'Null',
    undefined: 'Undefined',
    boolean: 'Boolean',
    number: 'Number'
}
let getType = (item) => {
    return Object.prototype.toString.call(item).slice(8, -1); // slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
}
let isTypeOf = (item, type) => {
    return map[type] && map[type] === getType(item);
}

// DFS 
function DFSCopy(obj, visitedArr = []) {
    let _obj = {}; // 定义拷贝的结果
    // 判断如果是数组或者对象，需要DFS深度遍历拷贝
    if (isTypeOf(obj, 'object') || isTypeOf(obj, 'array')) {
        _obj = isTypeOf(obj,'array') ? [] : {};
        let index = visitedArr.indexOf(obj); // 判断是否已经visited过这个元素
        if (~index) { // 位非运算符进行取负运算再减1。如果 index=-1，if(-1)is true, 
            _obj = obj;
        } else {
            visitedArr.push(obj);
            for (let item in obj) {
                _obj[item] = DFSCopy(obj[item], visitedArr);
            }
        }
    } else if (isTypeOf(obj, 'function')) {
        _obj = eval('(' + obj.toString() + ')');
    } else {
        _obj = obj;
    }
    
    return _obj;
}

const obj = {
    name: 'lily',
    age: 35,
    type: {
        name: 'lily-2'
    },
    func: function() {}
}

const res = DFSCopy(obj, []);

console.log(res);