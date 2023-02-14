<template>
  <div class='home-category' @mouseleave="categoryId=null">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id" @mouseenter="categoryId = item.id" :class="{active:categoryId==item.id}">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink :to="`/category/${sub.id}`" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</RouterLink>
        </template>
        <!-- 骨架 -->
        <template v-else>
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer" v-if="currentCategory">
      <h4>{{currentCategory && currentCategory.id =='brand00'?"品牌":"分类" }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!-- 商品 -->
      <ul v-if="currentCategory&&currentCategory.goods">
        <li v-for="goods in currentCategory.goods" :key="goods.id">
          <RouterLink :to="`/category/goods/${goods.id}`">
            <img v-lazy="goods.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{goods.name}}</p>
              <p class="desc ellipsis">{{goods.desc}}</p>
              <p class="price"><i>¥</i>{{goods.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-if="currentCategory&&currentCategory.brands">
        <li class="brand" v-for="brands in currentCategory.brands" :key="brands.id">
          <RouterLink to="/">
            <img v-lazy="brands.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{brands.place}}</p>
              <p class="name ellipsis">{{brands.name}}</p>
              <p class="desc ellipsis-2">{{brands.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home.js'
import xtxSkeleton from '@/components/library/xtx-skeleton.vue'
export default {
  components: { xtxSkeleton },
  name: 'HomePage',
  setup () {
    const store = useStore()
    // 最终使用的数据=九个分类（）+ 一个品牌
    // 自定义品牌 响应式数据
    const brand = reactive({
      id: 'brand00',
      name: '品牌',
      children: [{ id: 'brand01', name: '品牌推荐' }],
      brands: []
    })
    const menuList = computed(() => {
      // 得到9个分类切每个一级分类下的子分类只有两个
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })

    // 弹层推荐商品数据
    // 根据鼠标滑过的id确认弹层数据
    const categoryId = ref(null)
    const currentCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value)
    })

    // 得到品牌信息
    findBrand().then(data => {
      brand.brands = data.result
    })

    return { menuList, categoryId, currentCategory }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
.layer {
  width: 990px;
  height: 500px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 250px;
  top: 0;
  display: none;
  padding: 0 15px;
  h4 {
    font-size: 20px;
    font-weight: normal;
    line-height: 80px;
    small {
      font-size: 16px;
      color: #666;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 310px;
      height: 120px;
      margin-right: 15px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #fff;
      &:nth-child(3n) {
        margin-right: 0;
      }
      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;
        &:hover {
          background: #e3f9f4;
        }
        img {
          width: 95px;
          height: 95px;
        }
        .info {
          padding-left: 10px;
          line-height: 24px;
          width: 190px;
          .name {
            font-size: 16px;
            color: #666;
          }
          .desc {
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
    // 品牌的样式
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
  }
}
&:hover {
  .layer {
    display: block;
  }
}
// 骨架动画
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
