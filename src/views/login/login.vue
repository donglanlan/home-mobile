<template>
  <div class="login">
    <div class="user-wrapper">
      <x-input v-model="loginForm.username"
        type="text"
        placeholder="请输入用户名"
        ref="userName"
        @on-enter="login">
        <svg-icon slot="label"
          icon-class="me"
          style="marginRight: 10px" />
      </x-input>
      <x-input v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        ref="userPwd"
        @on-enter="login">
        <svg-icon slot="label"
          icon-class="password"
          style="marginRight: 10px" />
      </x-input>
      <a href="javascript:;"
        class="weui-btn"
        ref="login"
        @click="login">登录</a>
    </div>
  </div>
</template>

<script>
import { XInput } from 'vux'
import { Load, Msg } from '@/utils/msg'
import { getUserDetail } from '@/api/mgr/user'

export default {
  name: 'login',
  components: {
    XInput
  },
  data() {
    return {
      loginForm: {
        username: 'ljy',
        password: '123'
      },
      flag: false
    }
  },
  methods: {
    async login({ commit }) {
      if (!this.loginForm.username.trim()) {
        Msg.error('请填写用户名')
        return
      }
      if (!this.loginForm.password.trim()) {
        Msg.error('请填写密码')
        return
      }
      // 判断登录的账号是否是民警角色
      await getUserDetail(this.loginForm.username)
        .then(response => {
          this.flag = response.roleIds.some(item => {
            return item === 'police'
          })
        })
      if (this.flag) {
        this.$store.dispatch('LoginByUsername', this.loginForm)
          .then(() => {
            this.$router.push({ path: '/' })
          }).catch(err => {
            Msg.error('用户名或密码错误！')
          })
      } else {
        this.loginForm.username = ''
        this.loginForm.password = ''
        Msg.error('不是民警账号，请重新登录')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin';

.login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: @theme-color;
  color: #fff;
  .user-wrapper {
    width: 70%;
    margin: 100px auto 0;
    .weui-cell {
      margin-top: 40px;
      border-bottom: 1px solid @theme-color;
      &::before {
        display: none;
      }
    }
    a {
      display: block;
      margin-top: 60px;
      background-color: #fff;
      color: @theme-color;
      border-radius: 20px;
    }
  }
}
</style>




