// 方法一
module.exports = function Generator () { // 定义一个function，模拟全局环境
    let id = 0;
    return () => { // 返回一个函数，函数里面定义另一个函数，形成闭包，在闭包里，可以访问闭包外的变量，所以可以访问 id
        id++;
        return id;
    }
}

// 方法二
function* next_id(){
    let current_id =0;
    while(true) {
        current_id++;
        yield current_id; // return current_id, 并且暂停
    }
}

let g = next_id();

for( var i = 0; i < 10; i++ ){
    console.log( g.next().value, g.next() )
} 
