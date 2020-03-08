var json = {
    userId: 123,
    // 根据 UI 页面确定需要的用户信息
    userName: 'user name',
    userEmail: 'user email',
    // 获奖的信息
    prize: {
        id: 1,
        prizeProduct: 'Iphone',
        price: '8000'
    }
}

function getPrize() {
    const random = Math.random() / 100;
    let res = '';

    if (random <= 0.0005 && random > 0) {
        res = '1';
    } else if (random <= 0.001 && random > 0.005) {
        res = '2';
    } else if (random <= 0.002 && random > 0.001) {
        res = '3';
    } else if (random <= 0.004 && random > 0.002) {
        res = '4';
    } else {
        res = 'sorry';
    }
    
    return res;
}

const result = getPrize();
// console.log(result)

prizeArr = [1, 2, 3, 4];
probArr = [0.0005, 0.001, 0.002, 0.004];

function getRandomPrize(prizeArr, probArr) {
    let sum = 0;
    let prev = 0;
    let random = Math.random() /100;
    const len = probArr.length;

    for (let i=len -1; i>=0; i--) {
        sum = probArr[i] + sum;
    }

    for (let i=len-1; i>=0; i--) {
        prev = probArr[i] + prev;
        if (random <= prev) {
            return prizeArr[i];
        }
    }
    return 'sorry';
};

const a = getRandomPrize(prizeArr, probArr);
console.log(a);