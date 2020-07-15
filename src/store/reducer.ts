import { combineReducers } from 'redux'

import { Reducer as commonReducer } from './common'
// 此处的操作是合并不同的reducer,可以创建多个
const reducer = combineReducers({
  common: commonReducer,
})

export default reducer 