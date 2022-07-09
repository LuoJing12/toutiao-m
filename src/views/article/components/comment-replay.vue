<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? comment.reply_count + '条评论' : '暂无评论'
      "
    >
      <van-icon name="cross" slot="left" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <comment-item :item="comment"></comment-item>
    <van-cell title="全部回复"></van-cell>
    <article-comment
      type="c"
      :source="comment.com_id"
      ref="listRef"
    ></article-comment>

    <div class="footer">
      <van-button round @click="isPostShow = true">写评论</van-button>
    </div>
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <comment-post
        :target="comment.com_id"
        :articleId="atrticleIndex.articleId"
        @sucess="onSucess"
      ></comment-post>
    </van-popup>
  </div>
</template>

<script>
import ArticleComment from './article-comment.vue'
import CommentItem from './comment-item.vue'
import CommentPost from './comment-post.vue'
export default {
  name: '',
  props: {
    comment: Object
  },
  inject: ['atrticleIndex'],
  data () {
    return {
      isPostShow: false
    }
  },
  components: { CommentItem, CommentPost, ArticleComment },
  created () {},
  mounted () {},
  methods: {
    onSucess (item) {
      this.isPostShow = false
      this.$refs.listRef.list.unshift(item)
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  .van-button {
    width: 400px;
  }
  padding: 20px 0;
}
</style>
