// 给定两个非空单链表，代表两个非负整数。链表的第一个节点代表整数的最高位，其他每个节点都存放一个10以内的整数。对这两个整数求和，返回结果链表的表头。假设给定的两个整数的首位不为0。
// Input:1->3->9->8   4->5
// Output:1->4->4->3

// 时间复杂度是O(n) = O(k)+O(j)+2*O(m), k是第一个链表的长度，j是第二个链表的长度，m 是这两个链表中最长的那个链表的长度
// O(k) 和O(j) 是翻转链表的时间复杂度，O(m)是遍历最长的链表求和 和 翻转的时间复杂度
// 空间复杂度是O(n), n 是两个链表中最长的链表的长度，不考虑输入占用的空间
// 微软电面

function Node(value) {
    this.value = value;
    this.next = null;
}

function calSum(node1, node2) {
    let reversedNode1 = reverse(node1);
    let reversedNode2 = reverse(node2);

    let resNode = new Node(0);
    let point = 0;
    let curr1 = reversedNode1;
    let curr2 = reversedNode2;
    let currRes = resNode;

    // current node1 and current node2 are not null
    while (curr1 !== null || curr2 !== null) {
        
        const currVal1 = curr1 ? curr1.value : 0;
        const currval2 = curr2 ? curr2.value : 0;

        let value = currVal1 + currval2 + point;
        let nodeValue = value % 10;
        currRes.next = new Node (nodeValue);
        
        point = value > 9 ? Math.floor(value / 10) : 0;

        currRes = currRes.next;

        curr1 = (curr1 !== null) ? curr1.next : null;
        curr2 = (curr2 !== null) ? curr2.next : null;
    }

    let res = reverse(resNode.next);
    return res;
}

function reverse(node) {
    let prev = null;
    let curr = node;

    while (curr !== null) {
        let tempNext = curr.next;
        curr.next = prev;
        prev = curr;
        curr = tempNext;
    }

    return prev;
}

function main() {
    let node1 = new Node(1);
    let curr1 = node1;
    curr1.next = new Node(3);
    curr1 = curr1.next;
    curr1.next = new Node(9);
    curr1 = curr1.next;
    curr1.next = new Node(8);

    let node2 = new Node(4);
    let curr2 = node2;
    curr2.next = new Node(5);

    let res = calSum(node1, node2);

    // let res = reverse(node1);

    let indexNode = res;

    while (indexNode) {
        console.log(indexNode.value, '->');
        indexNode = indexNode.next;
    }

}

main();

