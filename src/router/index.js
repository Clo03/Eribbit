import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout_.vue')
const Home = () => import('@/views/home/index_.vue')
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
  routes
})

export default router
