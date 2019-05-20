// 0 到 N 里面 1 的个数

// F（n) 是后面的余数
// 分析456 k=3 m=4
// 首位不为1， 三位数

// 首位为0， 0-99 有C（2）个1
// 首位为1， 100-199 有 1*10^2 + C(2) 个1， C(2) 表示 0-99
// 首位为2， 200-299 有 C(2) 个1， C(2) 表示 0-99
// 首位为3， 300-399 有 C(2) 个1， C(2) 表示 0-99
// 首位为4， 400-456 0-56 有F（57） 个1

// 总数为 C(2) + 1*10^2 + C(2) + (4-2)*C(2) + F(56) = 10^2 + 4*C(2) + F(56) = 10^(k-1) + m*C(k-1) + F(余数)

// 分析156 k=3 m=1
// 首位为1

// 0-99 有C(2) 个1
// 100-156 56+1 个百位上的1 + F（56）

// 总数为 C（2） + 余数 + 1 + F（56）= C(k-1) + 余数 + 1 + F(余数)

// C(n) 前面整的位数
// 个位数 C(1) = n>1 ? 1 : 0;
// 十位数 C(2) = 1*10^1 + 10 * C(1)
// 百位数 C(3) = 1*10^2 + 10 * C(2)
// k位数  C(k) = 1*10^(k-1) + 10 * C(k-1)

let cache = [];

function C(k) {
    if (k<=0) {
        return 0;
    } else {
        let result = cache[k] ? cache[k] : Math.pow(10, k-1) + 10 * C(k-1);
        cache[k] = result;
        return result;
    }
}

function F(n) {
    const k = String(n).length;
    const m = parseInt(String(n).charAt(0));

    if (k === 1) {
        return n>=1 ? 1 : 0;
    }
    const remainder = n - m * Math.pow(10, k-1) ;
    if (m === 1) {
        return C(k-1) + remainder + 1 + F(remainder);
    } else {
        return Math.pow(10, k-1)  + m * C(k-1) + F(remainder);
    }
}

console.log(F(999));