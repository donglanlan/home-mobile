<template>

  <div class="homeHeader">
    <div class="head-wrapper">

      <div class="back" v-if="backFlag"
        @click="goBack">
        <svg-icon icon-class="back" />
      </div>

      <span>{{title}}</span>

      <div class="scan"
        v-if="scanFlag" @click="scanCode">
        <svg-icon icon-class="scan" />
        <p>扫一扫</p>
      </div>

      <div class="add" v-if="addFlag" @click="$router.push('/register')">
        <svg-icon icon-class="add" />
      </div>

    </div>
  </div>

</template>

<script>

export default {
  name: '',
  props: {
    title: '',
    backFlag: {
      type: Boolean,
      default: true
    },
    scanFlag: {
      type: Boolean,
      default: false
    },
    addFlag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scanCode() {
      window.cordova.plugins.barcodeScanner.scan(result => {
        this.peopleInfo.policeRoomId = result.text.split(',')[0]
        this.location = result.text.split(',')[1]
      }, error => {
        Msg.error('调用失败 :' + error.code)
      }, {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: false, // Android, save scan history (default false)
          prompt: '将二维码放入框内', // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          // formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
          // orientation: 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
  }
}
</script>

<style lang='less' scoped>
.scan {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  line-height: 20px;
  p {
    font-size: 10px;
  }
}
.add {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 18px;
}
</style>