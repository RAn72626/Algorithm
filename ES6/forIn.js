// （1）for…in 适合于遍历对象，for…of 循环适合于遍历数组；

// （2）for… in 循环返回的值都是数据结构的键值名，遍历对象返回的对象的key值，遍历数组返回的数组的下标，for…of 循环返回的值都是数据结构的键值，遍历对象返回的对象的value值，遍历数组返回的数组的值。

let arr = [1, 2, 3, 4, 5];

console.log("loop value");
for(let val of arr) {
    console.log(val);
}

console.log("loop key");
for(let key in arr) {
    console.log(key);
}

let obj = {
    "a": 1,
    "b": 2,
    "c": 3,
}

console.log("loop key");
for (let key in obj) {
    console.log(key);
}

console.log("loop value");
for (let val of Object.keys(obj)) 
{
    console.log(val);
}

