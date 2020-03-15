function add(a, b) {
    const aArr = a.split('');
    const bArr = b.split('');

    let aIndex = a.length -1;
    let bIndex = b.length - 1;
    let digit = 0, res = '';

    while (aIndex >= 0 || bIndex >= 0 || digit) {
        const aItem = aIndex >=0 ? aArr[aIndex] : 0;
        const bItem = bIndex >= 0 ? bArr[bIndex] : 0;

        let temp = parseInt(aItem) + parseInt(bItem) + digit;
        digit = Math.floor(temp / 10);
        let sum = temp % 10;

        res = String(sum).concat(res);
        aIndex --;
        bIndex --;
    }
    return res;
}

const res = add('123459989797', '54321797979797979989');
console.log(res, [4.4, 553].toString());

function convert(num) {
    
}

const decimal = convert('01010101');
console.log(decimal);
