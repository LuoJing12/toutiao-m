<template>
  <div>
    <van-cell title="搜索历史">
      <template v-if="isEdit">
        <span style="margin-right: 10px" @click="searchHistories.splice(0)"
          >全部删除</span
        >
        <span @click="isEdit = false">完成</span>
      </template>
      <van-icon v-else name="delete-o" @click="isEdit = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="
        () => {
          if (isEdit) {
            searchHistories.splice(index, 1);
          }
        }
      "
    >
      <van-icon v-if="isEdit" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isEdit: false
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
</style>
