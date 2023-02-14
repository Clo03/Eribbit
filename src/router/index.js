import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout_.vue')
const Home = () => import('@/views/home/indexHome.vue')
const TopCategory = () => import('@/views/category/indexCategory.vue')
const SubCategory = () => import('@/views/category/subCategory.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory }
    ]
  }

]

// vue2.0 new VueRouter({})
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior () {
    // vue2.0 return { x: 0, y: 0 }
    return { left: 0, top: 0 }
  }
})

export default router
