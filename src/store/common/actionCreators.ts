import * as constants from './constants'

// 定义测试接口
export interface SetTest {
  type: constants.SetTest,
  payload: any
}
export const setTest = (test: object): SetTest => ({
  type: constants.SetTest,
  payload: test
})

// 导出联合类型 用 | 分隔
export type EnthusiasmAction = SetTest