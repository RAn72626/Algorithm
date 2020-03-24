// lodash get

function get(obj) {
    const input = [...arguments].slice(1, arguments.length);
    let result = [];

    input.forEach(item => {
        const array = item.split('.');

        let remainObj = Object.create(obj);
        array.forEach(subItem => {
            if (subItem.indexOf('[') === -1) {
                remainObj = remainObj ? remainObj[subItem] : undefined;
            } else {
                const left = subItem.indexOf('[');
                const right = subItem.indexOf(']');
                const property = subItem.slice(0, left);
                const index = subItem.slice(left+1, right);

                remainObj = remainObj ? remainObj[property][index] : undefined;
            }
        });
        result.push(remainObj);
    })
    return result;
}

const obj = {
    selector: {
        to: {
            toutiao: 'FE coder'
        }
    },
    target: [
        1,
        2,
        {name: 'byted'}
    ]
}

console.log(get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name'));  
