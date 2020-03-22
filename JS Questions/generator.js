function * f(){
    console.log(2);
    console.log(4);
    yield console.log(5);
    yield console.log(6);
    console.log(7);
}
console.log(1)
let func = f();
func.next()
console.log(3)
func.next()
func.next()
// 1 3