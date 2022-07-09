<template>
  <div>
    <van-cell :title="item.aut_name">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="item.aut_photo"
      />
      <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636">{{ item.content }}</p>
        <p>
          <span style="margin-right: 10px">{{ item.pubdate }}</span>
          <van-button
            size="mini"
            type="default"
            @click="atrticleIndex.onReplayShow(item)"
            >回复</van-button
          >
        </p>
      </div>
      <van-icon
        slot="right-icon"
        :name="item.is_liking ? 'like' : 'like-o'"
        :color="item.is_liking ? 'red' : '#323233'"
        @click="onLikeClick"
      />
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/article-comment'
export default {
  name: '',
  props: {
    item: Object
  },
  inject: ['atrticleIndex'],

  data () {
    return {
      isLikeLaoding: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onLikeClick () {
      if (this.isLikeLaoding) return
      this.isLikeLaoding = true
      if (this.item.is_liking) {
        await addCommentLike(this.item.com_id)
      } else {
        await deleteCommentLike(this.item.com_id)
      }
      this.item.is_liking = !this.item.is_liking
      this.isLikeLaoding = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
