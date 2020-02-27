'use strict'

var a = 1;
var obj = {
    a: 2,
    b: function() {
        this.a = 3;
    },
    print: function() {
        console.log(this.a);
    }
};
obj.print();
var print = obj.print;
print();