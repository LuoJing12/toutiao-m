<template>
  <div>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search.js'
export default {
  name: '',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async  onLoad () {
      const res = await getResult({
        page: this.page,
        par_page: 10,
        q: this.searchText
      })

      this.list.push(...res.data.data.results)
      this.page++
      this.loading = false
      if (res.data.data.results.length === 0) {
        this.finished = true
      }

      // 异步更新数据

      // 加载状态结束

      // 数据全部加载完成
    }
  }

}
</script>

<style lang="less" scoped>

</style>
