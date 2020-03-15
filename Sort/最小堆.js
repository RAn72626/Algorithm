/**
 * 题目描述：
 * 从许多大文件中提取出现频率最高的100个单词
 * 可能涉及倒排索引，排序和
 * 堆排序的时间复杂度为O（nlogn） 构建堆的过程的时间复杂度为n，调堆的时间复杂度为logn
 */

// 长工推荐答案
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    var childrenMap = {};
    let map = nums.reduce((prev, curr) => {
        if (prev[curr]) {
            prev[curr] += 1;
        } else {
            prev[curr] = 1;
        }
        return prev;
    }, {});
    
    console.log(map, 'map')
    function flatTree (tree, index, k) {
        if (index >= k) return;
        const children = childrenMap[index] ? childrenMap[index].filter(item => item < k) : getChildren(index, k);
        if (children.length > 0) {
            if (children.length === 1 && tree[index] > tree[children[0]]) {
                const temp = tree[children[0]];
                tree[children[0]] = tree[index];
                tree[index] = temp;
                flatTree(tree, children[0], k);
            } else if (children.length === 2 && tree[index] > Math.min(tree[children[0]], tree[children[1]])) {
                const target = tree[children[0]] > tree[children[1]] ? children[1] : children[0];
                const temp = tree[index];
                tree[index] = tree[target];
                tree[target] = temp;
                flatTree(tree, target, k);
            }
        }
    }

    function getChildren (index, k) {
        const locationLayer = Math.floor(Math.log2(index + 1)); // index 元素的上一层，层数从1 开始计算
        const locationIndex = (index + 1) - Math.pow(2, locationLayer) + 1; // locationIndex 是index元素在当前行的第几个，从1开始计算
        const nextLayer = Math.pow(2, locationLayer+1) - 1;  // 下一层
        childrenMap[index] = [nextLayer + locationIndex * 2 - 2, nextLayer + locationIndex * 2 -1];  // 左右子节点
        return childrenMap[index].filter(item => item < k);  // 过滤不存在的子节点
    }

    function createTree (tree, k) {
        // 截取 tree 数组中 前面 k 个元素
        const result = tree.slice(0, k);
        for(let index = k - 1; index >= 0; index--) {
            // 从最后一个元素开始创建最小堆
            flatTree(result, index, k);
        }
        return result;
    }
    let isTree = false;
    let resultTree = [];
    const idMap = {};
    for (let key in map) {
        if (map.hasOwnProperty(key)) {
            if (isTree && map[key] >= resultTree[0]) {
                resultTree[0] = map[key];
                idMap[map[key]] ? idMap[map[key]].push(key) : idMap[map[key]] = [key]; // idMap 记录当前key 对应的元素
                flatTree(resultTree, 0, k);
            }
            // 刚开始还没有创建树，把元素都放在resultTree 中 
            if (!isTree && resultTree.length <= k - 1) {
                resultTree.push(map[key]);
                idMap[map[key]] ? idMap[map[key]].push(key) : idMap[map[key]] = [key];
                // resultTree 的长度为 k, 意思是可以创建最小堆了，后期如果还有元素就替换掉最小堆的根节点，维护k个元素的最小堆
                if (resultTree.length === k) {
                    console.log(resultTree, 'resultTree')
                    resultTree = createTree(resultTree, k);
                    isTree = true;
                }
            }
        }
    }
    resultTree = Array.from(new Set(resultTree));
    resultTree.sort((a, b) => b - a);

    return resultTree.reduce((prev, curr) => { return [...prev, ...idMap[curr]]; }, []).slice(0, k);
};

const nums = ['a', 'a', 'b', 'a', 'c', 'd', 'd', ''];
console.log(topKFrequent(nums, 2))
// end

// 最小堆
// const files = [9, 3, 7, 6, 5, 1, 10, 2, 8, 12, 40, 90, 100, 120, 500, 35];

// function findParent(index) {
//     if (!index) return -1;
//     const n = findNLayer(index);
//     const n_location = index - Math.pow(2, n) + 2;
//     // index  === 2^n - 2 + 该列第N个位置; 
//     parent = Math.pow(2, n - 1) - 2 + Math.ceil(n_location / 2);
//     return parent;
// }

// function findChildren(index) {
//     const n = findNLayer(index);
//     const n_location = index - Math.pow(2, n) + 2;
//     const leftChild = Math.pow(2, n+1) - 2 + (n_location - 1) * 2 + 1;
//     const rightChild = Math.pow(2, n+1) - 2 + (n_location - 1) * 2 + 2;
//     return [leftChild, rightChild];
// }

// // 确定二叉树层级
// function findNLayer(index) {
//     let result = 0;
//     let target = 1;
//     while (target < index + 1) {
//         target += Math.pow(2, (result + 1));
//         result += 1;
//     }
//     return result;
// }

// function flatTree(treeArray, index) {
//     const maxLength =  treeArray.length;
//     const children = findChildren(index).filter(item => item < maxLength);
//     if (children.length === 0) return;
//     if (children.length === 1 && treeArray[children[0]] < treeArray[index]) {
//         const temp = treeArray[children[0]]
//         treeArray[children[0]] = treeArray[index];
//         treeArray[index] = temp;
//         flatTree(treeArray, children[0]);
//     }
//     if (children.length === 2 && treeArray[index] > Math.min(treeArray[children[0]], treeArray[children[1]])) {
//         if (treeArray[children[0]] >= treeArray[children[1]]) {
//             const temp = treeArray[children[1]];
//             treeArray[children[1]] = treeArray[index];
//             treeArray[index] = temp;
//             flatTree(treeArray, children[1]);
//         } else {
//             const temp = treeArray[children[0]];
//             treeArray[children[0]] = treeArray[index];
//             treeArray[index] = temp;
//             return flatTree(treeArray, children[0]);
//         }
//     }
// }

// function createTree(value) {
//     let treeArray = value;
//     const maxLength = treeArray.length;
//     // let index = findParent(treeArray.length - 1); // 干扰特别大
//     while(index >= 0) {
//         flatTree(treeArray, maxLength);
//         index --;
//     }
//     return treeArray;
// }

// function maxTop(top, files) {
//     const minTree = createTree(files.slice(0, top));
//     files.slice(top).forEach(item => {
//         if (minTree[0] < item) {
//             minTree[0] = item;
//             flatTree(minTree, 0);
//         }
//     });
//     return minTree;
// }

// console.log(maxTop(5, files));


/**
 * 对一个二叉搜索树进行序列化和反序列化，由于二叉搜索树的特性可知，其相邻的值的大小关系代表其中序遍历的结果
 * 因此只需要生成器其前序或者后续的遍历结果，两次遍历结果就可以得到最终的二叉搜索树，这里选择前序遍历结果，后续不方便处理且不能使用
 */

// function TreeNode (value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
// }

// function initial() {
//     const root = new TreeNode(12);
//     const node1 = new TreeNode(2);
//     node1.right = new TreeNode(3);
//     const node2 = new TreeNode(9);
//     const node3 = new TreeNode(5)
//     node3.left = node1;
//     node3.right = node2;
//     root.left = node3;
//     const node4 = new TreeNode(16);
//     const node5 = new TreeNode(17);
//     const node6 = new TreeNode(15)
//     node5.left = node4;
//     node6.right = node4;
//     const node19 = new TreeNode(19);
//     const node18 = new TreeNode(18);
//     node18.right = node19;
//     node18.left = node6;
//     root.right = node18;
//     return root;
// }

// const tree = initial();
// // 这里可以采用堆栈的压栈和出栈 实现成本会更小
// function firstPriority(tree) {
//     if (tree) {
//         return [ tree.value, ...firstPriority(tree.left), ...firstPriority(tree.right)];
//     } else {
//         return [];
//     }
// }

// function serialize(tree) {
//     return firstPriority(tree).join('_');
// }

// function insertTree(tree, value) {
//     if (tree) {
//         if (tree.value < value) {
//             if (tree.right) {
//                 insertTree(tree.right, value);
//             } else {
//                 tree.right = new TreeNode(value);
//             }
//         } else {
//             if (tree.left) {
//                 insertTree(tree.left, value);
//             } else {
//                 tree.left = new TreeNode(value);
//             }
//         }
//     }
// }

// function deserialize(value) {
//     const array = value.split('_').map(item => parseInt(item));
//     // 序列化
//     let index = 1;
//     let root = new TreeNode(array[0]);
//     while(index < array.length) {
//         insertTree(root, array[index]);
//         index ++;
//     }
//     return root;
// }
// const str = serialize(tree);
// console.log(str);
// const desTree = deserialize(str);
// console.log(desTree.right.left.right);
// console.log(serialize(desTree));

// 最小堆
// const treeArray = [9, 3, 7, 6, 5, 1, 10, 2];

// function findParent(treeArray, index) {
//     if (!index) return -1;
//     const n = findNLayer(index);
//     const n_location = index - Math.pow(2, n) + 2;
//     // index  === 2^n - 2 + 该列第N个位置; 
//     parent = Math.pow(2, n - 1) - 2 + Math.ceil(n_location / 2);
//     return parent;
// }

// function findNLayer(index) {
//     let result = 0;
//     let target = 1;
//     while (target < index + 1) {
//         target += Math.pow(2, (result + 1));
//         result += 1;
//     }
//     return result;
// }

// function findBrother(treeArray, index) {
//     if (!index) return -1;
//     const isLeft = index % 2 === 0;
//     const n = findNLayer(index);
//     const n_location = index - Math.pow(2, n) + 2;
//     // index  === 2^n - 2 + 该列第N个位置; 
//     parent = Math.pow(2, n - 1) - 2 + Math.ceil(n_location / 2);
// } 



// function createTree(treeArray) {
//     for (let index = treeArray.length - 1; index >= 0; index--) {
//         const parent = findParent(treeArray, index);
//         if (treeArray[parent] > treeArray[index]) {
//             const temp = treeArray[index];
//             treeArray[index] = treeArray[parent];
//             treeArray[parent] = temp;
//             if ()
//         }
//     }
// }