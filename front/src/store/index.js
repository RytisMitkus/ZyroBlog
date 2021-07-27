import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: {},
  },
  mutations: {
  },
  actions: {
    async  register(context, {
      firstName, lastName, email, password,
    }) {
      const registerUser = await axios.post('/api/users', {
        firstName, lastName, email, password,
      })
      console.log(registerUser)
    },
  },
  modules: {
  },
})
