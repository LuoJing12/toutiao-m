<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/article-comment'
// import eventBus from '@/utils/eventBus'

export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: [String, Number],
    articleId: [String, Number]
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async  onPost () {
      if (this.message.trim() === '') { return }
      const res = await addComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId
      })
      console.log(res)
      //! 通过eventBus发送数据
      // eventBus.$emit('onPostSucess', res.data.data.new_obj)
      // 提示成功
      this.$toast.success('评论成功')
      // 关闭弹层
      this.$emit('sucess', res.data.data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
