function * f(){
    yield console.log(2)
}
console.log(1)
f()
console.log(3)

// 1 3