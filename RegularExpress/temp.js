function replace(num) {
    return num.replace(/(\d{1,3})(?=(\d{3})+($|\.))/g, '$1,')
}

let num = '453545454.53535353';
console.log(replace(num));