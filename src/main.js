import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '../src/style/index.less'

import dayjs from 'dayjs'
// 注册相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 国际化设置中文
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// console.log(dayjs().format('YYYY-MM-DD'))
// const pubdate = '2019-03-11 09:00:00'
// 测试相对时间格式化
// console.log(dayjs().to(dayjs(pubdate)))
// 定义全局过滤器
Vue.filter('relativeTime', d => dayjs().to(dayjs(d)))
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
