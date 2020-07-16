import React from 'react';
import { Provider } from 'react-redux'
import API from './plugins/api'
import store from './store'
import routes from './routes'
import FrontendAuth from './views/FrontendAuth'
import './assets/styles/app.css'
//       哈希路由     路由    独享路由 重定向路由  跳转链接
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
const Index = () => {
  return (
    <div>
      <h2>
        <Link to="/home">路由整理完成 - 首页</Link>
        <Link to="/mine">路由整理完成 - 我的</Link>
      </h2>
    </div>
  )
}
function App() {
  (window as any).API = API
  console.log('开始咯');
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/" exact={true} component={Index}></Route>
          {/* {routes.map((v: any, index: any) => (
            <Route path={v.path} exact={true} component={v.component} key={index}></Route>
          ))} */}
          <FrontendAuth config={routes}></FrontendAuth>
          <Redirect to="/404" />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
