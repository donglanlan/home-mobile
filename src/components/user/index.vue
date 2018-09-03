<template>
  <div class="user">

    <home-header ref="header" title="我"></home-header>

    <div class="content" @click="change">
      <group>
        <cell :title="userInfo.userName" link="/userDetail">
          <img slot="icon" class="userImg" :src="userInfo.userImg ? userInfo.userImg : '../community/error.jpg'" @error="imgError">
        </cell>
      </group>
      <group>
        <cell title="修改密码" :link="{path: '/modifyPwd'}">
          <svg-icon slot="icon" class="password" icon-class="password" />
        </cell>
      </group>
      <group>
        <cell title="退出登录" class="logOut" @click.native="logOut">
        </cell>
      </group>

    </div>

  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import {
  Group,
  Cell
} from 'vux'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: '',
  components: {
    homeHeader,
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
    change() {
      this.$refs.header.changeFlag()
    },
    logOut() {
      this.$store.dispatch('FedLogOut')
      this.$router.push('/login')
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
  display: block;
  width: 70px;
  margin-right: 20px;
}
.password {
  margin-right: 10px;
  color: #12adfa;
}
.img {
  width: 80px;
}
.logOut {
  text-align: center;
}
</style>