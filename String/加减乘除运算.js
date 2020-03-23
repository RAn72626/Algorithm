// // 输入一个字符串，有加减乘除，整数，和小数，得出最后的结果
// 微软 onsite

// 简单操作符运算
function operation(str) {
    const result = [];
    let lastIndex = 0;
    let currIndex = 0;
    while(currIndex < str.length) {
        if ('+-*/'.indexOf(str.charAt(currIndex)) > -1) {
            const value = str.slice(lastIndex, currIndex);
            const oper = str.charAt(currIndex);
            if (value.length) {
                result.push(value);
            }
            result.push(oper);
            currIndex ++;
            lastIndex = currIndex;
        } else {
            currIndex ++;
        }
    }
    if (lastIndex < currIndex) {
        result.push(str.slice(lastIndex, currIndex));
    }
    // 数据处理结束
    const plusResult = [];
    let index = result.length - 1;
    while (index > 0) {
        while (index >= 0 && '*/'.indexOf(result[index]) < 0) {
            plusResult.unshift(result[index]);
            index--;
        }
        if (index >= 0) {
            if (result[index] === '*') {
                const left = Number(result[index - 1]) * Number(plusResult.shift())
                plusResult.unshift(left);
            } else {
                const left = Number(result[index - 1]) / Number(plusResult.shift());
                plusResult.unshift(left);
            }
            index -= 2;
        }
    }
    // 乘除处理结束
    while (plusResult.length > 2) {
        const left = plusResult.pop();
        const oper = plusResult.pop();
        const right = plusResult.pop();
        if (oper === '-') {
            plusResult.push(Number(left) - Number(right));
        } else {
            plusResult.push(Number(left) + Number(right));
        }
    }
    return plusResult.pop();

}

console.log(operation('2.1+3/4+1*2'));


// 自己简单实现
// function operation(str) {
//     let stack = [];

//     const len = str.length;
//     let index = 0, prevIndex = 0;
//     while (index < len) {
//         if ('+-*/'.indexOf(str.charAt(index)) > -1) {
//             let prevNum = Number(str.substring(prevIndex, index));
//             stack.push(prevNum);
//             stack.push(str.charAt(index));
//             prevIndex = index+1;
//         }
//         index++;
//     }
//     stack.push(Number(str.substring(prevIndex, index)));
//     console.log(stack, 'before');

//     let i=0;
//     while (i < stack.length) {
//         if (stack[i] === '*') {
//             const left = stack[i-1];
//             const right = stack[i+1];
//             const temp = left * right;
//             stack[i-1] = temp;
//             stack.splice(i, 2);
//             i++;
//         } else if (stack[i] === '/') {
//             const left = stack[i-1];
//             const right = stack[i+1];
//             const temp = left / right;
//             stack[i-1] = temp;
//             stack.splice(i, 2);
//             i++;
//         } else {
//             i++;
//         }
//     }

//     console.log(stack, 'after');
//     while (stack.length > 1) {
//         const right = stack.pop();
//         const operation = stack.pop();
//         const left = stack.pop();

//         if (operation === '+') {
//             const temp = left + right;
//             stack.push(temp);
//         } else if (operation === '-') {
//             const temp = left - right;
//             stack.push(temp);
//         }
//     }
//     return stack[0];
// }

// console.log(operation('12*245-3/2'));
