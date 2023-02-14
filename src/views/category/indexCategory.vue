<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 元素的创建和移除出发Transition mode：动画的模式 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" autoPlay style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture">
              <p>{{sub.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 全部分类 各类商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{ item.tag }}</p>
          <XtxMore :path="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="sub in item.goods " :key="sub.id" :goods="sub" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { findBanner } from '@/api/home.js'
import GoodsItem from './components/goods-item.vue'
import { findTopCategory } from '@/api/category.js'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup () {
    // 轮播图数据
    const sliders = ref([])
    findBanner().then(data => (sliders.value = data.result))
    // 面包屑和其他子类
    const route = useRoute()
    const store = useStore()
    const topCategory = computed(() => {
      let cast = {}
      /*  console.log(route.params.id)
      console.log(store.state.category.list) */
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      if (item) {
        cast = item
      }
      return cast
    })

    // 获取各个子类目下的推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(
      () => route.params.id,
      newValue => {
        // newValue && getSubList() 只一级类目
        if (newValue && `/category/${newValue}` === route.path) {
          getSubList()
        }
      },
      { immediate: true }
    )
    return { sliders, topCategory, subList, getSubList }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
