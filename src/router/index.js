import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: welcome
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: NotFound
  }]
})

export default router
