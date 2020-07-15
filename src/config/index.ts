import { AxiosRequestConfig } from 'axios'
// 路由默认配置，路由表并不从此注入

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  // 超时时间 
  timeout: process.env.NODE_ENV !== 'production' ? 5000 : 30000,
  // 最大内容长度
  maxContentLength: 20000,
  // 内容类型
  headers: { 'Content-Type': 'application/json' }
}

// 基础url
// export const BASE_URL: string = 'http://xmtx.ittun.com/' // 建云映射地址
// export const BASE_URL: string = 'http://192.168.7.178:7003/'
// export const BASE_URL: string = 'http://192.168.6.24:7003/' // 建云'
// export const BASE_URL: string = 'http://192.168.6.64:7003/' // 建云'
export const BASE_URL: string = 'https://xwx.gzzmedu.com:9080/'

// 开发环境时调试的用户信息
export const baseMsg: any = {
  userInfo: {},
  schoolConfig: {},
  token: ''
}

// API 默认配置
export const API_DEFAULT_CONFIG: ApiDefaultConfig = {
  // 根据环境决定是否开启debug
  debug: process.env.NODE_ENV !== 'production',
  sep: '/',
  // proxy: process.env.NODE_ENV !== 'production'
  proxy: false
}

// 开启请求参数打印
export const CONSOLE_REQUEST_ENABLE: boolean = process.env.NODE_ENV !== 'production'

// 开启响应参数打印
export const CONSOLE_RESPONSE_ENABLE: boolean = process.env.NODE_ENV !== 'production'
