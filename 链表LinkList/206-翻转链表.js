// 反转一个单链表。

// 示例:

// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
// 进阶:
// 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

// 方法一：迭代
// 假设存在链表 1 → 2 → 3 → Ø，我们想要把它改成 Ø ← 1 ← 2 ← 3。

// 在遍历列表时，将当前节点的 next 指针改为指向前一个元素。由于节点没有引用其上一个节点，因此必须事先存储其前一个元素。
// 在更改引用之前，还需要另一个指针来存储下一个节点。不要忘记在最后返回新的头引用！

// 复杂度分析

// 时间复杂度：O(n)，假设 n 是列表的长度，时间复杂度是 O(n)。
// 空间复杂度：O(1)。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function Node (value) {
    this.value = value;
    this.next = null;
}

var reverseList = function(head) {
    var prev = null, curr = head; // 定义一个空的节点和一个新的节点等于当前头节点
    while (curr !== null) {  // 循环每一个节点，所以时间复杂度为O（n）
        var nextTemp = curr.next;  // 定义一个临时的节点，记录下当前你节点的下一个节点，以免丢失
        curr.next = prev;  // 让当前节点的下一个节点指向前一个节点，实现反转
        prev = curr; // 让前一个节点等于当前节点
        curr = nextTemp; // 让当前节点等于之前保存好的下一个节点，实现while 循环
    }
    
    return prev; // 返回链表，此时链表的头是之前链表的最后一个节点
};

function main() {
    let head = new Node(5);
    let curr = head;
    curr.next = new Node(4);
    curr = curr.next;
    curr.next = new Node(3);
    curr = curr.next;
    curr.next = new Node(2);
    curr = curr.next;
    curr.next = new Node(1);

    // console.log(head);

    // 调用 reverseList 之后，原本的 head 只剩下 5 了
    // 因为我们在原本的链表上面操作，改变了原本的链表中元素的指针，然后把链表新的值返回出来
    // 此操作并不消耗额外的空间
    let res = reverseList(head);

    let indexNode = res;
    while (indexNode) {
        console.log(indexNode.value, '->');
        indexNode = indexNode.next;
    }
}

main();