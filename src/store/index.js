import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('TOUTIAO_TOKEN')
  },
  mutations: {
    setToken (state, paylaod) {
      state.token = paylaod
      localStorage.setItem('TOUTIAO_TOKEN', paylaod)
    },
    removeToken (state) {
      state.token = null
      localStorage.removeItem('TOUTIAO_TOKEN')
    }
  },
  actions: {
  },
  modules: {
  }
})
