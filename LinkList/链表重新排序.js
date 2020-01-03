/**
 * 题目：链表重新排序
 * 有一个链表它的奇数位是升序排列，偶数列是降序排列，最终的将其变成降序排列
 * 例子：5，40，10，35，15，25，20
 * 结果：40，35，25，20，15，10，5 
 */

 function Node(value) {
    this.value = value;
    this.next = null;
 }

 Node.prototype.insert = function () {}

 function revert(nodeList) {
     let header = nodeList;
     
     let first = null, second = null;
     let iteratorA = nodeList;
     let iteratorB = (nodeList || {next: null}).next;

     while (iteratorA !== null && iteratorB !== null) {
        // iteratorA 和 iteratorB 同时存在 
        if (iteratorA && iteratorB) {
            // 首先保存下 iteratorB 的 next 指针
            // 然后翻转
            const temp = iteratorB.next;
            iteratorB.next = iteratorA;
            // 判断 first second 指针
            if (first && second) {
                // 插入到 first 与 second 之间
                first.next = iteratorB;
                iteratorA.next = second;
                
                // 开始迭代 first second 
                first = first.next;
                second = iteratorB.next;
            } else {
                // 初始化 first second
                first = iteratorB;
                second = first.next;
                second.next = null;
                header = first;
            }

            // 迭代指针
            iteratorA = temp;
            iteratorB = (temp || {next: null}).next;

        } else if (iteratorA) {
            // 无需翻转 直接插入
            // 判断 first second 指针
            if (first && second) {
                // 插入到 first 与 second 之间
                first.next = iteratorA;
                
            } else {
                // 初始化 first second
                header = nodeList;
            }
            break;

        } else  {
            // 中断
            break;
        }
     }

     return header;


 }

 function main() {
    let nodeList = new Node(5);
    let curr = nodeList;
    curr.next = new Node(40);
    curr = curr.next;
    curr.next = new Node(10);
    curr = curr.next;
    curr.next = new Node(35);
    curr = curr.next;
    curr.next = new Node(15);
    curr = curr.next;
    curr.next = new Node(30);
    curr = curr.next;
    curr.next = new Node(20);
    curr = curr.next;
    curr.next = new Node(25);

    const res = revert(nodeList);
    console.log(res);
    let indexNode = res;
    while (indexNode) {
        console.log(indexNode.value, '->');
        indexNode = indexNode.next;
    }

 }

 main();

