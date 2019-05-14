// 参数传递
// k = [0, n-1];
// C(2n) = C(2k) * C[2(n-1-k)]
// C(2n) = C(2*0) * C[2*(n-1-0)] + C(2*1) * C[2*(n-1-1)] + ... + C(2*(n-1)) * C(2*0)
function split(n, resultCache) {
  if (n === 0) {
    return resultCache[0] || 1;
  } else if ( n === 1) {
    return resultCache[1] || 1;
  } else {
    let result = 0;
    for (let k=0; k<n; k++) {
      const first = resultCache[k] ? resultCache[k] : split(k, resultCache);
      resultCache[k] = first;
      const second = resultCache[n-1-k] ? resultCache[n-1-k] : split(n-1-k, resultCache);
      resultCache[n-1-k] = second;
      result = result + first * second;
    }
    resultCache[n] = result;
    return result;
  }
}
function optSplit(n) {
  const resultCache = new Array(n);
  for (let index = 0; index < n; index++) {
    if (!resultCache[index]) {
      resultCache[index] = 0;
    }
  }
  resultCache[0] = 1;
  resultCache[1] = 1;
  if (resultCache[n]) return resultCache[n];
  split(n, resultCache);
  if (resultCache[n]) return resultCache[n];
}
optSplit(6);
optSplit(4);
// 数据太大 JS引擎处理不了

// 全局函数
function split(n) {
    if (n === 0) {
      return resultCache[0] || 1;
    } else if ( n === 1) {
      return resultCache[1] || 1;
    } else {
      let result = 0;
      for (let k=0; k<n; k++) {
        const first = resultCache[k] ? resultCache[k] : split(k, resultCache);
        resultCache[k] = first;
        const second = resultCache[n-1-k] ? resultCache[n-1-k] : split(n-1-k, resultCache);
        resultCache[n-1-k] = second;
        result = result + first * second;
      }
      resultCache[n] = result;
      return result;
    }
  }
  var resultCache = [];
  function optSplit(n) {
    for (let index = 0; index < n; index++) {
      if (!resultCache[index]) {
        resultCache[index] = 0;
      }
    }
    resultCache[0] = 1;
    resultCache[1] = 1;
    if (resultCache[n]) return resultCache[n];
    split(n);
    if (resultCache[n]) return resultCache[n];
  }
  optSplit(6);
  optSplit(4);
  