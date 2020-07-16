import * as React from 'react'
import { Icon, Button } from 'antd-mobile'

import {
  ViewLoadingWrapper
} from './style'

const ViewLoading = (props: any) => {
  if (props.error) {
    return (
      <ViewLoadingWrapper>
        <p>加载错误，请退出浏览器清除缓存再试π__π</p>
        <Button onClick={props.retry} type="ghost" inline={true} size="small">再试一次</Button>
      </ViewLoadingWrapper>
    )
  } else if (props.timedOut) {
    return (
      <ViewLoadingWrapper>
        <p>加载超时，请检查你的网络(..•˘_˘•..)</p>
        <Button onClick={props.retry} type="ghost" inline={true} size="small">再试一次</Button>
      </ViewLoadingWrapper>
    )
  } else if (props.pastDelay) {
    return (
      <ViewLoadingWrapper>
        <Icon type="loading" />
        <p>拼了老命在加载ヾ(*´▽‘*)ﾉ...</p>
      </ViewLoadingWrapper>
    )
  } else {
    return null
  }
}

export default ViewLoading
