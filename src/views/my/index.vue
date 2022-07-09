<template>
  <div>
    <!-- 未登录 -->
    <div class="header not-login" v-if='!$store.state.token'>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 已登录 -->
    <div class="header login" v-else>
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round @click="$router.push('/user')">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{userInfo.art_count}}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>

    <van-grid column-num="2">
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link class='mt-10'/>
    <van-cell title="小智同学" is-link />
    <van-cell title="退出登录" is-link  class='mt-10 logout' v-if='$store.state.token' @click='onLogout'/>
  </div>
</template>

<script>
import { getuserInfo } from '@/api/user.js'
export default {
  name: '',
  data () {
    return {
      userInfo: {}
    }
  },
  components: {},
  async created () {
    if (this.$store.state.token) {
      const res = await getuserInfo()
      // console.log(res)
      this.userInfo = res.data.data
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '提示',
        message: '弹窗内容'
      }).then(() => {
        this.$store.commit('removeToken')
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background-image: url("~@/assets/banner.png");
  background-size: cover;
  &.not-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mobile-img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  .text {
    font-size: 28px;
    color: #fff;
  }
}

.base-info {
  height: 231px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 76px 32px 23px;
  .left {
    display: flex;
    align-items: center;
    .avatar {
      width: 132px;
      height: 132px;
      border: 4px solid #fff;
      margin-right: 23px;
    }
    .name {
      font-size: 30px;
      color: #fff;
    }
  }
}
.data-stats {
  display: flex;
  .data-item {
    height: 130px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .count {
      font-size: 36px;
    }
    .text {
      font-size: 23px;
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}
.mt-10 {
  margin-top: 10px;
}
.logout{
  text-align: center;
 color: #d86262;
}
</style>
