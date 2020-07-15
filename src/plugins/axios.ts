import axios, { AxiosInstance } from 'axios'
import { AXIOS_DEFAULT_CONFIG } from 'src/config'

import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from 'src/config/interceptors/axios'

let axiosInstance: AxiosInstance
axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance