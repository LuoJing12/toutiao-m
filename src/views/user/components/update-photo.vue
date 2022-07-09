<template>
  <div class="update-photo">
 <img :src="imgPath" ref="imgRef">
 <div class="footer">
    <div  @click="onCancel">取消</div>
    <div @click="onConfirm">完成</div>
 </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user'
let cropper
export default {
  name: '',
  props: {
    imgPath: [Object, String]
  },
  data () {
    return {

    }
  },
  components: {},
  created () {},
  mounted () {
    const image = this.$refs.imgRef
    cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false

    })
    console.log(cropper)
  },
  methods: {
    onCancel () {
      this.$emit('close')
    },
    onConfirm () {
      cropper.getCroppedCanvas().toBlob(async blob => {
        console.log(blob)
        const formData = new FormData()
        formData.append('photo', blob)
        const res = await updateUserAvatar(formData)
        this.$toast.success('修改成功')
        this.$emit('input', res.data.data.photo)
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: black;
  height: 100%;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 36px;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}
</style>
