
// 伪随机
function getRandomPrize(prizeArr) {
    const random = Math.random() / 100;
    const probArr = prizeArr.reduce((prev, curr) => {
        const remains = prev.length === 0 ? 0 : prev[prev.length - 1];
        prev.push(remains + (curr.count === 0 ? 0 : curr.prob));
        return prev;
    }, []);

    const len = probArr.length;

    for (let i=0; i<len; i++) {
        if (random <= probArr[i]) {
            prizeArr[i].count--;
            return prizeArr[i].type;
        }
    }
    return 'sorry';
};

function Main() {
    const prizeArr = [
        { type: 1, count: 1, prob: 0.0005 }, 
        { type: 2, count: 2, prob: 0.0010 }, 
        { type: 3, count: 3, prob: 0.002 }, 
        { type: 4, count: 4, prob: 0.004 }
    ];
    const result = [];
    for (let i=0; i < 5000; i++) {
        result.push(getRandomPrize(prizeArr));
    }
    console.log(result.filter(item => item !== 'sorry'), result.length);
}

Main();