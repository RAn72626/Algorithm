async function temp() {
    console.log(1);
    await new Promise(function(resolve, reject) {
        console.log(2);
        resolve(4);
        console.log(3);
    }).then((res) => {
        console.log(res)
    })
    console.log(5)
    
}

temp();
console.log(6)

// 123645
