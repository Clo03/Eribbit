// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import defaultImg from '@/assets/images/200.png'
/* import XtxBreadItem from './xtx-bread-item.vue'
import XtxBread from './xtx-bread.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import XtxSkeleton from './xtx-skeleton.vue' */

// 使用 `require` 提供的函数 `context`  加载某一个目录下的所有 `.vue` 后缀的文件。
// 然后 `context` 函数会返回一个导入函数 `importFn`
// 它有一个属性 `keys() `  获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 `importFn`  根据路径导入组件对象
// 遍历的同时进行全局注册即可

// context(目录路径，是否加载子目录，加载文件的匹配正则/字符串)
const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    /*  app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem) */

    // 根据keys批量注册
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      app.component(component.name, component)
    })
    // 自定义指令
    defineDirective(app)
  }
}

const defineDirective = (app) => {
  // 图片懒加载指令 v-lazy
  // 原理：先存储图片地址不能在src上，当图片进入可视区，将你存储图片地址设置给图片元素（操作DOM）即可。
// 1.定义指令
  app.directive('lazy', {
    // vue2.0监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3.0的指令拥有的钩子函数和组件的一样，使用指令的DOM是否创建好，钩子函数: mopnted（在此是选项API）
    // 触发mounted的时候会传入一个DOM(el)就是此时使用指令的DOM
    mounted (el, binding) {
      // 2.创建一个观察对象，来观察当前使用指令的元素 第一个参数：回调函数（参数：对象数组里面有个属性isIntersecting） 第二个参数：配置选项
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observer.unobserve(el)
          // 4.图片数据处理失败 原生 on绑定事件 onload加载成功
          el.onerror = () => { el.src = defaultImg }
          // 3.把指令的值（binding.value）设置为el的src属性
          el.src = binding.value
        }
      }, { threshold: 0.01 })
      // 开启观察
      observer.observe(el)
    }
  })
}
