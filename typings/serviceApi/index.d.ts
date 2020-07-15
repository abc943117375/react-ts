import { AxiosPromise } from 'axios'
// 定义返回值的接口
interface ResBasicsData {
  errcode: string
  result?: any
  errmsg: string
  [propName: string]: string
}
// <T>泛型 使用接口规定一个函数的入参和返回值
interface ApiFun {
  <T>(outerParams: T, outerOptions?: NormoalizeOptions): AxiosPromise<any>
}

interface ApiKey {
  '*': ApiFun,
  'test/getRegeo': ApiFun
}
