<template>
  <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item" :class="{fade:index===i}" v-for="(item,i) in sliders" :key="i">
        <RouterLink to="/">
          <img v-lazy="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span :class="{active:index===i}" v-for="(item,i) in sliders" :key="i" @click="index=i"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 控制轮播图的显示
    const index = ref(0)
    // 封装轮播图逻辑
    // 1.自动播放
    // 2.前后转换
    // 3.清除定时器
    let timer = null
    const autoPlayFn = () => {
      // 防止定时器重复添加
      timer = null
      timer = setInterval(() => {
        index.value++
        if (index.value === props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 需要监听sliders数据变化，判断如果有数据且autoPlay是true
    // 静态数据 立即执行 immediate
    watch(
      () => props.sliders,
      newValue => {
        if (newValue.length && props.autoPlay) {
          autoPlayFn()
        }
      },
      { immediate: true }
    )
    // 鼠标进入暂停离开开启自动播放（有开启条件)
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    const stop = () => {
      if (timer) {
        // timer = null
        clearInterval(timer)
      }
    }
    // 点击切换上一张 下一张
    const toggle = step => {
      index.value += step
      if (index.value === props.sliders.length) {
        index.value = 0
      }
      if (index.value < 0) {
        index.value = props.sliders.length - 1
      }
    }
    // 销毁定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index, timer, autoPlayFn, start, stop, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
