import Loadable from 'react-loadable'
import ViewLoading from 'src/common/loading/viewLoading'

export default function myLoadable (loader: any, options: any = {}) {
  return Loadable(Object.assign({
    loader,
    loading: ViewLoading,
    timeout: 10000
  }, options))
}