<template>
  <div>
<van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"

  @cancel="onCancel"
  @confirm="onConfirm"
/>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
// import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateBirthday',
  props: {
    value: String
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async  onConfirm (value, index) {
      const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({ birthday })
      // 提示成功
      this.$toast.success('修改成功')
      this.$emit('input', birthday)
      this.$emit('close')
    },

    onCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
