import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from 'src/store/common'
interface MapStateToProps {
  common: object,
}
interface MapDispatchToProps {
  setTest: (data: object) => any
}

class Test extends Component<MapStateToProps & MapDispatchToProps> {
  async componentDidMount() {
    await this.props.setTest({ a: '成功了!', n: 'asfadsfasf' });
    console.log(this.props.common);
  }
  render() {
    return (
      <div>
        test
        {JSON.stringify(this.props.common)}
      </div>
    )
  }
}
// 经过映射后在组件内可以 this.props.common访问redux中的数据
const mapStateToProps = (state: Store): MapStateToProps => {
  return {
    common: state.common,
  }
}

const mapDispatchProps = (dispatch: any, ownProps: any) => {
  return {
    setTest(data: object) {
      return new Promise((resolve: any) => {
        let result = dispatch(actionCreators.setTest(data))
        resolve(result)
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(Test)

