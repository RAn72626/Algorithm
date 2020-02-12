/**
 * 对一个二叉搜索树进行序列化和反序列化，由于二叉搜索树的特性可知，其相邻的值的大小关系代表其中序遍历的结果
 * 因此只需要生成器其前序或者后续的遍历结果，两次遍历结果就可以得到最终的二叉搜索树，这里选择前序遍历结果，后续不方便处理且不能使用
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
    const node5 = new TreeNode(17);
    const node6 = new TreeNode(15);
    node5.left = node4;
    node6.right = node4;
    const node19 = new TreeNode(19);
    const node18 = new TreeNode(18);
    node18.right = node19;
    node18.left = node6;
    root.right = node18;
    return root;
}

function bfs(root) {
    let res = [];
    if (root) {
        let queue = [];
        let level = 1; // 记录下当前找到第几层了
        const obj = {
            key: level,
            node: root
        };
        queue.push(obj);  // 在队列中放入对象
        while(queue.length > 0) {
            const temp = queue.shift();
            const { key, node } = temp;
            if (key > res.length) {  // 如果取出的节点的key 等于res的长度，说明当前这一层已经取过了
                res.push(node.value);
                level++;
            }
            // 把当前节点的左右节点加入到队列中
            if (node.left) {
                const leftObj = {
                    key: level,
                    node: node.left,
                }
                queue.push(leftObj);
            }
            if (node.right) {
                const rightObj = {
                    key: level,
                    node: node.right,
                }
                queue.push(rightObj);
            }
        }
    } 
    return res;
}

function main() {
    let root = initial();
    const res = bfs(root);
    console.log( res, 'preorder');
}

main();
