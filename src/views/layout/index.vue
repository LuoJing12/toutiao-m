<template>
  <div>
    <keep-alive>
<router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <van-tabbar route>
      <van-tabbar-item to="/home">
      <i slot="icon" class='toutiao toutiao-shouye'></i>
      <span class="text" >首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
      <i slot="icon" class='toutiao toutiao-shipin'></i>
      <span class="text">视频</span></van-tabbar-item>
      <van-tabbar-item to="/qa">
       <i slot="icon" class='toutiao toutiao-wenda'></i>
      <span class="text">问答</span>
     </van-tabbar-item>
      <van-tabbar-item to="/my">
       <i slot="icon" class='toutiao toutiao-wode'></i>
      <span class="text">{{token?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['token'])
  }
}
</script>

<style lang="less">
i.toutiao {
  font-size: 40px;
}
span.text {
  font-size: 20px;
}
</style>
