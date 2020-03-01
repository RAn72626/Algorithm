// ES5 继承
// 原型链继承

// 首先定义父类
function Parent(name, name1) {
    this.name = name;
    this.name1 = name1;
}

// 父类的原型是一个对象，给这个对象添加方法
Parent.prototype.getName = function() {
    // console.log(this.name);
}

// 定义子类
function Child() {
    this.age = 24;
};

// 通过Children的prototype属性和Parent进行关联继承
// new Parent('lily') 是Parent实例的对象，Child的原型指向Parent实例的对象，因此Child将继承Parent的属性和方法
Child.prototype = new Parent('lily', 'jack');

let test = new Child();
// test.constructor === Children.prototype.constructor === Parent

console.log(test.name, test.name1, test.age);

// 构造函数实现继承
// 定义父类
function Animal(name, name1) {
    this.name = name;
    this.name1 = name1;
    this.age = 48;
}

// 定义子类
// 在子类内部，通过 apply()或者call()在新创建的对象上面调用父类的属性和方法
function Dog() {
    this.temp = 'lily';

    // arguments => { '0': 'jack', '1': 'jone' }
    // ...arguments => jack jone
    // call 和 apply 都可以改变调用函数 Animal 中this的指向，指向当前作用域中的this
    // call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。
    // bind 返回一个新的函数
    // Animal.call(this, arguments[0], arguments[1]);
    // Animal.call(this, ...arguments);
    Animal.apply(this, arguments);
}

let dog = new Dog('jack', 'jone');

console.log(dog.name, dog.name1, dog.age, dog.temp, 'constructer instance');

// ES6 继承, class 是ES6 新引入的，不是object或者 function
// 定义父类
class Father {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    show() {
        console.log(this.name, this.age);
    }
}

// 通过extends 关键字实现继承
class Son extends Father {
    constructor(props, sonName, sonAge) {
        super(...props);
        this.sonName = sonName;
        this.sonAge = sonAge;
    }
    showSon() {
        console.log(this.sonName, this.sonAge);
    }
}

// 实例化Son，实例对象有Son 的属性和方法，也会有Father 的属性和方法
let son = new Son(['lily', '30'], 'mike', '15');

// son.show();
// son.showSon();
