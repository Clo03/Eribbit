import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

// vue2.0 创建仓库 new Vuex.store({})
export default createStore({
  state: { // 存放状态
  },
  getters: { // 写计算属性
  },
  mutations: { // 修改方法
  },
  actions: { // 拿数据
  },
  modules: { // 分模块
    cart,
    category,
    user
  },
  // 配置插件
  // 默认储存在localStorage中
  plugins: [createPersistedState({
    // 本地储存空间中的名字
    key: 'erabbit-client-pc-store',
    // 指定需要储存的模块，不写默认全部储存
    paths: ['user', 'cart']
  })]
})
