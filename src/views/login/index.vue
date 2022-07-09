<template>
  <div>

    <van-nav-bar class="page-nav-bar" title="标题" >
      <van-icon slot="left" name="cross" @click="$router.back()"> </van-icon>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="formRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入用户名"
        :rules="rules.mobile"
      >
        <!-- <template v-slot:left-icon>  -->
        <!-- <i class="toutiao toutiao-shouji"></i>
  </template> -->
        -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        placeholder="请输入密码"
        :rules="rules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="6*1000" format="ss秒" v-if="isCountDownShow" @finish="isCountDownShow=false"></van-count-down>
           <van-button v-else
          native-type="button"
          class="send-sms-btn"
          size="small"
          type="default"
          round
          @click="onSendCode"
          >获取验证码</van-button
        >
        </template>

      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user.js'

export default {
  name: 'LoginPage',
  components: {

  },
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请填写用户名' },
          { pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: '请填写正确的手机号' }
        ],
        code: [
          { required: true, message: '请填写密码' },
          { pattern: /^\d{6}$/ }
        ]
      },
      isCountDownShow: false
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async onSendCode () {
      try {
        await this.$refs.formRef.validate('mobile')
        console.log('校验成功')
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (e) {
        console.log(e)
        if (e.response && e.response.status === 429) {
          this.$toast('请稍后重试')
        } else {
          this.$toast('手机号码不正确')
        }
      }
    },
    async onSubmit (values) {
      try {
        // console.log('submit', values)
        const res = await login(values)
        // console.log(res)
        this.$store.commit('setToken', res.data.data.token)
        this.$toast.success('登录成功')
        this.$router.push('/')
      } catch (e) {
        console.error(e)
        if (e.response.status === 400) {
          this.$toast.fail('登录失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 172px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
