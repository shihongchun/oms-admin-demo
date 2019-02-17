// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import http from './api/http'
import ports from './api/port'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.http = http
Vue.prototype.ports = ports
Vue.config.productionTip = false
const store = new Vuex.Store({
  state: {},
  mutations: {
    addAccount (state, form) {
      for (let i in form) {
        state[i] = form[i]
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
