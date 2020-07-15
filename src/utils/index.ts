/**
 * 获取url参数
 * @param {*参数} name
 */
export function getUrlParam(name: string): string {
  // eslint-disable-next-line
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [',', ''])[1].replace(/\+/g, '%20')) || ''
  // let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  // let r = window.location.search.substr(1).match(reg)
  // if (r != null) {
  //   return unescape(r[2])
  // } else {
  //   return null
  // }
}

export function v(val1: number | string, val2?: number | string, val3?: number | string, val4?: number | string): string {
  // @ts-ignore
  // typeof val1 !== 'undefined'
  const arr = [...arguments]
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (arr[i] / 750 * 100).toFixed(3) + 'vw'
  }
  return arr.join(' ')
}

export function debounce(fn: any, wait: number): () => void {
  let timerId: NodeJS.Timer | null = null
  let result: () => void
  return () => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      // @ts-ignore
      result = fn.apply(this, arguments)
    }, wait)
    return result
  }
}

export function throttle(fn: any, wait: number): () => void {
  let timer: NodeJS.Timer | null = null
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, arguments)
        timer = null
      }, wait)
    }
  }
}

export function judgeClient(): 'Android' | 'IOS' | 'PC' {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid) {
    return 'Android'
  } else if (isIOS) {
    return 'IOS'
  } else {
    return 'PC'
  }
}

/**
 * 处理iOS 微信客户端6.7.4 键盘收起页面未下移bug
 */
export function handleIOSBug() {
  if (/iphone|ipod|ipad/i.test(navigator.appVersion)) {
    document.addEventListener('blur', (e: any) => {
      // 这里加了个类型判断，因为a等元素也会触发blur事件
      if (['input', 'textarea'].includes(e.target.localName)) {
        document.body.scrollIntoView(false)
      }
    }, true)
  }
}

export function getLetter(index = 0) {
  const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return letter
  // return letter[index]
}

export function complainDisposeState(data: any) {
  data.forEach((item: any, index: number) => {
    switch (item.appealStatus) {
      case 0:
        item.appealStatusText = '待审核'
        item.stateBgColor = '#FFC321'
        break
      case 1:
        item.appealStatusText = '已通过'
        item.stateBgColor = '#21B68A'
        break
      case 2:
        item.appealStatusText = '已驳回'
        item.stateBgColor = '#DB3C3C'
        break
      default:
        item.appealStatusText = '无'
        break
    }
    switch (item.appealType) {
      case 1:
        item.appealTypeText = '考勤异常'
        break
      case 2:
        item.appealTypeText = '其他'
        break
      default:
        item.appealTypeText = '无'
        break
    }
    item.index = index
    item.createTime ? item.createTimeText = new Date(item.createTime).toLocaleString('zh', { hour12: false }) : item.createTimeText = '无'
    item.disposeTime ? item.disposeTimeText = new Date(item.disposeTime).toLocaleString('zh', { hour12: false }) : item.disposeTimeText = '无'
  })
}

export const getShowButtonName = (item: any) => {
  switch (item.showButton) {
    case 1:
      if (item.attendanceWay === 1) {
        return {
          label: '定位签到',
          color: '#2172ED' // 蓝色
        }
      } else if (item.attendanceWay === 2) {
        return {
          label: '扫一扫签到',
          color: '#2172ED' // 蓝色
        }
      } else {
        return {
          label: '无',
          color: '#2172ED' // 蓝色
        }
      }
    case 2:
      return {
        label: '已签到',
        color: '#21B68A' // 绿色
      }
    case 3:
      return {
        label: '重签',
        color: '#FFC321' // 蓝色
      }
    case 4:
      return {
        label: '无'
      }
    case 5:
      return {
        label: '开启考勤',
        color: '#2172ED' // 蓝色
      }
    case 6:
      return {
        label: '结束考勤',
        color: '#DB3C3C' // 红色
      }
    case 7:
      return {
        label: '考勤未开始',
        color: '#FFC321' // 黄色
      }
    case 8:
      return {
        label: '考勤已结束',
        color: '#DB3C3C' // 红色
      }
    default:
      return {
        label: ''
      }
  }
}

/**
 * @see 时间戳格式化时间
 * @returns yyyymmdd
 */
export const timestampToTime = (timestamp: any) => {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}