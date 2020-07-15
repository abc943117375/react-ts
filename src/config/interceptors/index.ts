import { responseFailFunc, responseSuccessFunc, requestFailFunc, requestSuccessFunc } from './axios'

const interceptors = {
  responseFailFunc, responseSuccessFunc, requestFailFunc, requestSuccessFunc
}

export default interceptors