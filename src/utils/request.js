// 请求工具类
// 1.创建一个新的axios实例
// 2.请求拦截器，如果有token进行头部携带
// 3.响应拦截器: 1．剥离无效数据2．处理token失效
// 4.导出一个函数，调用当前的axsio实例发请求，返回值promise
import router from '@/router'
import store from '@/store'
import axios from 'axios'
// 1
// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axios的一些配置（baseURL, timeout)
  baseURL,
  timeout: 5000
})
// 2
instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有token就在头部携带
  // 获取用户信息对象 const profile = store.state.user.profile
  const { profile } = store.state.user
  // 判断是否有token并设置
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => { return Promise.reject(err) })
// 3
instance.interceptors.response.use(res => res.data, err => {
  // 401状态码
  if (err.response && err.response.statusCode === 401) {
  // 1.清除用户无效信息跳转到登录页面
  // 2.跳转需要传参（当前路由地址）给登录页码 携带之前页面的url（传参）
    store.commit('user/setUser', {})
    // router.push('/login?redirectUrl=' + '当前路由地址')
    // 当前路由地址
    // 在组件中：'user?a=10&b=5' $router.path === /user $router.fullPath === /user?a=10&b=5
    // 在js模块中 router.currentRouter.value.fullPath router.currentRouter是ref响应式数据
    const fullPath = encodeURIComponent(router.currentRouter.value.fullPath) // 转码解析浏览器数据
    router.push('/login?redirectUrl=' + fullPath)
  }

  return Promise.reject(err)
})
// 4
// 请求函数工具
// const request = () => {}
// export default request
export default (url, method, submitData) => {
// 请求地址 请求方式 请求参数（提交的数据）
  // instance
  return instance({
    url,
    method,
    // get params get以外 data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
