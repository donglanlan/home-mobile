<template>
  <div class="community">

    <home-header title="小区管理"
      :backFlag="false"></home-header>
    <div class="bg">
      <div class="infoCard">
        <img src="../../static/image/test2.png"
          ref="head_image">
        <input class="image_file"
          @change="readAsDataURL"
          ref="image_file"
          type="file"
          accept="image/*">
        <p class="name">{{userInfo.realName.slice(0, 1) + '警官'}}</p>
        <p class="tel">{{userInfo.cellPhone}}</p>
        <div class="toggle">
          <span>{{checkedEqu.name}}</span>
          <span class="modify"
            @click="dialogVisible=true">修改</span>
        </div>
      </div>
    </div>

    <div class="content">
      <group>
        <cell class="info"
          title="基本信息"
          :link="{path: '/communityInfo', query: {id: checkedEqu.value}}"
          is-link>
          <svg-icon slot="icon"
            icon-class="basicInfo"
            class="icon" />
        </cell>
        <cell class="info"
          title="重点人员"
          :link="{path: '/keyPerson', query: {id: checkedEqu.value}}"
          is-link>
          <svg-icon slot="icon"
            icon-class="keyPerson"
            class="icon" />
        </cell>
        <cell class="info"
          title="问题反馈"
          is-link
          :link="{path: '/feedback'}">
          <svg-icon slot="icon"
            icon-class="feedback"
            class="icon" />
        </cell>
        <cell class="info"
          title="关于我们"
          is-link
          :link="{path: '/about'}">
          <svg-icon slot="icon"
            icon-class="about"
            class="icon" />
        </cell>
      </group>
      <group>
        <cell class="info"
          title="退出账号"
          is-link
          @click.native="confirmVisible=true">
          <svg-icon slot="icon"
            icon-class="loginout"
            class="icon" />
        </cell>
      </group>
    </div>

    <foot-guide></foot-guide>

    <!-- 选择小区 -->
    <x-dialog v-model="dialogVisible"
      hide-on-blur>
      <checker v-model="communityCheck"
        type="radio"
        radio-required
        default-item-class="check-item"
        selected-item-class="check-item-selected">
        <checker-item :value="item"
          v-for="(item, index) in equs"
          :key="index">
          <div class="circle">
            <div class="inner"></div>
          </div>
          <span>{{item.name}}</span>
        </checker-item>
        <div class="confirm">
          <div class="cannel"
            @click="cancel">取消</div>
          <div class="ensure"
            @click="communityChange">确定</div>
        </div>
      </checker>
    </x-dialog>

    <!-- 退出账号 -->
    <confirm v-model="confirmVisible"
      @on-confirm="loginOut">
      <p>确定退出当前账号吗？</p>
    </confirm>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import footGuide from '@/components/footer'
import {
  Group,
  Cell,
  XDialog,
  Checker,
  CheckerItem,
  Confirm
} from 'vux'
import { Load, Msg } from '@/utils/msg'
import { getUserDetail } from '@/api/mgr/user'
import { getEquGroups } from '@/api/equ/equ'
import { FedLogOut } from '@/api/login'
import { getName } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'community',
  components: {
    homeHeader,
    footGuide,
    Group,
    Cell,
    XDialog,
    Checker,
    CheckerItem,
    Confirm
  },
  data() {
    return {
      dialogVisible: false,
      communityCheck: null,
      tempValue: null,
      confirmVisible: false,
      communitys: ''
    }
  },
  methods: {
    readAsDataURL(type) {
      let file = this.$refs.image_file.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.$refs.head_image.src = e.target.result
      }
    },
    cancel() {
      this.dialogVisible = false
      this.communityCheck = this.checkedEqu
    },
    communityChange() {
      this.dialogVisible = false
      this.$store.commit('SET_CHECKEDEQU', this.communityCheck)
    },
    loginOut() {
      this.$store.dispatch('FedLogOut')
        .then(() => {
          this.$router.push({ path: '/login' })
        }).catch(err => {
          Msg.error('操作失败！')
        })
    }
  },
  created() {
    this.communityCheck = this.checkedEqu
  },
  computed: {
    ...mapGetters([
      'equs',
      'checkedEqu',
      'userInfo'
    ])
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/mixin';

.community {
  height: 100%;
}
.bg {
  height: 130px;
  background-color: @theme-color;
  position: relative;
  .infoCard {
    height: 164px;
    margin: 0 18px;
    padding: 0 18px;
    border-radius: 7px;
    text-align: center;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 999;
    color: #2e2e2e;
    display: flex;
    flex-direction: column;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .image_file {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    .name {
      margin: 53px 0 8px;
    }
    .tel {
      font-size: 15px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f2f2f2;
    }
    .toggle {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      .modify {
        font-size: 15px;
        color: #898989;
      }
    }
  }
}
.content {
  top: 194px;
  padding-top: 104px;
  color: #2e2e2e;
  .weui-cells {
    .weui-cell {
      padding: 15px 18px;
      font-size: 15px;
    }
  }
  .info {
    background-color: #ebebeb;
    .icon {
      margin-right: 10px;
      font-size: 17px;
    }
  }
}

// vux弹窗样式
.vux-checker-item {
  display: flex;
  height: 46px;
  align-items: center;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  .circle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin: 0 15px;
    box-sizing: border-box;
  }
}
.check-item {
  .circle {
    border: 1px solid #bfbfbf;
  }
}
.check-item-selected {
  .circle {
    border: 1px solid @theme-color;
    .inner {
      width: 12px;
      height: 12px;
      margin: 2px;
      border-radius: 50%;
      background-color: @theme-color;
    }
  }
}
.confirm {
  height: 48px;
  display: flex;
  color: #333;
  .cannel,
  .ensure {
    flex: 1;
    height: 48px;
    line-height: 48px;
  }
  .cannel {
    border-right: 1px solid #f2f2f2;
  }
}
</style>