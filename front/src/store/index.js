import { createStore } from 'vuex'
// eslint-disable-next-line import/no-cycle
import user from './modules/user'
/* eslint-disable no-param-reassign */
/* eslint-disable import/named */
/* eslint-disable no-console */

export default createStore({
  modules: {
    user,
  },
})
