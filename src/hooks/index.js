// 函数(钩子)
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 *
 * @param {Element} target -DOM对象
 * @param {Function} apiFn -API函数
 * @returns
 */
export const useLazyData = (apiFn) => {
  const result = ref([])
  // 优化 添加target为获取DOM元素的响应式数据
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    // 监听的目标
    target,
    ([{ isIntersecting }], observerElement) => {
    // isIntersecting是否进入可视区
      if (isIntersecting) {
        // stop 停止观察
        stop()
        // 启用apiFn获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 第三个参数 配置选项
    { threshold: 0 }
  )
  return { result, target }
}
