<template>
  <div class="userDetail">

    <div class="head-wrapper">
      个人信息
      <div class="back" @click="goBack">
        <svg-icon slot="icon" icon-class="back" />
        <span>返回</span>
      </div>
    </div>

    <div class="content">
      <group>
        <cell title="头像">
          <img slot class="userImg" :src="userInfo.userImg ? userInfo.userImg : '../community/error.jpg'" @error="imgError">
        </cell>
        <cell title="名字" :value="userInfo.userName"></cell>
        <cell title="手机号" :value="userInfo.cellPhone"></cell>
      </group>
      <group>
        <cell title="我的地址" :value="userInfo.address" primary="value"></cell>
      </group>
    </div>

  </div>
</template>

<script>
import {
  Group,
  Cell
} from 'vux'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: {
    Group,
    Cell
  },
  data() {
    return {}
  },
  methods: {
    imgError() {
      this.userInfo.userImg = require('../community/error.jpg')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style lang='less' scoped>
.userImg {
  width: 60px;
}
</style>