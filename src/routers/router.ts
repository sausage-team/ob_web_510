import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/main/index.vue'
import Login from '../pages/login/index.vue'
import Register from '../pages/register/index.vue'
import Home from '../pages/main/home/index.vue'
import WriteTravelNotes from '../pages/main/write_travel_notes/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/wtn',
          name: 'WriteTravelNotes',
          component: WriteTravelNotes
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
