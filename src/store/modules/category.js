// 分类列表模块
// 引入
import { findAllCategory } from '@/api/category'
import { topCategory } from '@/api/constants'
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合，依赖topcategory重新设置，保证初始化就要数据，不至于白屏
      // map 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 拿到数据替换原始list
  mutations: {
    // payload是传入的参数 所有的分类集合
    setList (state, payload) {
      state.list = payload
    },
    // 定义show和hide函数,控制当前分类的二级分类显示和隐藏
    show (state, id) {
      // 找到当前元素 state.list.open = true
      // 用find方法 find()方法返回符合指定条件（函数内判断）的数组的第一个元素的值
      const currentCategory = state.list.find(item => item.id === id)
      currentCategory.open = true
    },
    hide (state, id) {
      const currentCategory = state.list.find(item => item.id === id)
      currentCategory.open = false
    }
  },
  actions: {
    // 获取分类
    async getList ({ commit }) {
      const data = await findAllCategory()
      // 修改分类
      // 给每个分类加上控制二级分类显示隐藏的数据
      data.result.forEach((top) => { top.open = false })
      // 不能直接调用 通过传参commit调用 setList(list,data)
      commit('setList', data.result)
    }
  }
}
