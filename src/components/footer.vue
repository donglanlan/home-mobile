<template>

  <div>
    <tabbar slot="bottom">
      <tabbar-item :selected="$route.path==='/events'"
        link="/events">
        <svg-icon slot="icon"
          icon-class="notify" />
        <span slot="label">布控通知</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path==='/infoManage'"
        link="/infoManage">
        <svg-icon slot="icon"
          icon-class="msg" />
        <span slot="label">信息管理</span>
      </tabbar-item>
      <svg-icon @click.native="selectDoor"
        class="icon-key"
        icon-class="key" />
      <tabbar-item :selected="$route.path==='/defence'"
        link="/defence">
        <svg-icon slot="icon"
          icon-class="defence" />
        <span slot="label">布控设置</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path==='/community'"
        link="/community">
        <svg-icon slot="icon"
          icon-class="community" />
        <span slot="label">小区管理</span>
      </tabbar-item>
    </tabbar>

    <!-- 门禁列表 -->
    <x-dialog v-model="dialogVisible"
      hide-on-blur>
      <div class="scroll">
        <scroll>
          <checker v-model="doorCheck"
            type="radio"
            radio-required
            default-item-class="check-item"
            selected-item-class="check-item-selected">
            <checker-item :value="item.id"
              v-for="(item, index) in doorList"
              :key="index">
              <div class="circle">
                <div class="inner"></div>
              </div>
              <span>{{item.equName}}</span>
            </checker-item>
          </checker>
        </scroll>
      </div>
      <div class="confirm">
        <div class="cannel"
          @click="dialogVisible=false">取消</div>
        <div class="ensure"
          @click="openDoor">确定</div>
      </div>
    </x-dialog>

  </div>

</template>

<script>
import { Tabbar, TabbarItem, XDialog, Checker, CheckerItem } from 'vux'
import { mapGetters } from 'vuex'
import { Load } from '@/utils/msg'
import { findEqus, open } from '@/api/equ/equ'

export default {
  name: '',
  components: {
    Tabbar,
    TabbarItem,
    XDialog,
    Checker,
    CheckerItem
  },
  data() {
    return {
      dialogVisible: false,
      doorCheck: '',
      doorList: null
    }
  },
  methods: {
    selectDoor() {
      Load.show('加载中...')
      this.doorCheck = ''
      findEqus(this.checkedEqu.value)
        .then(response => {
          this.dialogVisible = true
          this.doorList = response
        })
    },
    openDoor() {
      this.dialogVisible = false
      open('DNAKEDOOR_OPEN', this.doorCheck, this.userInfo.userName)
        .then(response => {
          console.log(response)
        })
    }
  },
  created() { },
  computed: {
    ...mapGetters([
      'checkedEqu',
      'userInfo'
    ])
  }
}
</script>

<style lang='less' scoped>
.svg-icon {
  font-size: 18px;
  margin-bottom: 6px;
}
.icon-key {
  height: 60px;
  font-size: 60px;
  position: relative;
  bottom: 10px;
  color: @theme-color;
  border-radius: 50%;
  background-color: #fff;
  transition: all ease 0.5s;
  &:active {
    transform: scale(1.1);
  }
}

// vux弹窗样式
.vux-checker-item {
  display: flex;
  height: 46px;
  align-items: center;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  &:last-of-type {
    border-bottom: none;
  }
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
  border-top: 1px solid #f2f2f2;
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
.scroll {
  height: 376px;
}
</style>