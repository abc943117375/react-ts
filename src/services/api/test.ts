import { BASE_URL as baseURL } from 'src/config'

const apiArray: ApiSoleModule[] = [
  {
    name: 'getRegeo',
    baseURL,
    path: 'https://restapi.amap.com/v3/geocode/regeo',
    method: 'get',
    desc: '高德地图逆编译',
    proxyName: '/'
  }
]

export default apiArray
