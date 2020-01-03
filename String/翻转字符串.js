// 要求：先把字符串转化成数组，再借助数组的reverse方法翻转数组顺序，最后把数组转化成字符串

//split方法把字符串转换成数组
//reverse方法翻转数组顺序
//join方法来把数组转换成字符串

function reverse(str) {
    str = str.split('').reverse().join('');

    return str;
}

// reverseString('hello world')
// "dlrow olleh"