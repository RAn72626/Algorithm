// 栈的特点：先进后出（FILO）。利用栈的这一特点，
// 可以解决像它具有一样特征的问题，比如，大数相加、编辑器的undo序列的保存、浏览器访问历史的记录保存、递归函数中调用的地址和参数值的保存等。
// 本文章主要要讲的是如何利用栈的特点，来检查表达式的括号是否匹配。

// https://blog.csdn.net/weixin_38323736/article/details/88601057

let isLegal = function(str) {
    const left = 0;
    const right = 1;
    const other = 2;

    // 判断括号是左边还是右边
    let verifyFlag = function (char) {
        if (char === '(' || char === '[' || char === '{' || char === '/*') {
            return left;
        } else if (char === ')' || char === ']' || char === '}' || char === '*/') {
            return right;
        } else {
            return other;
        }
    }

    // 判断左右括号是否匹配
    let matches = function(char1, char2) {
        if (
            (char1 === '(' && char2 === ')')
            || (char1 === '[' && char2 === ']')
            || (char1 === '{' && char2 === '}')
            || (char1 === '/*' && char2 === '*/')
        ) {
            return true;
        } else {
            return false;
        }
    }

    // 入口
    let leftStack = [];
    if ((str !== null) || (str !== '') || (str !== undefined)) {
        for (var i=0; i<str.length; i++) {
            let char = str.charAt(i);
            if (verifyFlag(char) === left) {
                leftStack.push(char);
            } else if (verifyFlag(char) === right) {
                if (leftStack.length === 0 || !matches(leftStack.pop(), char)) {
                    return false;
                }
            } else {
                return false;
            }
        }

        // for 循环结束之后，如果leftStack 还有内容，说明不匹配
        if (leftStack.length !== 0) {
            return false;
        }
        return true;
    }
}



