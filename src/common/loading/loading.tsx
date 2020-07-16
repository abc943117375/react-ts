import * as React from 'react'

import { LoadingWrapper } from './style'

import err from 'src/assets/images/hint/err.png'
import fail from 'src/assets/images/hint/fail.png'
import loading from 'src/assets/images/hint/loading.png'
import none from 'src/assets/images/hint/none.png'

interface Iprops {
  type: 'loading' | 'none' | 'err'
  delay?: number // 延迟显示加载效果的时间（防止闪烁）
  top?: string
  show: boolean
  click: () => void | Promise<void>
}
interface Istate {
  content: string
  spinning: boolean
  imgUrl: string
  showButton: boolean
  line: boolean
}

class Loading extends React.PureComponent<Iprops, Istate> {
  static defaultProps = {
    type: 'loading',
    delay: 200,
    top: '50%',
    show: false
  }
  state: Istate = {
    content: '页面加载失败，请重试',
    spinning: false,
    imgUrl: loading,
    showButton: false,
    line: true
  }
  times: number = 0
  componentDidMount () {
    window.addEventListener('offline', this.offline)
    window.addEventListener('online', this.online)
  }
  componentWillUnmount () {
    window.removeEventListener('offline', this.offline)
    window.removeEventListener('online', this.online)
    clearTimeout(this.times)
  }
  componentWillReceiveProps (nextProps: Iprops) {
    const { delay } = this.props
    clearTimeout(this.times)
    this.times = setTimeout(() => {
      switch (nextProps.type) {
        case 'loading':
          this.setState({
            content: '拼命加载中...',
            imgUrl: loading,
            showButton: false,
            spinning: nextProps.show
          })
          break
        case 'none':
          this.setState({
            content: '暂无数据',
            imgUrl: none,
            showButton: false,
            spinning: nextProps.show
          })
          break
        case 'err':
          const { line } = this.state
          // line 为false表示没有网络
          if (line) {
            this.setState({
              content: '页面加载失败，请重试',
              imgUrl: fail,
              showButton: true,
              spinning: nextProps.show
            })
          } else {
            this.setState({
              content: '似乎已断开与互联网的链接~',
              imgUrl: err,
              showButton: false,
              spinning: nextProps.show
            })
          }
          break
        default:
          this.setState({
            content: '',
            imgUrl: '',
            showButton: false,
            spinning: false
          })
      }
    }, delay)
  }
  offline = () => {
    this.setState({ line: false })
  }
  online = () => {
    this.setState({ line: true })
  }
  click = () => {
    this.props.click()
  }
  render () {
    const { top } = this.props
    const { spinning, imgUrl, content, showButton } = this.state
    const Content = (
      <LoadingWrapper top={top!}>
        <img src={imgUrl} style={{ width: 125, height: 80 }} />
        <span className="content">{content}</span>
        {showButton ? <button onClick={this.click} className="button">刷新一下</button> : null}
      </LoadingWrapper>
    )
    return spinning ? Content : null
  }
}

export default Loading