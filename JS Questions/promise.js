// Promise.all(promises[]) 当所有的promise执行完毕之后，才返回new Promise 的 resolve
// Promise.race(promises[]) 当有一个promise执行完毕后，就返回new Promise 的 resolve

function fetch(url) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(url);
      }, Math.random()*1000);
  });
}

function promiseAll() {
  let prom1 = fetch(1);
  let prom2 = fetch(2);
  let prom3 = fetch(3);
  const all = function(promises) {
      let result = [], index = 0;
      return new Promise((resolve, reject) => {
          promises.forEach(item => {
              // race 
              // item.then((res) => {
              //   resolve(res);
              // })

              // all
              item.then((res) => {
                  result.push(res);
                  index++;
                  if (index === promises.length) {
                      resolve(result);
                  }
              }).catch((error) => {
                  reject(error);
              })
          })
      })
  }

  all([prom1, prom2, prom3]).then((res) => {
      console.log(res)
  }).catch((error) => {
      console.log(error);
  });
}

promiseAll();

// 每隔一秒输出一个数字，异步的链式调用
const list = [1, 2, 3];
const square = num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);
    });
}

// 使用 promise 链式回调可以实现，
// 但是 async await 不擅长链式回调
function test() {
    const queue = list.reduce((prev, curr) => {
        if (prev) {
            return () => {
                return new Promise((resolve, reject) => {
                    prev().then((data) => {
                        console.log(data);
                        square(curr).then(resolve, reject);
                    })
                })
            }
        } else {
            return () => {
                return square(curr);
            }
        }
    }, null);

    queue().then(data => {console.log(data, 'end')})
}

test()


// upload pictures
  async function uploadPicture(files, editor) {
    console.log(editor);
    if (typeof files === 'string') {
      return null;
    } else {
      const imageInfo = await getImageInfo(files[0]);
      if (imageInfo && imageInfo.width >= 750 && imageInfo.height >= 422) {
        // 图片大小适合
        const base64 = await getBase64FromFile(files[0]);
        if (base64) {
          const res = await fetchAPI(apis.uploadImg, { img_base64: base64 }, true);
          if (res && res.code === 0) {
            const imageWH = await getImageInfo(res.data);
            return {
              src: res.data,
              ...(imageWH || {}),
              name: files[0].name,
              size: files[0].size,
              type: files[0].type
            };
          }
        }
        return Promise.reject({ type: 'error', message: '上传失败', action: 'message' });
      } else {
        // 图片大小不合适请重新上传
        return Promise.reject({ type: 'error', message: '重新上传', action: 'reupload' });
      }
    }
    // console.log(editor);
    // return new Promise((resolve, reject) => {
    //   if (typeof files === 'string') {
    //     reject('');
    //   } else {
    //     getBase64FromFile(files[0])
    //       .then((base64) => {
    //         fetchAPI(apis.uploadImg, { img_base64: base64 }, true)
    //           .then((res) => {
    //             if (res && res.code === 0) {
    //               console.log(res.data);
    //               getImageInfo(res.data).then((value) => {
    //                 resolve({
    //                   src: res.data,
    //                   ...(value || {}),
    //                   name: files[0].name,
    //                   size: files[0].size,
    //                   type: files[0].type
    //                 });
    //               });
    //             } else {
    //               reject('');
    //             }
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //             reject('');
    //           });
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   }
    // });
  }

  input.onchange = (e) => {
    const files = e.target.files;
    if (!files) return;
    uploadPicture(files, editor)
      .then((attrs) => {
        editor.insertCard('picture_card', attrs);
      })
      .catch((error) => {
        if (error.action === 'reupload') {
          // 弹框提示
          confirm({
            title: (
              <span style={{ paddingLeft: '2px' }}>
                <Icon component={warningIcon} style={{ color: '#FF6155', transform: 'translate(-2px,3px)' }} />
                图片尺寸过小
              </span>
            ),
            cancelText: '取消',
            okText: '重新上传',
            onOk: () => {
              this.fileInput.click();
            },
            children: (
              <p>
                图片上传的最小尺寸为750*422px， <br />
                请更换后重新上传。
              </p>
            )
          });
        } else if (error.action === 'message') {
          Message.error(error.title);
        } else {
          console.log(error);
        }
      });
  };