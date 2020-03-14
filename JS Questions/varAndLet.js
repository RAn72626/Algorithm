// 声明全局变量推荐使用 var，如果在自作用域中更改了，全局也会写
// 如果全局有一个let变量，在子作用域中又重新声明了一个 let 变量，那么在子作用域中使用的是新的lei 变量
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
            // m = 'mmmm';
        console.log(n, 'inside22 n')
        console.log(m, 'inside22 m');
    }

    for (let k = 0; k < 2; k++) {
        inside();
    }

}

// test()