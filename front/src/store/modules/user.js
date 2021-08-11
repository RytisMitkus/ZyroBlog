import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import router from '../../router'

const user = {
  state: {
    user: {
      isAuth: false,
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },

    logout(state) {
      state.user = {
        isAuth: false,
      }
      window.localStorage.removeItem('user')
      router.push('/')
    },
  },
  actions: {
    // regsiter user
    async register({ commit }, {
      firstName, lastName, email, password,
    }) {
      try {
        const { data } = await axios.post('/api/users', {
          firstName, lastName, email, password,
        })
        commit('setUser', data)
        localStorage.setItem('user', JSON.stringify(data))
        router.push('/profile')
        return 'success'
      } catch (e) {
        console.error(e.response.data.error)
        return 'fail'
      }
    },
    // login user
    async login({ commit }, {
      email, password,
    }) {
      try {
        const { data } = await axios.post('/api/users/login', {
          email, password,
        })
        commit('setUser', data)
        localStorage.setItem('user', JSON.stringify(data))
        router.push('/profile')
        return 'success'
      } catch (e) {
        console.error(e.response.data.error)
        return 'fail'
      }
    },
    // get user
    async getUser(state) {
      return state.state.user
    },
  },
  getters: {
    isAuth: (state) => state.user.isAuth,
  },
}

export default user
