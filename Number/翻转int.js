// 写一个函数，输入int 型，返回整数逆序后的字符串。要求必须使用递归函数调用，不能用全局变量。
// 输入函数必须只有一个参数传入，必须返回字符串

function convert(num) {
    if (num < 10) {
        return num.toString();
    }
    let bit = num % 10;
    let newNum = Math.floor(num / 10);
    return bit.toString() + convert(newNum);
}

const num = 1234;
console.log(convert(num))