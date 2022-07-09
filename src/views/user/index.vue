<template>
  <div>
    <van-nav-bar class="page-nav-bar" title="个人信息">
      <van-icon slot="left" name="cross" @click="$router.back()"> </van-icon>
    </van-nav-bar>
    <!-- 点击头像触发file的点击事件 -->
    <van-cell title="头像" is-link value="内容" @click="$refs.fileRef.click()">
      <van-image round fit="cover" class="avatar" :src="user.photo" />
    </van-cell>
    <!-- 文件选择 开始隐藏文件 -->
    <input type="file" ref="fileRef" hidden @change="onChangeFile" />
    <!-- <img :src="imgPath" > -->
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdateNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '女' : '男'"
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isUpdateBirthShow = true"
    >
    </van-cell>

    <van-popup
      v-model="isUpdateNameShow"
      position="top"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      ></update-name>
    </van-popup>

    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      ></update-gender>
    </van-popup>

    <van-popup v-model="isUpdateBirthShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthShow"
        v-model="user.birthday"
        @close="isUpdateBirthShow = false"
      ></update-birthday>
    </van-popup>

    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-if="isUpdatePhotoShow"
        :img-path="imgPath"
        @input="user.photo = $event"
        @close="isUpdatePhotoShow = false"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: '',
  props: {
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthShow: false,
      imgPath: undefined,
      isUpdatePhotoShow: false
    }
  },
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  async created () {
    const res = await getUserProfile()
    this.user = res.data.data
  },
  mounted () {},
  methods: {
    onChangeFile (e) {
      //! 文件blob地址
      this.imgPath = URL.createObjectURL(e.target.files[0])
      //! 让弹层显示出来
      this.isUpdatePhotoShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 60px;
  height: 60px;
}
</style>
