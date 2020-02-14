/*
* 给一个二叉树和一个值，检查二叉树中是否存在一条路径，这条路径上所有节点的值加起来等于给的那个初始值。
*/

function TreeNode (value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function initial() {
    const root = new TreeNode(12);
    const node1 = new TreeNode(2);
    node1.right = new TreeNode(3);
    const node2 = new TreeNode(9);
    const node3 = new TreeNode(5);
    node3.left = node1;
    node3.right = node2;
    root.left = node3;
    const node4 = new TreeNode(16);
    const node6 = new TreeNode(15);
    node6.right = node4;
    const node19 = new TreeNode(19);
    const node18 = new TreeNode(18);
    node18.right = node19;
    node18.left = node6;
    root.right = node18;
    return root;
}

// BFS 一般用queue 实现
function pathSumBFS(root, target) {
    if (root === null) {
        return false;
    }

    const item = {
        node: root,
        targetVal: target,
    }
    const queue = [];
    queue.push(item);
    while(queue.length > 0) {
        const {node, targetVal} = queue.shift();
        const tempTarget = targetVal - node.value;
        if (node.right && node.right.value <= tempTarget)  {
            const rightItem = {
                node: node.right,
                targetVal: tempTarget,
            }
            queue.push(rightItem);
        }
        if (node.left && node.left.value <= tempTarget) {
            const leftItem = {
                node: node.left,
                targetVal: tempTarget,
            }
            queue.push(leftItem);
        }
        if (!node.left && !node.right && tempTarget === 0) {
            return true;
        }
    }
    return false;
}

// DFS 一般用递归实现
function pathSumDFS(root, target) {
    if (root && target >=0 ) {
        // 首先写终止条件
        const remain = target - root.value;
        if (!root.left && !root.right && remain === 0) {
            return true;
        } else {
            // 其次写递归条件
            return pathSumDFS(root.left, remain) || pathSumDFS(root.right, remain);
        }
    } else {
        return false;
    } 
}

function main() {
    let root = initial();
    const res = pathSumDFS(root, 22);
    console.log(res, 'res');
}

main();