<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <template v-else>
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="article.title">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{ article.aut_name }}</div>
            <div slot="label" class="publish-date">{{ article.pubdate }}</div>
            <!-- <follow-user
              :is-followed="article.is_followed"
              @update-isfollowed="article.is_followed = $event"
              :userId="article.aut_id"
            ></follow-user> -->
            <follow-user
              v-model="article.is_followed"
              :userId="article.aut_id"
            ></follow-user>
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content markdown-body"
            v-html="article.content"
            ref="contentRef"
          ></div>
          <van-divider>正文结束</van-divider>
          <article-comment
            :source="article.art_id"
            @set-total="totolComment = $event"
            ref="resList"
          >
          </article-comment>
        </div>
        <!-- /加载完成-文章详情 -->
        <template v-else>
          <!-- 加载失败：404 -->
          <div class="error-wrap" v-if="errorStatus === 404">
            <van-icon name="failure" />
            <p class="text">该资源不存在或已删除！</p>
          </div>
          <!-- /加载失败：404 -->

          <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
          <div class="error-wrap" v-else>
            <van-icon name="failure" />
            <p class="text">内容加载失败！</p>
            <van-button class="retry-btn" @click="getArticleDetail"
              >点击重试</van-button
            >
          </div>
          <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
        </template>
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="article.title">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totolComment" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <collect-article
        v-model="article.is_collected"
        :articleId="article.art_id"
      ></collect-article>
      <like-article
        v-model="article.attitude"
        :articleId="article.art_id"
      ></like-article>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <comment-post :target="article.art_id" @sucess="onSucess"></comment-post>
    </van-popup>

    <van-popup
      v-model="isRepalyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-replay
        @close="isRepalyShow = false"
        :comment="currentComment"
      ></comment-replay>
    </van-popup>
  </div>
</template>

<script>
//! 引入别人的css样式
import 'github-markdown-css/github-markdown.css'
import 'github-markdown-css/github-markdown-light.css'
import { ImagePreview } from 'vant'
import { getArticleDetail } from '@/api/article'
import FollowUser from '@/components/follow-user.vue'
import likeArticle from '@/components/like-article'
import CollectArticle from '@/components/collect-article.vue'
import ArticleComment from '@/views/article/components/article-comment.vue'
import commentPost from '@/views/article/components/comment-post'
import CommentReplay from './components/comment-replay.vue'
// ImagePreview({
//   // images: [
//   //   'https://img01.yzcdn.cn/vant/apple-1.jpg',
//   //   'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   // ],
//   // startPosition: 0
// })
export default {
  name: 'ArticleIndex',
  components: { FollowUser, likeArticle, CollectArticle, ArticleComment, commentPost, CommentReplay },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isLoading: true,
      //! 加载失败错误提示,用来判断显示加载失败情况
      errorStatus: '',
      totolComment: 0,
      isPostShow: false,
      isRepalyShow: false,
      currentComment: {}

    }
  },
  computed: {},
  watch: {},
  async created () {
    this.getArticleDetail()
  },
  provide () {
    return {
      atrticleIndex: this
    }
  },
  mounted () {},
  methods: {
    onReplayShow (item) {
      this.isRepalyShow = true
      this.currentComment = item
    },
    onSucess (item) {
      this.isPostShow = false
      //! 通过ref拿数据
      this.$refs.resList.list.unshift(item)
    },

    async getArticleDetail () {
      try {
        // if (Math.random() > 0.5) {
        //   throw new function (status) {
        //     this.response = { status }
        //   }(500)
        // }
        const res = await getArticleDetail(this.articleId)
        this.article = res.data.data
        this.isLoading = false
        //! 数据改变的时候不会立即渲染页面,需要异步操作
        this.$nextTick(() => {
          const images = []
          this.$refs.contentRef.querySelectorAll('img').forEach((e, i) => {
            images.push(e.src)
            e.onclick = () => {
              ImagePreview({
                images,
                startPosition: i
              })
            }
          })
        })
      } catch (e) {
        this.isLoading = false
        this.errorStatus = e.response.status
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
