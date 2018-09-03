<template>
  <div class="register2">
    <home-header title="基本信息"></home-header>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <group>
            <x-input title="手机号"
              placeholder="请输入手机号"
              placeholder-align="right"
              label-width="70px"
              v-model="info2.phone"></x-input>
            <popup-picker title="学历"
              :data="dics['edu']"
              confirm-text="确定"
              v-model="info2.edu"></popup-picker>
            <x-input title="工作单位"
              placeholder="请输入工作单位"
              placeholder-align="right"
              label-width="70px"
              v-model="info2.workunit"></x-input>
          </group>
          <group>
            <x-input title="车牌号码"
              placeholder="请输入车牌号码"
              placeholder-align="right"
              label-width="70px"
              v-model="info2.carNum"></x-input>
            <x-input title="车辆品牌"
              placeholder="请输入车辆品牌"
              placeholder-align="right"
              label-width="70px"
              v-model="info2.carBrand"></x-input>
            <x-input title="车辆型号"
              placeholder="请输入车辆型号"
              placeholder-align="right"
              label-width="70px"></x-input>
          </group>

          <x-button type="primary"
            class="next">下一步，刷个脸吧</x-button>

        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { Group, XInput, XButton, PopupPicker } from 'vux'

const form = {
  phone: '',
  edu: [],
  workunit: '',
  carNum: '',
  carBrand: ''
}

export default {
  name: '',
  components: {
    homeHeader,
    Group,
    XInput,
    XButton,
    PopupPicker
  },
  data() {
    return {
      info2: Object.assign({}, form),
      dics: {
        edu: [['小学', '初中', '高中', '大专', '本科', '研究生', '博士']]
      }
    }
  },
  methods: {},
  created() {
    // console.log(this.$route.query.info)
  }
}
</script>

<style lang='less' scoped>
.next {
  width: 225px;
  margin-top: 50px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
</style>