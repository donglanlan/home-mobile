<template>
  <div class="about">
    <home-header title="关于"></home-header>
    <div class="subContent">
      <div class="icon"></div>
      <div class="title">智慧小区</div>
      <span class="version">v1.0.0</span>
      <x-button class="checkBtn"
        type="primary"
        @click.native="show2=true">检查更新</x-button>

      <toast v-model="show2"
        type="text"
        position="bottom">已是最新版本</toast>
      <confirm v-model="show"
        :show-cancel-button="false"
        :show-confirm-button="false"
        title="版本更新">
        <p style="textAlign: left">1. 增加新功能</p>
        <p style="textAlign: left">1. 增加新功能</p>
        <div class="btnBox">
          <x-button class="btn cannel"
            @click.native="show=false">取消</x-button>
          <x-button class="btn"
            type="primary">更新</x-button>
        </div>
      </confirm>
    </div>
  </div>

</template>

<script>
import homeHeader from '@/components/homeHeader'
import { XButton, Toast, Confirm } from 'vux'

export default {
  name: '',
  components: {
    homeHeader,
    XButton,
    Toast,
    Confirm
  },
  data() {
    return {
      show2: false,
      show: false
    }
  },
  methods: {},
  created() { }
}
</script>

<style lang='less' scoped>
.about {
  height: 100%;
  .subContent {
    text-align: center;
    font-size: 15px;
    color: #383838;
    .icon {
      width: 74px;
      height: 74px;
      border-radius: 12px;
      margin: 90px auto 12px;
      background-color: #fff;
    }
    .title {
      margin-bottom: 8px;
    }
    .checkBtn {
      width: 127px;
      margin-top: 145px;
    }
    .btnBox {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .btn {
        margin: 0;
        width: 109px;
        height: 35px;
        font-size: 14px;
        border-radius: 17px;
      }
      .cannel {
        background-color: #f2f2f2;
        color: #787878;
      }
    }
  }
}
</style>