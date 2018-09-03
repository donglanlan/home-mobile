<template>
  <div class="login">
    <div class="user-wrapper">
      <x-input v-model="loginForm.username" type="text" placeholder="请输入用户名" ref="userName" @on-enter="login"></x-input>
      <x-input v-model="loginForm.password" type="password" placeholder="请输入密码" ref="userPwd" @on-enter="login"></x-input>
      <a href="javascript:;" class="weui-btn weui-btn_primary" ref="login" @click="login">登录</a>
    </div>
  </div>
</template>

<script>
import { XInput } from 'vux'
import { Load, Msg } from '@/utils/msg'
import { loginByUsername } from '@/api/login'

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
      }
    }
  },
  methods: {
    login({ commit }) {
      if (!this.loginForm.username.trim()) {
        Msg.error('请填写用户名')
        return
      }
      if (!this.loginForm.password.trim()) {
        Msg.error('请填写密码')
        return
      }
      this.$store.dispatch('LoginByUsername', this.loginForm)
        .then(() => {
          this.$router.push({ path: '/' })
          /* this.$store.dispatch('GetUserInfo')
            .then(() => {}) */
        }).catch(err => {
          Msg.error('用户名或密码错误！')
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/mixin';

.login {
  width: 100%;
  .user-wrapper {
    width: 92%;
    margin: 0 auto;
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
    }
  }
}
</style>




