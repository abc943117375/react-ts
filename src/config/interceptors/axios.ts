import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from 'src/config'
import { Toast } from 'antd-mobile'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ResBasicsData } from 'typings/serviceApi'

// 请求拦截
export function requestSuccessFunc(requestObj: AxiosRequestConfig) {
  if (CONSOLE_REQUEST_ENABLE) {
    console.info(requestObj.data, '请求参数')
  }
  // 这里可以做请求拦截
  return requestObj
}

// 请求发送失败
export function requestFailFunc(requestError: object) {
  // Toast.info('亲，您的网络不太顺畅喔~')
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  return Promise.reject('亲，您的网络不太顺畅喔')
}

// 响应拦截                                        返回值类型      实现返回值接口
export function responseSuccessFunc(responseObj: AxiosResponse<ResBasicsData>): Promise<any> {
  // 是否开启响应结果打印
  if (CONSOLE_RESPONSE_ENABLE) {
    console.info(responseObj.data, '相应内容')
  }
  // 这里可以做响应拦截
  const resData = responseObj.data
  const { errcode, result, errmsg } = resData
  console.log(errcode, result, errmsg, 'errcode, result, errmsg')
  switch (errcode) {
    default:
      if (resData.info === 'OK' || resData.status === '1') { // 第三方
        return Promise.resolve(resData)
      } else {
        return Promise.reject('状态码错误' + errcode)
      }
  }
}

// 响应错误,一般是403除了403以外基本上都是服务器错误
export function responseFailFunc(responseError: any) {
  const err = responseError
  if (err.response) {
    const status = err.response.status
    switch (status) {
      case 403:
        Toast.info('当前用户无相关操作权限!')
        return Promise.reject('当前用户无相关操作权限')
      default:
        Toast.info('服务器错误!请联系相关管理员！')
        return Promise.reject('服务器错误!请联系相关管理员！')
    }
  } else {
    Toast.info('请求超时,请检查您网络!')
    return Promise.reject('请求超时,请检查您网络!')
  }
  // global.vbus.$emit('global.$dialog.show', '服务器错误，请联系相关管理员！')
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
}
