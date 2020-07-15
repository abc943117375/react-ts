import { ApiKey } from "typings/serviceApi";
import { AxiosRequestConfig, AxiosPromise } from 'axios'
import axiosInstance from './axios'
import API_CONFIG from 'src/services/api';
import { API_DEFAULT_CONFIG } from 'src/config'

interface MakeApiInterFace {
  api: ApiKey,
  apiBuilder(options: MakeApiOptions): void
  _apiSingleBuilder(options: ApiSingleBuilder): void
}
interface ApiSingleBuilder extends ApiDefaultConfig {
  namespace: string
  config: ApiSoleModule[]
}
export interface NormoalizeOptions extends AxiosRequestConfig {
  UploadFile?: boolean
  isExteriorAPI?: boolean
}

class MakApi implements MakeApiInterFace {
  api: ApiKey
  constructor(options: MakeApiOptions) {
    this.api = {} as ApiKey
    this.apiBuilder(options)
  }
  apiBuilder = ({ sep, config = {}, debug, proxy }: MakeApiOptions) => {
    /**
     * config === {
     *              xxxx:ApiSoleModule
     *            }  
     */
    Object.keys(config).forEach(namespace => {
      this._apiSingleBuilder({
        namespace, // 命名空间
        sep,
        config: config[namespace], // 命名空间对应的子空间
        debug, // 是否开启响应,请求打印
        proxy // 代理
      })
    })
  }
  _apiSingleBuilder = ({ namespace, sep, config, debug, proxy }: ApiSingleBuilder) => {
    /**
     * config === Array[object]
     */
    config.forEach(item => {
      const { name, desc, method, path, proxyName } = item
      let { baseURL } = item
      // 添加命名空间
      const apiName = `${namespace}${sep}${name}`
      // 是否开启代理,决定了使用代理名还是url
      baseURL = proxy ? proxyName : baseURL
      Object.defineProperty(this.api, apiName, {
        value: <T>(outerParams: T, outerOptions?: NormoalizeOptions): AxiosPromise<any> => {
          // 在这里获取token,或者一些大部分接口的需要的参数并添加到请求中
          const token = 'xxxadsdfadsf'
          // 获得全局混入了参数的params
          const dataParams: T = Object.assign(
            {
              '全局混入参数key': '全局混入参数值'
            },
            outerParams // 传递进来的参数
          )
          const config: AxiosRequestConfig = _normoalize(
            Object.assign({
              url: path,
              method,
              desc,
              baseURL,
            }, outerOptions),
            dataParams
          )
          // 将token放入请求头
          if (config.headers) {
            config.headers['X-Authorization'] = token
          } else {
            config.headers = { 'X-Authorization': token }
          }
          // 如果是外部api,则删除token
          if (outerOptions && outerOptions.isExteriorAPI) {
            delete config.headers['X-Authorization']
          }
          // 通过全局配置开启调试模式 === 输出请求和响应结果。
          if (debug) {
            console.info(`调用服务层接口${apiName}，接口描述为${desc}`)
          }
          return axiosInstance(config)
        }
      })
    })
  }
}
function _normoalize(options: NormoalizeOptions, params: any) {
  // 是否是上传文件,是则直接return
  if (options.UploadFile) {
    return options
  }
  // 判断是那种请求方式,将参数放在不同的地方并返回
  if (options.method === 'post') {
    options.data = params
  } else if (options.method === 'get') {
    options.params = params
  }
  return options
}

export default new MakApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
}).api