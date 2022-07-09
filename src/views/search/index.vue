<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      background="#3296FA"
      @focus="isResultShow = false"
    />
    <search-result v-if="isResultShow" :search-text="value"></search-result>
    <search-suggest
      :search-text="value"
      v-else-if="value"
      @search="onSearch"
    ></search-suggest>
    <search-history v-else :searchHistories="searchHistories"></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggest from './components/search-suggest.vue'
export default {
  name: '',
  props: {
  },
  data () {
    return {
      value: '',
      isResultShow: false,
      searchHistories: JSON.parse(localStorage.searchHistories || '[]')
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  },
  created () {},
  mounted () {},
  watch: {
    searchHistories (val) {
      localStorage.searchHistories = JSON.stringify(val)
    }
  },
  methods: {

    onCancel () {
      console.log('quxiao')
      this.$router.back()
    },
    onSearch (val) {
      if (val.trim() === '') return
      this.value = val
      const index = this.searchHistories.findIndex(t => t === val)
      if (index !== -1) this.searchHistories.splice(index, 1)
      this.searchHistories.unshift(val)
      this.isResultShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
</style>
