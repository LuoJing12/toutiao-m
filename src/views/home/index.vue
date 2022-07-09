<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        icon="search"
        class="search-btn"
        round
        type="info"
        size="small"
        slot="title"
        @click="$router.push('/search')"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        v-for="(item, index) in channels"
        :key="index"
        :title="item.name"
      >
        <article-list :channel="item" :active="active"></article-list>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :channels="channels"
        :active="active"
        @add="channels.push($event)"
        @updata-active="handleUpdataActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/chennels'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'

export default {
  components: {
    ArticleList,
    ChannelEdit

  },
  name: '',
  data () {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },

  async created () {
    const res = await getUserChannels()
    if (this.$store.state.token) {
      // 如果登录,发请求
      // console.log(res)
      this.channels = res.data.data.channels
    } else {
      // 没有登录,获取本地的channels
      try {
        this.channels = JSON.parse(localStorage.toutiao_channels)
      } catch (e) {
        this.channels = res.data.data.channels
      }
    }
  },
  mounted () {},
  methods: {
    handleUpdataActive (index, isShow = false) {
      this.active = index
      this.show = isShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 172px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
}

.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
  }
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    width: 100%;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__nav {
    padding: 0;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>
