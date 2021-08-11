/* eslint-disable import/no-cycle */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (!store.state.user.user.isAuth) {
        next({
          path: '/login',
        })
      } else {
        next()
      }
    },
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { isAuth } = store.getters
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if ((!isAuth && to.path === '/profile')) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
