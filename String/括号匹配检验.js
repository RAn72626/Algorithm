// 栈的特点：先进后出（FILO）。利用栈的这一特点，
// 可以解决像它具有一样特征的问题，比如，大数相加、编辑器的undo序列的保存、浏览器访问历史的记录保存、递归函数中调用的地址和参数值的保存等。

function Main(str) {
    let stack = [];
    let strArr = str.split('');
    console.log(strArr);

    for (let item of strArr) {
        const type = flag(item);
        if (type === 0) {
            stack.push(item);
        } else if (type === 1) {
            const last = stack.pop();
            const match = checkMatch(last, item);
            if (!match) {
                return false;
            }
        } else if (type === 2) {
            return false;
        }
    }
    if (stack.length !== 0) {
        return false;
    }
    return true;
}

function flag(str) {
    if (str === '(' || str === '[' || str === '{') {
        return 0;
    } else if (str === ')' || str === ']' || str === '}') {
        return 1;
    } else {
        return 2;
    }
}

function checkMatch(str1, str2) {
    if ((str1 === '(' && str2 === ')') 
        || (str1 === '[' && str2 === ']') 
        || (str1 === '{' && str2 === '}')) {
            return true;
    } else {
        return false;
    }
}

const str = '{[()]}}}}}';
const res = Main(str);
console.log(res);

