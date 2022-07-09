<template>
  <div>
    <van-icon
      :color="value ? '#ffa500;' : '#777'"
      :name="value ? 'star' : 'star-o'"
      @click="onClick"
      style="font-size: 24px"
    />
  </div>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: '',
  props: {
    value: Boolean,
    articleId: [Number, String]
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
      if (this.value) {
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.isLoading = false
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
