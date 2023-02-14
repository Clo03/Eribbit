// 定义分类相关的API接口函数
import request from '@/utils/request'
/**
 * 获取所有分类
 * @returns Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取顶级类目信息——（children属性）
 * @param {String}id ——顶级类目id
 * @returns
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 获取二级类目筛选后的信息
 * @param {String}id ——二级类目id
 * @returns
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取筛选条件下的商品信息
 * @param {Obiect}params ——根据筛选条件筛选
 * @returns
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods', 'post', params)
}
