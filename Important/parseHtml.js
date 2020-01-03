// const html = '<div>
//                             Directory
//                             <ul>
//                                     <div>Apple</div>
//                                     <div>Orange</div>
//                             </ul>
//                         </div>’;

// const obj = { 
//     "tag": "div”, 
//     "children": [ 
//         "Directory”,
//          { "tag": "ul”, 
//           "children": [
//                  { "tag": "li”, 
//                 "children": [ "Apple" ] },
//                  { "tag": "li”,
//                  "children": [ "Orange" ] }
//              ]
//          }
//      ]
// };

// https://github.com/lilongllong/wheels/blob/master/interview/ali/parseHtml.js

const html = '<div>Directory<ul><div>Apple</div><div>Orange</div></ul></div>'

function parseHtml(html) {
    const stack = [];
    let index = 0;

    console.log("start");
    while (index < html.length) {
        // 元素开始tag
        if (html[index] === '<' && html[index+1] !== '/') {
            let closeTagIndex = html.slice(index+1).indexOf('>');
            stack.push({tag: html.slice(index+1, index+closeTagIndex+1), children: []});
            index += closeTagIndex + 2;
            console.log(closeTagIndex);
        } 
        // 元素结束tag
        else if (html[index] === '<' && html[index+1] === '/') {

        } 
        // 元素内容
        else if (html[index] !== '<') {

        }
    }

    return stack[0];
}


