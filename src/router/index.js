import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'
import Images from '@/views/images'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: welcome
    }, {
      path: '/article',
      component: Article
    }, {
      path: '/image',
      component: Images
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: NotFound
  }]
})
router.beforeEach((to, from, next) => {
  const user = local.getUser()
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
