import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    async register({ commit }, {
      firstName, lastName, email, password,
    }) {
      try {
        const data = await axios.post('/api/users', {
          firstName, lastName, email, password,
        })

        commit('setUser', data)
      } catch (e) {
        console.log(e.response)
      }
    },
  },
  modules: {
  },
})
