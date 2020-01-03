// resolve promise 产生的函数，作用域的原因其能修改promise的状态 pending -> fullfied
// 去除,then(callback)的一个函数体，传入参数并执行，由于作用域这个函数体能够修改调用者的状态

Promise.prototype.all = function (promises) {
    let index = promises.length;
    let result = [];
    return new Promise((resolve, reject) => {
      promises.map(item => {
        // race 实现过程
        // item.then(resolve);
        // all 实现过程
        item.then((data) => {
          index--;
          result.push(data);
          if (index === 0) {
            resolve(result);
          }
        });
      });
    });
  }

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