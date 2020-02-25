const nums = ['a', 'b', 'a', 'b', 'c'];

function minHeap(nums, k) {
    const childrenMap = {};
    const map = nums.reduce((prev, curr) => {
        if (prev[curr]) {
            prev[curr] += 1;
        } else {
            prev[curr] = 1;
        }
        return prev;
    }, []);

    function createTree(resultTree, k) {
        let tree = resultTree.slice(0, k);
        for (let i=k-1; i>=0; i--) {
            flatTree(tree, i, k);
        }
        return tree;
    }

    function flatTree(tree, index, k) {
        const children = childrenMap[index] ? childrenMap[index].filter(item => item<k) : getChildren(index, k);
        if (children.length > 0) {
            if (children.length === 1 && tree[index] > tree[children[0]]) {
                const temp = tree[index];
                tree[index] = tree[children[0]];
                tree[children[0]] = temp;
                flatTree(tree, children[0], k);
            }
            if (children.length === 2 && tree[index] > Math.min(tree[children[0]], tree[children[1]])) {
                const target = tree[children[0]] > tree[children[1]] ? children[1] : children[0];
                const temp = tree[target];
                tree[target] = tree[index];
                tree[index] = temp;
                flatTree(tree, target, k);

            }
        }
    }

    function getChildren(index, k) {
        const locationLayer = Math.log2(index+1);
        const locationIndex = index+1 - Math.pow(2, locationLayer) + 1;
        const nextLayer = Math.pow(2, locationLayer+1) -1;
        childrenMap[index] = [nextLayer+2*locationIndex-2, nextLayer+2*locationIndex-1];
        return childrenMap[index].filter(item => item < k);
    }

    let isTree = false;
    let resultTree = [];
    let idMap = {};

    for (let key in map) {
        if (!isTree && resultTree.length < k) {
            resultTree.push(map[key]);
            idMap[map[key]] ? idMap[map[key]].push(key) : idMap[map[key]] = [key];
            if (resultTree.length === k) {
                resultTree = createTree(resultTree, k);
                isTree = true;
            }
        }
        if (isTree && map[key] > resultTree[0]) {
            resultTree[0] = map[key];
            idMap[map[key]] ? idMap[map[key]].push[key] : idMap[map[key]] = [key];
            flatTree(resultTree, 0, k);
        }
    }

    resultTree = Array.from(new Set(resultTree));
    resultTree.sort((a, b) => b-a);
    // return resultTree;
    return resultTree.reduce((prev, curr) => {
        return [...prev, ...idMap[curr]];
    }, []).slice(0, k);
}

console.log(minHeap(nums, 1));