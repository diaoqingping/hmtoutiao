import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'
import Images from '@/views/images'
import Public from '@/views/public'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

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
    }, {
      path: '/public',
      component: Public
    }, {
      path: '/comment',
      component: Comment
    }, {
      path: '/setting',
      component: Setting
    }, {
      path: '/fans',
      component: Fans
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
