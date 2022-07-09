import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// axios设置请求拦截器
request.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + store.state.token// 设置响应头
  return config
}, err => {
  console.log(err)
})

// 响应拦截器
// axios设置响应拦截器
request.interceptors.response.use(response => {
  return response// 拦截处理响应结果，直接返回需要的数据
}, error => {
  console.log(error)
  if (error.response && error.response.status === 401) {
    router.push('/login')
  }
})
export default request
