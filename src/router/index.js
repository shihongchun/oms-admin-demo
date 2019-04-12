import Vue from 'vue'
import store from '../store/index'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Index from '../views/index'
import NotFound from '../views/404'
import Application from '../views/app-manager/application'
import Behavior from '../views/app-manager/behavior'
import Manager from '../views/app-manager/manager'
import AddUser from '../views/app-manager/manage/add-user'
import AddTopic from '../views/app-manager/topic/add'
import Statistics from '../views/app-manager/topic/statistics'
import editOp from '../views/app-manager/manage/edit-op'
const Management = () => import('../views/app-manager/management')
Vue.use(Router)
const router = new Router({
  mode: 'history',
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
        { path: '/manager', component: Manager, name: '会员管理' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'el-icon-menu',
      children: [
        { path: '/behavior', component: Behavior, name: '会员行为' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'el-icon-menu',
      children: [
        { path: '/addTopic', component: AddTopic, name: '添加话题' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'el-icon-menu',
      children: [
        { path: '/statistics', component: Statistics, name: '话题统计' }
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
              path: 'editOp',
              component: editOp
            },
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
    if (!Object.keys(store.getters.getUser).length) {
    }
    next()
  }
})
export default router
