import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
// import Layout from '@/views/layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    meta: { keepAlive: true },
    redirect: '/home',
    children: [
      { path: 'home', component: () => import('@/views/home/index.vue'), meta: { keepAlive: true } },
      { path: 'video', component: () => import('@/views/video/index.vue') },
      { path: 'my', component: () => import('@/views/my/index.vue') },
      { path: 'qa', component: () => import('@/views/qa/index.vue') }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    // ! 开启路由传参,把路由参数传递到组件props中
    props: true
  },
  { path: '/user', component: () => import('@/views/user/index.vue') }
]

const router = new VueRouter({
  routes
})

export default router
