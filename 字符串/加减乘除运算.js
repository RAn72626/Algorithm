// // 输入一个字符串，有加减乘除，整数，和小数，得出最后的结果
// 微软 onsite

// // 比如，输入12+24.5*4/8

// // 字符串中没有括号，但是需要考虑运算符的优先级

// public class Solution {
//     public int calculate(String s) {
//         StringBuilder stringBuilder = new StringBuilder();
//         Stack<Character> stack = new Stack<>();
//         for (int i = 0; i < s.length(); ) {
//             Character temp = s.charAt(i);
//             if(temp >= '0' && temp <= '9'){
//                 int[] result = findNextNumAndIndex(s, i);
//                 stringBuilder.append(result[0]);
//                 stringBuilder.append(" ");
//                 i = result[1];
//             }else if(temp == '+' || temp == '-'){
//                 if(!stack.isEmpty()){
//                     while(!stack.isEmpty()){
//                         Character item = stack.pop();
//                         stringBuilder.append(item);
//                         stringBuilder.append(" ");
//                     }
//                 }
//                 stack.push(temp);
//                 i++;
//             }else if(temp == '*' || temp == '/'){
//                 if(!stack.isEmpty()){
//                     while(!stack.isEmpty()){
//                         Character item = stack.pop();
//                         if(item == '+' || item == '-'){
//                             stack.push(item);
//                             break;
//                         }else{
//                             stringBuilder.append(item);
//                             stringBuilder.append(" ");
//                         }
//                     }
//                 }
//                 stack.push(temp);
//                 i++;
//             }else{
//                 i++;
//             }
//         }
//         while(!stack.isEmpty()){
//             stringBuilder.append(stack.pop());
//             stringBuilder.append(" ");
//         }
//         String[] strings = stringBuilder.toString().split(" ");
//         Stack<Integer> numStack = new Stack<>();
//         for (int i = 0; i < strings.length; i++) {
//             if(strings[i].charAt(0) == '+'){
//                 int num1 = numStack.pop();
//                 int num2 = numStack.pop();
//                 numStack.push(num2 + num1);
//             }else if(strings[i].charAt(0) == '-'){
//                 int num1 = numStack.pop();
//                 int num2 = numStack.pop();
//                 numStack.push(num2 - num1);
//             }else if(strings[i].charAt(0) == '*'){
//                 int num1 = numStack.pop();
//                 int num2 = numStack.pop();
//                 numStack.push(num2 * num1);
//             }else if(strings[i].charAt(0) == '/'){
//                 int num1 = numStack.pop();
//                 int num2 = numStack.pop();
//                 numStack.push(num2 / num1);
//             }else{
//                 numStack.push(Integer.parseInt(strings[i]));
//             }
//         }
//         return numStack.pop();
//     }
//     private int[] findNextNumAndIndex(String s, int index){
//         int num = 0;
//         int i = index;
//         for (; i < s.length(); i++) {
//             if(s.charAt(i) >= '0' && s.charAt(i) <= '9'){
//                 num = num * 10 + s.charAt(i) - '0';
//             }else{
//                 break;
//             }
//         }
//         int[] result = new int[2];
//         result[0] = num;
//         result[1] = i;
//         return result;
//     }
// }

// 括号匹配,n对括号，所有可能出现的结果总数

/**
 * 
 * @param {*} left : 左括号个数
 * @param {*} right :又括号个数
 */
function consumeall(left, right) {
    if (left < 0 || right < 0) {
        return 0;
    } else if (left > right) {
        return 0;
    } else if (left === 0 || right === 0) {
        return 1;
    } else {
        return consumeall(left - 1, right) + consumeall(left, right - 1);
    }
}

console.log(consumeall(1, 1));
console.log(consumeall(2, 2));

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