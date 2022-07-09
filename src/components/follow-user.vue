<template>
  <div>
       <van-button
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
              v-if="isFollowed"
              @click = "onClick"
              >已关注</van-button
            >
            <van-button v-else
              class="follow-btn"
              round
              size="small"
              @click = "onClick"
            >未关注</van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: '',
  //! 子组件修改默认v-model的默认规则
  model: {
    prop: 'isFollowed',
    event: 'update-isfollowed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      //! 防止重复点击
      isLoading: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onClick () {
      if (this.isLoading) return
      this.isLoading = true
      if (this.isFollowed) {
        await deleteFollow(this.userId)
        this.$emit('update-isfollowed', false)
      } else {
        await addFollow(this.userId)
        this.$emit('update-isfollowed', true)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
