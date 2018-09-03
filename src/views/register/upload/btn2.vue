<template>
  <!-- <div class="cube-upload-btn">
    <slot>
      <div class="cube-upload-btn-def">
        <i></i>
      </div>
    </slot>
    <input class="cube-upload-input"
      type="button"
      @click="clickUpload">
  </div> -->
  <!-- <div class="uploadPhoto">
    <svg-icon icon-class="camera" />
    <input class="upload-input"
      type="button"
      @click="clickUpload">
  </div> -->

  <div class="imgBox">
    <img src="../../../static/image/card_back.png"
      ref="front_image">
    <p>点击开始识别背面&nbsp;
      <span>国徽面</span>
    </p>
    <input type="button"
      class="file_image"
      @click="clickUpload" />
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
.imgBox {
  height: 163px;
  text-align: center;
  padding: 15px 0;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  .file_image {
    width: 174px;
    height: 100px;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  img {
    width: 174px;
    height: 100px;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    span {
      color: @theme-color;
    }
  }
}
</style>