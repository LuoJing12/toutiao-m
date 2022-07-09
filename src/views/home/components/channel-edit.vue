<template>
  <div class="channel-edit">
    <van-cell title="我的频道">
      <van-button round type="danger" size="small" plain @click="isEdit=!isEdit">{{isEdit?"完成":"编辑"}}</van-button>
    </van-cell>
    <van-grid :gutter="6">
      <van-grid-item
        v-for="(value,index) in channels"
        :key="index"

        :text="value.name"
        :class="{ active: index === active }"
        @click="handleDeleteMyChannel(index)"
      >
      <van-icon name="close" slot="icon" v-if="isEdit"></van-icon>
      </van-grid-item>
    </van-grid>
    <van-cell title="我的频道" />
    <van-grid :gutter="6">
      <van-grid-item v-for="(value,index) in recommendChannel" :key="index" icon="plus"
      :text="value.name"
      @click="handAddMyChannel(value)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, updataChannels } from '@/api/chennels'
export default {
  name: '',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    recommendChannel () {
      return this.allChannels.filter(t => {
        const f = this.channels.find(m => m.id === t.id)
        return !f
      })
    }
  },
  components: {},
  async created () {
    const res = await getAllChannels()
    this.allChannels = res.data.data.channels
  },
  mounted () {},
  methods: {
    async handAddMyChannel (item) {
      // this.$emit('add', item)
      this.channels.push(item)
    },
    async  handleDeleteMyChannel (index) {
      if (this.isEdit) {
        // 编辑模式删除
        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
        this.channels.splice(index, 1)

        // 更新channels
      } else {
        // 切换
        this.$emit('updata-active', index)
      }
    }
  },
  watch: {
    async channels (val) {
      // console.log('watch', val)
      // !根据有没有token来判断
      if (this.$store.state.token) {
        // 更新channels
        await updataChannels({ channels: this.channels })
      } else {
        localStorage.toutiao_channels = JSON.stringify(this.channels)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 80px;
}

.van-cell__title {
  font-size: 32px;
  color: #333;
}
.van-button--danger {
  width: 104px;
  height: 48px;
}
/deep/ .active {
  .van-grid-item__text {
    color: red;
  }
}

/deep/ .van-grid-item__content {
  .van-icon-plus {
    font-size: 28px;
    margin-right: 6px;
  }
.van-grid-item__icon-wrapper{
        position: unset;
  }
  .van-icon-close {
    position: absolute;
    top: -12px;
    right: -12px;
    font-size: 32px;
  }
   .van-grid-item__icon+.van-grid-item__text  {
    margin-top: 0 !important;
  }
  background-color: #f4f5f6;
  display: flex;
  flex-direction: row;
}
</style>
