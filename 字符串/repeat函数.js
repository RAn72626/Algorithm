// string = 'abc', 那么 string.repeat(3) = 'abcabcabc';
// 在 String 的原型链上定义函数，所以string可以直接调用

String.prototype.repeat = function(value) {
    let res = '';
    const tempString = ''.concat(this);

    for (var i=0; i<value; i++) {
        res = res.concat(tempString);
    }

    return res;
}
