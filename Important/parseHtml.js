// // const html = '<div>
// //                             Directory
// //                             <ul>
// //                                     <div>Apple</div>
// //                                     <div>Orange</div>
// //                             </ul>
// //                         </div>’;

// // const obj = { 
// //     "tag": "div”, 
// //     "children": [ 
// //         "Directory”,
// //          { "tag": "ul”, 
// //           "children": [
// //                  { "tag": "li”, 
// //                 "children": [ "Apple" ] },
// //                  { "tag": "li”,
// //                  "children": [ "Orange" ] }
// //              ]
// //          }
// //      ]
// // };

// // https://github.com/lilongllong/wheels/blob/master/interview/ali/parseHtml.js

const html = '<div>Directory<ul><div>Apple</div><div>Orange</div></ul></div>'

function parseHtml(html) {
    const stack = [];
    let index = 0;

    while (index < html.length) {
        // 元素开始tag, 进栈
        if (html[index] === '<' && html[index+1] !== '/') {
            let closeTagIndex = html.slice(index+1).indexOf('>');
            stack.push({tag: html.slice(index+1, index+closeTagIndex+1), children: []});
            index = index + closeTagIndex + 2;
        } 
        // 元素结束tag，出栈
        else if (html[index] === '<' && html[index+1] === '/') {
            let closeTagIndex = html.slice(index+1).indexOf('>');
            const tag = html.slice(index+2, index+closeTagIndex+1);
            let children = [];
            while (stack.length > 0) {
                const popHtml = stack.pop();
                if (typeof popHtml === 'string' || popHtml.tag !== tag) {
                    children.unshift(popHtml);
                } else {
                    popHtml.children = children;
                    stack.push(popHtml);
                    break;
                }
            }
            index = index + closeTagIndex + 2;
        } 
        // 元素内容，进栈存储元素内容，格式为 string
        else if (html[index] !== '<') {
            let closeIndex = html.slice(index+1).indexOf('<');
            if (closeIndex !== 0) {
                stack.push(html.slice(index, index+closeIndex+1));
            }
            index = index + closeIndex + 1;
        }
    }

    return stack[0];
}

console.log(parseHtml(html));

// const html = '<div>Directory<ul><div>Apple</div><div>Orange</div></ul></div>';
// Convert html to object.
// 可以采用堆栈更快 采用堆栈的
// function splitTag(html) {
//   // 自元素才拆分
//   const stack = [];
//   let index = 0;
//   while(index < html.length) {
//     if (html[index] === '<' && html[index+1] !== '/') {
//       // 进入入站模式
//       let closeTagIndex = html.slice(index + 1).indexOf('>');
//       stack.push({ tag: html.slice(index + 1, index + closeTagIndex + 1), children: [] });
//       index = index + closeTagIndex + 2;
//     } else if (html[index] === '<' && html[index + 1] === '/') {
//      // 出栈
//       let closeTagIndex = html.slice(index + 1).indexOf('>');
//       const tag = html.slice(index + 2, index + closeTagIndex + 1);
//       let children = [];
//       while (stack.length > 0) {
//         const popHtml = stack.pop();
//        if (typeof popHtml === 'string' || popHtml.tag !== tag) {
//          children.unshift(popHtml);
//         } else {
//           popHtml.children = children;
//           stack.push(popHtml);
//           break;
//         }
//       }
//       index = index + closeTagIndex + 2;
//     } else if (html[index] !== '<') {
//      // 进入自元素模式
//       const lastIndex = html.slice(index).indexOf('<');
//       if (lastIndex !== 0) {
//         stack.push(html.slice(index, index + lastIndex));
//       }
//       index = index + lastIndex ;
//     }
//   }
//   return stack[0];
// }

// console.log(splitTag(html));
