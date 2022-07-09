<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: '',
  props: {
    value: Number
  },
  data () {
    return {
      columns: ['男', '女'],
      currentValue: this.value
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async  onConfirm (value, index) {
      await updateUserProfile({ gender: this.value })
      // 提示成功
      this.$toast.success('修改成功')
      this.$emit('input', this.currentValue)
      this.$emit('close')
    },
    onChange (picker, value, index) {
      this.currentValue = index
    },
    onCancel () {
      this.$emit('close')
    }

  }
}
</script>

<style lang="less" scoped>
</style>
