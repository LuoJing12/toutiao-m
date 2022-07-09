<template>
  <div class='article-list' ref="listRef">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshTip"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import ArticleItem from '@/components/article-item.vue'
export default {
  name: '',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      error: false,
      refreshing: false,
      refreshTip: ''
    }
  },
  components: { ArticleItem },
  activated () {
    console.log('actived')
    // this.$refs.listRef.scrollTop = localStorage.scrollTop || 0
  },
  deactivated () {
    console.log('deactived')
  },
  created () {},
  mounted () {
    this.$refs.listRef.onscroll = function () {
      // localStorage.scrollTop = this.scrollTop
    }
  },

  methods: {
    async  onLoad () {
      try {
        const { data: { data: { results, pre_timestamp: timestamp } } } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp
        })

        // 加载状态结束
        this.list.push(...results)
        this.timestamp = timestamp
        this.loading = false
        // 数据全部加载完成
        if (timestamp == null || results.length === 0) {
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
    async onRefresh () {
      try {
        const { data: { data: { results } } } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // 模拟错误
        JSON.parse('{username:"zs"}')
        this.list.unshift(...results)
        this.refreshing = false
        this.refreshTip = '刷新成功'
      } catch (e) {
        this.refreshing = false
        this.refreshTip = '刷新失败'
      }
      // 清空列表数据
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
