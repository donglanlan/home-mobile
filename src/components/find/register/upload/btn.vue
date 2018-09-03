<template>
  <div class="cube-upload-btn">
    <slot>
      <div class="cube-upload-btn-def">
        <i></i>
      </div>
    </slot>
    <input class="cube-upload-input"
      type="button"
      @click="clickUpload">
  </div>
</template>
<script>
import { getFile } from '@/utils/utilCordova'
import { Msg } from '@/utils/msg'

const COMPONENT_NAME = 'cube-upload-btn'

export default {
  name: COMPONENT_NAME,
  methods: {
    clickUpload(e) {
      // 获取相册
      window.ImagePicker.getPictures((result) => {
        // 读取文件
        /* for (let i = 0; i < result.length; i++) {
          getFile('file://' + result[i], (fileEntry) => {
            alert(fileEntry)
            this.$parent.addFileEntry(fileEntry)
          }, (err) => {
            Msg.error('读取文件失败：' + err.code)
          })
        } */
        getFile('file://' + result.images[0].path, (fileEntry) => {
          this.$parent.addFileEntry(fileEntry)
        }, (err) => {
          Msg.error('读取文件失败：' + err.code)
        })
      }, (err) => {
          Msg.error('相册调用失败：' + err)
        }, { maximumImagesCount: 9, width: 480, height: 360, quality: 80 })
    }
  }
}
</script>

<style lang="less" scoped>
.cube-upload-btn {
  position: relative;
  overflow: hidden;
}

.cube-upload-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  font-size: 0;
  opacity: 0;
}

.cube-upload-btn-def {
  position: relative;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border-radius: 2px;
  i {
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 2px;
      transform: translate(-50%, -50%);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
}
</style>