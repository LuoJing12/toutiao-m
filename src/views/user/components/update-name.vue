<template>
  <div>
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="onCancel"
      @click-right="onConfirm"
    />
    <div class="box">
      <van-field
        v-model.trim="message"
        rows="3"
        autosize
        type="textarea"
        placeholder="请输入昵称"
        maxlength="7"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: '',
  props: {
    value: String
  },
  data () {
    return {
      //! 不能直接改v-model的value值,用data或者computed来接受修改

      message: this.value
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    onCancel () {
      //! 重置数据方式1-单个重置
    //   this.message = this.value
      this.$emit('close')
    },
    async  onConfirm () {
      // 非空判断
      if (this.message.length === 0) return
      await updateUserProfile({ name: this.message })
      // 提示成功
      this.$toast.success('修改成功')
      // 修改数据
      this.$emit('input', this.message)
      // 关闭弹层
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup{
  background-color: #f5f7f9 !important;
}
.box{
    padding: 20px;
}
</style>
