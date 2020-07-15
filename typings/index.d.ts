// 自己编写接口说明文档
interface ApiDefaultConfig {
  debug: boolean
  sep: string // 命名空间分隔符
  proxy: boolean
}
interface MakeApiOptions extends ApiDefaultConfig {
  config: ApiModelObject
}
interface ApiModelObject {
  [propName: string]: ApiSoleModule[]
}
// 使用接口规定每一个请求所拥有的项
interface ApiSoleModule {
  name: string
  baseURL: string
  path: string
  method: string
  desc: string
  proxyName: string
}


interface Test {
  a: string, // 字符串类型
  b: number, // 数值类型
  c: boolean, // 布尔型
  d: Array<any>, // 数组
  e: object, // 对象
}

interface window {
  API: Array[any]
}