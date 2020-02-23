// F(x, input) = F(remain, input.slice(1)) || F(X, input.slice(1))

const input = ['8, 10', '12, 16', '13, 19']
const TIME_COUNT = 14;

function formateTime (input) {
    return input.map(item => {
        const arr = item.split(',');
        return {
            start: Number(arr[0])-7,
            end: Number(arr[1])-7,
        }
    }).sort(function(a,b) {
        return a.start - b.start
    })
}

function scheduleMeeting (time, array) {
    if (time && time > 0 && array && array.length > 0) {
        const target = array[0];
        if (target.start > TIME_COUNT - time && target.end <= TIME_COUNT) {
            const notSelected = scheduleMeeting (time, array.slice(1));
            const selectedResChildren = scheduleMeeting (TIME_COUNT - target.end, array.slice(1));
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
            return scheduleMeeting(time, array.slice(1))
        }
    } else {
        return {value: 0, path: []};
    }
}

const res = scheduleMeeting(14, formateTime(input));
const path = res.path.map(item => {
    return {
        start: item.start + 7,
        end: item.end + 7
    }
})
console.log(res.value, path )