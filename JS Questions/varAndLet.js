let a = 1;
var b = 2;

console.log(a,  'a');
console.log(b,  'b');

function temp () {
    console.log(a, 'temp a')
    console.log(b, 'temp b')

    function inside() {
        console.log(a, 'inside a')
        console.log(b, 'inside b')
        inside();
    }

    inside();
}

// temp();

var test = function() {
    var m = 'm';
    let n = 'n';

    // (
    //     function() {
    //         m = 'mmmm';
    //         console.log(m, 'IIFE')
    //     }
    // )()

    function inside () {
        console.log(m, 'inside m');
        console.log(n, 'inside n');

        inside2();
    }

    function inside2() {
        
            // let n ="nnn"
        console.log(n, 'inside22 n')
        console.log(m, 'inside22 m');
    }

    for (let k = 0; k < 2; k++) {
        inside();
    }

}

test()