const parent = document.querySelector('.parent');

// DFS 和树的先序遍历是一样的，先遍历根节点，然后从左到右深度遍历其子节点
// 递归实现 DFS
function recursiveDFS(node, nodeList) {
    if (node !== null) {
        nodeList.push(node);
        let children = node.children;
        for (let i=0; i<children.length; i++) {
            recursiveDFS(children[i], nodeList);
        }
    }

    return nodeList;
}
// const res = recursiveDFS(parent, []);
// console.log(parent, res)

// 非递归实现 DFS, 使用 Stack
function stackDFS(node) {
    let nodeList = [], stack = [];

    if (node !== null) {
        stack.push(node);
    }

    while(stack.length) {
        const temp = stack.pop();
        nodeList.push(temp);
        let children = temp.children;
        const len = children.length;
        for (let i=len-1; i>=0; i--) {
            stack.push(children[i]);
        }
    }

    return nodeList;
}
// const res = stackDFS(parent);
// console.log(res)

// 非递归 BFS, 使用queue
function BFS(node) {
    let nodeList = [];
    let queue = [];

    if (node !== null) {
        queue.push(node);
    }

    while (queue.length) {
        const temp = queue.shift();
        nodeList.push(temp);

        const children = temp.children;
        for (let i=0; i<children.length; i++) {
            queue.push(children[i]);
        }
    }
    return nodeList;
}
const res = BFS(parent);
console.log(res);


