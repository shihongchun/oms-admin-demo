import Vuex from 'vuex'
import Vue from 'vue'
// import ports from '../api/port'

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
    addAccount (state, user) {
      state.user = user
    }
  },
  actions: {
  }
})
export default store
