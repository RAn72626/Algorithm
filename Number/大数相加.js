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


