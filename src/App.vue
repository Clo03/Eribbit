<template>
  <!-- vue2.0需要根元素，vue3.0可以是代码片段 Fragment -->
  <div>小兔仙</div>
  <p>{{$store.state.user.profile}}</p>
  <button @click="$store.commit('user/setUser',{ id: '1',avater: '1',nickname: '1',account: '1',mobile: '1',token: '1'})">修改用户信息</button>
</template>

<script>
</script>

<style lang="less">
</style>
