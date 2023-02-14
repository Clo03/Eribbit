<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 通过 $slots.default 查看是否加入了默认插槽内容 -->
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>
<script>
// import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  // v-model :modelValue + @updata:modelValue
  props: {
    // modelValue默认的属性
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    /* 自己封装的逻辑方法 使用vueuse core
   const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      emit('updata:modelValue', checked)
    }
    // 侦听事件 监听父组件的modelValue赋值checked
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue
      },
      { immediate: true }
    )
    return { checked, changeChecked } */
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      // 通知父组件 data.value = 'foo' // emit('update:data', 'foo')
      const newValue = !checked.value
      checked.value = newValue
      emit('change', newValue)
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
