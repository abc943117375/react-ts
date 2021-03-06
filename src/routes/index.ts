import home from 'src/views/home'
import mine from 'src/views/mine'
import my404 from 'src/views/error/404'
import Login from 'src/views/login'
import Layout from 'src/views/layout'
import Enter from 'src/views/enter'
const routes: any = [
  {
    path: '/home',
    component: home,
    auth: true
  },
  {
    path: '/mine',
    component: mine,
    auth: true
  },
  {
    path: '/login',
    component: Login,
    auth: false
  },
  {
    path: '/404',
    component: my404,
  },
  {
    path: '/layout',
    component: Layout,
  },
  {
    path: '/enter',
    component: Enter,
  },
]
export default routes