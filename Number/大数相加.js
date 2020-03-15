// 两个大数相加

function add(a, b, decimal) {
    const aList = (a || '').split('');
    const bList = (b || '').split('');
    let indexA = aList.length - 1;
    let indexB = bList.length - 1;
    let temp = 0;
    let res = '';
    while (indexA >= 0 || indexB >= 0 || temp) {
        const sum = Number(aList[indexA] || 0) + Number(bList[indexB] || 0) + temp;
        temp = Math.floor(sum / decimal);
        res = String(sum % decimal) + res;
        indexA--;
        indexB--;
    }
    return res;
}

function addToDecimal(a, b) {
    const binary = add(a, b, 2).split('');
    let index = 0;
    let result = '0';
    while (index <= binary.length - 1) {
        result = add(add(result, result, 10), binary[index], 10);
        // result（n） = result(n-1) * decimal + val(n位当下的值)
        // result(n-1) 是 add(result, result, 10)
        // decimal 为2，因为result*2, 是二进制，
        index++;
    }
    return result;
}

// 进制 m 转换为 n 进制 
// parseInt(str,radix); 将字符串str按照radix进制编码方式转换为10进制返回，没有radix，默认为10
// toString(radix)；返回表示该数字的指定进制形式的字符串。
function convert(num, m, n) {
    return parseInt(String(num), m).toString(n);
}

const num = 101;
const res = convert(num, 2, 10);
console.log(res)
