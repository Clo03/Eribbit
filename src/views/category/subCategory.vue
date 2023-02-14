<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 商品面板 包括排序和商品-->
      <div class="goods-list">
        <!-- 排序 复选框 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 加载组件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import XtxInfiniteLoading from '@/components/library/xtx-infinite-loading.vue'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem, XtxInfiniteLoading },
  setup () {
    const route = useRoute()
    const loading = ref(false) // 加载中
    const finished = ref(false) // 加载完毕
    const goodsList = ref([])
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 没有数据代表加载完成
          finished.value = true
        }
        loading.value = false
      })
    }
    // 更改了二级分类的时候重新加载数据
    watch(
      () => route.params.id,
      newVal => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          finished.value = false
          goodsList.value = []
          reqParams = {
            page: 1,
            pageSize: 20
          }
          // getData() goodsList.value = []导致列表空的，加载更多组件顶上来，进入可视区，去加载数据
        }
      }
    )
    // 更改排序后重新请求
    const sortChange = sortParams => {
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 更改筛选后重新请求
    const filterChange = filterParams => {
      console.log(filterParams)
      finished.value = false
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }
    return {
      loading,
      finished,
      reqParams,
      goodsList,
      getData,
      sortChange,
      filterChange
    }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
