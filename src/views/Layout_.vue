<template>
  <!-- 顶部通栏 -->
  <AppNavBar />
  <!-- 头部组件 -->
  <AppHeader />
  <!-- 吸顶头部组件 -->
  <AppHeaderSticky />
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView />
  </div>
  <!-- 底部组件 -->
  <AppFooter />
</template>
<script>
import { useStore } from 'vuex'
import AppNavBar from '@/components/app-namebar.vue'
import AppHeader from '@/components/app-header.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  name: 'Layout_',
  components: { AppNavBar, AppHeader, AppHeaderSticky, AppFooter },
  setup () {
    // 获取分类数据
    const store = useStore()
    store.dispatch('category/getList')
    return {}
  }
}
</script>
<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
