<template>
<div>
      <van-icon
      :color="value===1?'#e5645f':'#777'"
      :name="value===1?'good-job':'good-job-o'"
      @click ="onClick"
      style="font-size:24px"
      ></van-icon>
</div>
</template>

<script>
import { addLike, deleteLike } from '@/api/user'
export default {
  name: 'likeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
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
      if (this.value === 1) {
        await deleteLike(this.articleId)
        this.$emit('input', 0)
      } else {
        await addLike(this.articleId)
        this.$emit('input', 1)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
