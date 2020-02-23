// F(13, input) = F(remain, input.slice(1)) || F(13, input.slice(1))

const input = ['8,10', '9,11', '12, 14', '12,18'];

function formateTime(input) {
    const array = input.map(item => {
        const arr = item.split(',');
        return {
            start: parseInt(arr[0])-7,
            end: parseInt(arr[1])-7,
        }
    });

    return array.sort(function (a, b) {
        return a.start - b.start
    });
}

function getBetterByCondition(a, b) {
    return a;
}

const TIME_COUNT = 14;

function scheduleMeeting (time, array) {
    // 终止条件
    if (time && time > 0 && array && array.length > 0) {
        const target = array[0];
        // 当前会议的开始时间对应 会议室空闲，并未当前会议的结束时间至少不晚于会议室关门时间
        // 当前会议室可选的，再深入判断是否选择
        if (target.start > TIME_COUNT - time && target.end <= TIME_COUNT) {
            const notSelected = scheduleMeeting(time, array.slice(1));
            const selectedResChildren = scheduleMeeting(TIME_COUNT - target.end, array.slice(1));
            const select = {
                value: target.end - target.start + 1 + selectedResChildren.value,
                path: [target].concat(selectedResChildren.path),
            }

            if (notSelected.value === select.value) {
                return getBetterByCondition(notSelected, select);
            } else if (notSelected.value > select.value) {
                return notSelected;
            } else {
                return select;
            }
        } else {
            // 当前会议不合法，不选
            return scheduleMeeting (time, array.slice(1));
        }
    } else {
        return {value: 0, path: []}
    }
}

function main () {
    const res = scheduleMeeting(14, formateTime(input));
    const path = res.path.map(item => {
        return {
            start: item.start + 7,
            end: item.end + 7
        }
    })
    console.log(res.value, path)

}
main();



