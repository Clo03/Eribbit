<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <!-- 品牌 -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="changeBrand(item.id)" :class="{active:item.id===filterData.brands.selectedBrand}" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{ item.name }}</a>
      </div>
    </div>
    <!-- 其他 -->
    <div class="item" v-for="filter in filterData.saleProperties" :key="filter.id">
      <div class="head">{{filter.name}}：</div>
      <div class="body">
        <a @click="changeFilter(filter,i.id)" :class="{active:i.id===filter.properties.selectedAttr}" href="javascript:;" v-for="i in filter.properties" :key="i.id">{{i.name}}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category.js'
export default {
  name: 'subFilter',
  setup (props, { emit }) {
    // 获取二级类目下的筛选数据
    const route = useRoute()
    const filterData = ref([])
    // 记录请求数据的情况制作骨架屏
    const filterLoading = ref(false)
    watch(
      () => route.params.id,
      newValue => {
        if (newValue && `/category/sub/${newValue}` === route.path) {
          // 发请求数据
          filterLoading.value = true
          findSubCategoryFilter(route.params.id).then(data => {
            // 处理数据 缺少“全部”一项
            // 给每一组数据加上选中的ID
            data.result.brands.selectedBrand = null
            data.result.brands.unshift({ id: null, name: '全部' }) // 品牌
            data.result.saleProperties.forEach(
              item => {
                item.properties.selectedAttr = null
                item.properties.unshift({ id: null, name: '全部' })
              } // 属性
            )
            filterData.value = data.result
            filterLoading.value = false
          })
          // console.log(filterData)
        }
      },
      { immediate: true }
    )

    // 记录筛选条件
    const filterParams = () => {
      // 参考数据：{brandId:'',attrs:[{groupName:'',propertName:''}]}
      const obj = { brandId: null, attrs: [] }
      if (filterData.value.brands.selectedBrand) {
        obj.brandId = filterData.value.brands.selectedBrand
      }
      filterData.value.saleProperties.forEach(
        item => {
          if (item.properties.selectedAttr) {
            // obj.attrs.push(item.properties) 不是增加全部 只是增加一行
            const prop = item.properties.find(
              prop => prop.id === item.properties.selectedAttr
            )
            obj.attrs.push({ groupName: item.name, propertName: prop.name })
          }
        } // 属性
      )
      if (obj.attrs.length === 0) {
        obj.attrs = null // 当字段为空，不会发请求给后台
      }

      return obj
    }
    // 记录品牌
    const changeBrand = BrandId => {
      if (filterData.value.brands.selectedBrand === BrandId) return
      filterData.value.brands.selectedBrand = BrandId
      emit('filter-change', filterParams())
    }
    // 记录属性
    const changeFilter = (filter, id) => {
      // 防止重复点击
      if (filter.properties.selectedAttr === id) return
      filter.properties.selectedAttr = id
      emit('filter-change', filterParams())
    }
    return {
      filterData,
      filterLoading,
      changeBrand,
      changeFilter,
      filterParams
    }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>
