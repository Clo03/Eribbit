<template>
  <!-- 首页入口 -->
  <div class="home-enter">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />
  <!-- 人气推荐 -->
  <HomeHot />
  <!-- 品牌推荐 -->
  <HomeBrand />
  <!-- 商品推荐 -->
  <HomeProduct />
  <!-- 最新专题 -->
  <HomeSpecial />
</template>
<script>
import HomeBanner from '../home/components/home-banner.vue'
import HomeCategory from '../home/components/home-category.vue'
import HomeNew from '../home/components/home-new.vue'
import HomeHot from '../home/components/home-hot.vue'
import HomeBrand from '../home/components/home-brand.vue'
import HomeProduct from '../home/components/home-product.vue'
import HomeSpecial from '../home/components/home-special.vue'
export default {
  name: 'IndexHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>
<style scoped lang="less">
</style>
