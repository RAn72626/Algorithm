/**
 * @description: 会议室占用, 有效时间是 早上8点到晚上9点，14个小时
 * @description: 输入 ‘8，10’ 开始时间和结束时间
 * @description: 输出是 ['8,10']
 * @description: 目标是最大化使用该会议室，同等使用率方法，该会议室开始的时间越早越好
 * F(X, input) = F(remain, input.splice(1)) || F(X, input.splice(1)) 选或者不选，两种情况判断，选取最大值
 * 终止条件：remain = X - input[0].end === 0， 没有剩余时间了
 * 终止条件：F(0, input.length === 0)， 会议全部安排完毕了
 */

const input = ['8,10', '9,11', '12,15', '16,18'];

function formateTime(value) {
    const input = value.map(item => {
        const arr = item.split(',');
        return {
            start: parseInt(arr[0])-7,
            end: parseInt(arr[1])-7,
        }
        
    })

    input.sort(function(a,b) {
        return a.start - b.start;
    })
    return input;
}

const TIME_COUNT = 14;

function getEalierTime(a, b) {
    return a;
}

function scheduleMeetingF(times, array) {
    // 分解，分解成更小范围的问题，寻求方案，同时假设已知子范围解决方案，对最终方案进行剪枝
    // 对于每个团队的情况，只有入选和不入选

    // 终止条件
    if (times && times > 0 && array && array.length > 0) {

        const target = array[0];
        // 当前会议的开始时间对应 会议室空闲，并未当前会议的结束时间至少不晚于会议室关门时间
        // 当前会议室可选的，再深入判断是否选择
        if ( target.start > TIME_COUNT - times && target.end <= TIME_COUNT)  {
            const notSelected = scheduleMeetingF(times, array.slice(1));
            const selectedChildren = scheduleMeetingF(TIME_COUNT - target.end, array.slice(1));
            const selected = {
                value: target.end - target.start + 1 + selectedChildren.value,
                path: [target].concat(selectedChildren.path)
            }

            if (selected.value === notSelected.value) {
                return getEalierTime(selected, notSelected);
            } else if (selected.value > notSelected.value) {
                return selected;
            } else {
                return notSelected;
            }
        } else {
            // 当前会议不合法，不选
            return scheduleMeetingF(times, array.slice(1));
        }
    } else {
        return {value: 0, path: []}
    }
}

const res = scheduleMeetingF(14, formateTime(input));
const path = res.path.map(item => {
    return {
        start: item.start + 7,
        end: item.end + 7
    }
})
console.log(res.value, path )
