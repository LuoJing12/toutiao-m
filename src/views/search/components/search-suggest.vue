<template>
  <div>
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="$emit('search',item)"
    >
    <span v-html="highList(item)" slot="title"></span>

    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
// import { debounce } from 'lodash'
function debounce (callback, num) {
  let timer = null
  return function (val) {
    const that = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      callback.call(that, val)
    }, num)
  }
}
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
      list: []
      // timer: null
    }
  },
  components: {},
  async created () {

  },
  watch: {
    searchText: {
      // handler (val) {
      //   if (this.timer) clearTimeout(this.timer)
      // ! 注意await要与最近的函数async搭配使用
      //   this.timer = setTimeout(async () => {
      //     const res = await getSuggestion(val)
      //     this.list = res.data.data.options
      //   }, 500)
      // },
      //! 使用lodash防抖工具函数
      handler: debounce(async function (val) {
        const res = await getSuggestion(val)
        if (res.data.data.options[0] === null) {
          this.list = []
        } else {
          this.list = res.data.data.options
        }
      }, 500),
      immediate: true
    }
  },
  mounted () {},
  methods: {
    highList (item) {
      return item.replace(new RegExp(this.searchText, 'gi'),
        '<span style="color:#3296fa;">' + this.searchText + '</span>')
    }
  }

}
</script>

<style lang="less" scoped>
</style>
