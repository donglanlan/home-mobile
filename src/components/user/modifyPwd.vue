<template>
  <div class="modifyPwd">

    <div class="head-wrapper">
      修改密码
      <div class="back" @click="goBack">
        <svg-icon slot="icon" icon-class="back" />
        <span>返回</span>
      </div>
    </div>

    <div class="content">
      <group>
        <x-input title="输入原密码" type="password" v-model="oldPwd"></x-input>
      </group>
      <group>
        <x-input title="输入新密码" type="password" v-model="newPwd"></x-input>
      </group>
      <group>
        <x-input title="确认新密码" type="password" v-model="newPwd1"></x-input>
      </group>
      <x-button type="primary" class="btn" @click.native="handleUpdatePwd">确定</x-button>

      <div v-transfer-dom>
        <confirm v-model="show" :show-cancel-button="false">
          <p style="text-align:center;">{{promptMsg}}</p>
        </confirm>
      </div>

    </div>
  </div>
</template>

<script>
import { updatePwd } from '@/api/mgr/user'
import {
  Group,
  XInput,
  XButton,
  TransferDomDirective as TransferDom,
  Confirm
} from 'vux'
import { mapGetters } from 'vuex'
import { Msg } from '@/utils/msg'

export default {
  name: '',
  directives: {
    TransferDom
  },
  components: {
    Group,
    XInput,
    XButton,
    Confirm
  },
  data() {
    return {
      oldPwd: '',
      newPwd: '',
      newPwd1: '',
      show: false,
      promptMsg: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleUpdatePwd() {
      // 判断新密码两次输入是否一致
      if (this.newPwd !== this.newPwd1) {
        this.show = true
        this.promptMsg = '新密码两次输入不一致！'
        this.newPwd = ''
        this.newPwd1 = ''
        return
      } else {
        this.showFlag = false
      }
      // 不为空
      if(!this.oldPwd.trim()) {
        this.show = true
        this.promptMsg = '请输入旧密码！'
        return
      }
      if(!this.newPwd.trim()) {
        this.show = true
        this.promptMsg = '请输入新密码！'
        return
      }
      // 新旧密码不能相同
      if(this.newPwd === this.oldPwd) {
        this.show = true
        this.promptMsg = '新密码不能与原密码相同'
        return
      }
      updatePwd(this.name, this.oldPwd, this.newPwd)
        .then(response => {
          if (response.status === 200) {
            Msg.success(response.message)
            this.$router.push('/user')
          } else {
            this.show = true
            this.promptMsg = response.message
          }
          this.oldPwd = ''
          this.newPwd = ''
          this.newPwd1 = ''
        })
    }
  },
  created() { },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang='less' scoped>
.btn {
  margin-top: 20px;
  width: 94%;
}
</style>