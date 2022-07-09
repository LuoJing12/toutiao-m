<template>
  <div id="app">
    <div id="box"></div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
</script>
<style lang="less">
</style>
