class Foo {
    constructor() {
        this.name = 'Foo';
        this.b = function() { console.log(this.name)};
        this.c = () => console.log(this.name);
    }
    a() { console.log(this.name)};
}

let f = new Foo();
let b = { name: 'bar', a: f.a, b: f.b, c: f.c};

b.a(); // bar， f.a 和 f.b 是function，this 指向调用这个 function 的执行环境，所以this 指向 b
b.b(); // bar， f.a 和 f.b 是function，this 指向调用这个 function 的执行环境，所以this 指向 b
b.c(); // Foo，f.c 是箭头函数，箭头函数和匿名函数的 this 指向定义该函数时的环境
