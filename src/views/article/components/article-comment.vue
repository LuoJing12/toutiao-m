<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.aut_name">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px">{{item.pubdate}}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <comment-item v-for="(item,index) in list" :key="index" :item="item"></comment-item>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/article-comment'
import commentItem from './comment-item.vue'
// import eventBus from '@/utils/eventBus'
export default {
  components: { commentItem },
  name: 'ArticleComment',
  props: {
    source: [String, Number],
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: 1

    }
  },
  created () {
    //! 列表组件不在可视区域不会调用onLoad()方法

    this.onLoad()
    //! 通过eventBus拿到数据
    // eventBus.$on('onPostSucess', data => {
    //   this.list.unshift(data)
    // })
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data: { data: { last_id: offset, results, total_count: total } } } =
      await getComments({
        type: this.type,
        source: this.source,
        offset: null,
        limit: 10
      })
      // 追加数据
      this.offset = offset
      this.list.push(...results)
      this.$emit('set-total', total)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length === 0) {
        this.finished = true
      }
    }
  }

}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
