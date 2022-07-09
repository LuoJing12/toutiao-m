<template>
  <div>
    <!-- //跳转页面,通过push(字符串) -->
    <van-cell
      :title="article.title"
      @click="$router.push('./article/' + article.art_id)"
    >
    <!-- //通过push(对象) -->
      <!-- 跳转页面,方式2-通过push(对象) -->
      <!-- <van-cell :title="article.title" @click="$router.push({name:'article', params: {articleId: article.art_id}})"> -->
      <!-- 情况1 没有图片 -->
      <!-- 情况2 有1张图片 -->
      <van-image
        slot="default"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        class="right-cover"
      ></van-image>
      <!-- 情况3 有3张图片 -->
      <div slot="label" v-if="article.cover.type === 3" class="cover-wrap">
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          :src="item"
        ></van-image>
      </div>
      <div slot="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {

  }
}
</script>

<style lang="less" scoped>
.van-cell__title {
  font-size: 32px;
  color: #3a3a3a;
}

.van-cell__value {
  flex: unset;
  width: 232px;
  height: 146px;
  padding-left: 25px;
}
.label-info-wrap span {
  font-size: 22px;
  color: #b4b4b4;
  margin-right: 25px;
}
.right-cover {
  width: 232px;
  height: 146px;
}
.cover-wrap {
  display: flex;
  .van-image {
    flex: 1;
    height: 146px;
  }
}
</style>
