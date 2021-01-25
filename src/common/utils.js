export function debounce(func, delay) {
  let timer = null
  
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

// 利用正则表达式来格式化时间
export function formatDate(date, fmt) {
  // 这个正则表示含有一个或者多个y的表达式
  if (/(y+)/.test(fmt)) {
    // regExp.$1 表示匹配得到的第一个结果
    // substr用于去除多余的部分，例如yy，只保留后两位
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    // 这里的k是字符串
    // console.log(k)
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}


function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}