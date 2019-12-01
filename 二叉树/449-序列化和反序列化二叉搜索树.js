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
    const node3 = new TreeNode(5)
    node3.left = node1;
    node3.right = node2;
    root.left = node3;
    const node4 = new TreeNode(16);
    const node5 = new TreeNode(17);
    const node6 = new TreeNode(15)
    node5.left = node4;
    node6.right = node4;
    const node19 = new TreeNode(19);
    const node18 = new TreeNode(18);
    node18.right = node19;
    node18.left = node6;
    root.right = node18;
    return root;
}

function serialize(root) {
    // preorder
    if (root) {
        return [root.value, ...serialize(root.left), ...serialize(root.right)];
    } else {
        return [];
    }
}

function deserialize(preorder) {
    let root = null;

    preorder.forEach(item => {
        root = createTree(root, item);
    });

    return root;

}

function createTree(root, value) {
    if (root === null) {
        return new TreeNode(value);
    } else {
        if (root.value > value) {
            root.left = createTree(root.left, value);
        } else if (root.value < value) {
            root.right = createTree(root.right, value);
        }
        return root;

    }
}

function main() {
    let root = initial();

    let preorder = serialize(root);

    console.log(preorder, 'preorder');

    let deserializeRoot = deserialize(preorder);

    let preorder1 = serialize(deserializeRoot);

    console.log(preorder1, 'preorder1');
}

main();
