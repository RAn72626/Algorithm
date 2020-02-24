const arr = ['a', 'b', 'a', 'c'];

function minHeap(arr, k) {
    // 把数组转换为 map，key 是数组元素，value 是元素出现的次数
    const map = arr.reduce((prev, curr) => {
        if (prev[curr]) {
            prev[curr] += 1;
        } else {
            prev[curr] = 1;
        }

        return prev;
    }, {});

    // 判断是否已经开始构建最小堆
    let isTree = false;
    // 存储最小堆的数组
    let resultTree = [];
    // 遍历map 中的元素
    for (let key in map) {
        if (map.hasOwnProperty(key)) {
            // 如果已经开始构建最小堆，如果元素大于最小堆中最小值，进行替换，维护最小堆
            if (isTree && map[key] > resultTree[0]) {
                resultTree[0] = map[key];
                flatTree(resultTree, 0, k);
            }
            // 如果还没构建最小堆，直接把元素加入 resultTree
            if (!isTree && resultTree.length < k) {
                resultTree.push(map[key]);
                // 开始构建最小堆
                if (resultTree.length === k) {
                    resultTree = createTree(resultTree, k);
                    isTree = true;
                }
            }
        }
    }

    function createTree(resultTree, k) {
        const tree = resultTree.slice(0, k);
        for (let i=k-1; i>=0; i--) {
            flatTree(tree, i, k);
        }
    }

    var childrenMap = {}; // 存放子节点
    console.log(this.childrenMap, window.childrenMap === this.childrenMap)
    function flatTree(tree, index, k) {
        const children = childrenMap[index] ? childrenMap[index].filter(item => item < k) : getChildren(index, k);

        if (children.length > 0) {
            if (children.length === 1 && tree[index] > tree[children[0]]) {
                const temp = tree[children[0]];
                tree[children[0]] = tree[index];
                tree[index] = temp;
                flatTree(tree, children[0], k);
            } else if (children.length === 2 && tree[index] > Math.min(tree[children[0]], tree[children[1]])) {
                const target = tree[children[0]] > tree[children[1]] ? children[0] : children[1];
                const temp = tree[target];
                tree[target] = tree[index];
                tree[index] = temp;
                flatTree(tree, target, k); 
            }
        }

    }

    function getChildren(index, k) {
        const locationLayer = Math.floor(Math.log2(index+1));
        const locationIndex = (index+1) - Math.pow(2, locationLayer) + 1;
        const nextLayer = Math.pow(2, locationLayer+1) -1;
        childrenMap[index] = [nextLayer + locationIndex * 2 - 2, nextLayer + locationIndex * 2 - 1];
        return childrenMap[index].filter(item =>item < k);
    }

}

console.log(minHeap(arr, 2));