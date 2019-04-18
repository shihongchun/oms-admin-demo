import Vuex from 'vuex'
import Vue from 'vue'
import ports from '../api/port'
import http from '../api/http'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getUserId: state => {
      return state.user.id
    }
  },
  mutations: {
    addAccount (state, account) {
      state.user.account = account
    },
    addUser (state, user) {
      state.user = user
      console.log('user:' + JSON.stringify(user))
    }
  },
  actions: {
    addUser ({state, commit}) {
      http.get(ports.getUser, {
        'account': state.user.account
      }).then(res => {
        const user = res.data.data
        commit('addUser', user)
      })
    }
  }
})
export default store
