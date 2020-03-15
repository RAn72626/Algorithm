// 统计一个字符串中出现最多的及其出现的次数
// 给出一个字符串，统计出现次数最多的字母。如：“asdfssaaasasasasaa”，其中出现最多的是a

function repeat(str) {
    let obj = {};

    for (var i=0; i<str.length; i++) {
        if (!obj[str.charAt(i)]) {
            obj[str.charAt(i)] = 1;
        } else {
            obj[str.char(i)]++;
        }
    }

    var index = '', maxNum = 0;

    for (let j in obj) {
        if (obj[j] > maxNum) {
            maxNum = obj[j];
            index = j;
        }
    }

    return index;
}