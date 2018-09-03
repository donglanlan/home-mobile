<template>
  <div class="takePhoto">
    <home-header title="身份证拍照"></home-header>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <div class="tips">
            <p>仅用于审核</p>
            <p>拍摄时请确保身份证
              <span>边框完整、字迹清晰、亮度均衡</span>
            </p>
          </div>

          <div class="imgBox">
            <img src="../../static/image/card_front.png"
              ref="front_image">
            <p>点击开始识别正面&nbsp;
              <span>照片面</span>
            </p>
            <input type="file"
              name="image"
              accept="image/*"
              class="file_image"
              capture="camera"
              @change="readAsFrontDataURL"
              ref="front_file" />
          </div>

          <div class="imgBox">
            <img src="../../static/image/card_back.png"
              ref="back_image">
            <p>点击开始识别背面&nbsp;
              <span>国徽面</span>
            </p>
            <input type="file"
              name="image"
              accept="image/*"
              class="file_image"
              capture="camera"
              @change="readAsBackDataURL"
              ref="back_file" />
          </div>

          <!-- <ktt-upload @fileEntry-added="addFileEntry" frontFlag="true"></ktt-upload>
          <ktt-upload @fileEntry-added="addFileEntry" backFlag="true"></ktt-upload> -->

          <x-button type="primary"
            class="next"
            @click.native="next">下一步</x-button>

        </scroll>
      </div>
    </div>

  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { XButton } from 'vux'
import { Msg, Load } from '@/utils/msg'
import { recognize } from '@/api/community/person'

export default {
  name: '',
  components: {
    homeHeader,
    XButton
  },
  data() {
    return {
      file1: null,
      file2: null,
      wordsResult: null
    }
  },
  methods: {
    // 读取上传文件
    readAsFrontDataURL() {
      this.file1 = this.$refs.front_file.files[0]
      // 身份证正面识别
      let formData = new FormData()
      formData.append('file', this.file1)
      Load.show('加载中...')
      recognize('front', formData)
        .then(response => {
          if (!response.message) {
            // 识别正常
            this.wordsResult = response['words_result']
            // 图片显示
            let reader = new FileReader()
            reader.readAsDataURL(this.file1)
            reader.onload = e => {
              this.$refs.front_image.src = e.target.result
            }
          } else {
            Msg.error(response.message)
          }
        })
    },
    readAsBackDataURL() {
      this.file2 = this.$refs.back_file.files[0]
      // 身份证反面识别
      let formData = new FormData()
      formData.append('file', this.file2)
      Load.show('加载中...')
      recognize('back', formData)
        .then(response => {
          if (!response.message) {
            // 识别正常 图片显示
            let reader = new FileReader()
            reader.readAsDataURL(this.file2)
            reader.onload = e => {
              this.$refs.back_image.src = e.target.result
            }
          } else {
            Msg.error(response.message)
          }
        })
    },
    next() {
      if (!this.file1 || !this.file2) return
      this.$router.push({ path: '/register', query: { wordsResult: this.wordsResult } })
    }
  },
  created() { }
}
</script>

<style lang='less' scoped>
.tips {
  height: 60px;
  font-size: 14px;
  padding: 13px 15px;
  box-sizing: border-box;
  background-color: #ebebeb;
  color: #999;
  p {
    line-height: 18px;
    span {
      color: #666;
    }
  }
}
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
.next {
  width: 225px;
  margin-top: 40px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
</style>