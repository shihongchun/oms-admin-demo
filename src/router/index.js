import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Index from '../views/index'
import NotFound from '../views/404'
import Application from '../views/app-manager/application'
// import Management from '../views/app-manager/management'
import AddUser from '../views/app-manager/manage/add-user'
const Management = () => import('../views/app-manager/management')
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'el-icon-menu',
      leaf: true,
      redirect: '/index',
      children: [
        { path: '/index', component: Index, name: '首页' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'el-icon-menu',
      children: [
        { path: '/application', component: Application, name: '应用管理' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'el-icon-menu',
      children: [
        {
          path: '/management',
          component: Management,
          name: '权限管理',
          children: [
            {
              path: 'addUser',
              component: AddUser
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 本地缓存法
  // let user = JSON.parse(localStorage.getItem('user'))
  // let checked = JSON.parse(localStorage.getItem('checked'))
  // if (!user && to.path !== '/login' && !checked) {
  //   next({path: '/login'})
  // } else {
  //   next()
  // }
  // cookie法
  let user = JSON.parse(localStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})
export default router
