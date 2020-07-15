import * as constants from './constants'
import { baseMsg } from '../../config'
import { EnthusiasmAction } from './actionCreators'
let defaultState: CommonStore = {
  // 这里写默认存在的state
  test: {}
}
// 如果不是生成环境
if (process.env.NODE_ENV !== 'production') {
  defaultState = Object.assign(defaultState, baseMsg)
}

const reducer = (
  state: CommonStore = defaultState,
  action: EnthusiasmAction): CommonStore => {
  switch (action.type) {
    case constants.SetTest:
      console.log(state, action.payload, 'asdfasd')
      return { ...state, test: action.payload }
    default:
      return { ...state }
  }
}
export default reducer