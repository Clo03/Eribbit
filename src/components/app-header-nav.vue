<template>
  <ul class="navs">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li v-for="item in list" :key="item.id" @mousemove="show(item)" @mouseleave="hide(item)">
      <RouterLink :to="`/category/${item.id}`" @click="hide(item)">{{item.name}}</RouterLink>
      <div class="layer" :class={open:item.open}>
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    // 计算属性呈现{{$store.state.category.list}}数据
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    // 跳转的时候不会关闭二级类目，通过数据来控制
    // 1. vuex每个分类加上open数据
    // 2. vuex提供显示和隐藏函数，修改open数据
    // 3．在组件中使用vuex中的函数，使用事件来绑定，提供一个类名显示/隐藏
    const show = item => {
      store.commit('category/show', item.id)
    }
    const hide = item => {
      store.commit('category/hide', item.id)
    }
    return { list, show, hide }
  }
}
</script>
<style scoped lang="less">
.navs {
  z-index: 999;
  position: relative;
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  // .layer中的li和a会覆盖.navs中的li和a 加上>选择该元素后面的第一代子元素
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    // 指的是上一层css的样式 等同于a :hover
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // 显示二级类目
      // > .layer {height: 132px;opacity: 1;} 只能控制两种情况 先鼠标点击和滑入滑出事件都需要使用
    }
  }
}
// 二级类目弹层
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
