<template>

  <vue-drawer-layout ref="drawer">
    <div class="drawer-content"
      slot="drawer">
      <sidebar></sidebar>
    </div>
    <div slot="content">

      <div class="index">
        <div class="content-wrapper">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
        <tabbar slot="bottom">
          <tabbar-item selected
            link="/index">
            <svg-icon slot="icon"
              icon-class="home" />
            <span slot="label">小区</span>
          </tabbar-item>
          <tabbar-item link="/defence">
            <svg-icon slot="icon"
              icon-class="fang" />
            <span slot="label">布防</span>
          </tabbar-item>
          <tabbar-item link="/find">
            <svg-icon slot="icon"
              icon-class="find" />
            <span slot="label">发现</span>
          </tabbar-item>
          <tabbar-item link="/user">
            <svg-icon slot="icon"
              icon-class="me" />
            <span slot="label">我</span>
          </tabbar-item>
        </tabbar>
      </div>
    </div>
  </vue-drawer-layout>

</template>

<script type="text/ecmascript-6">
import { Tabbar, TabbarItem } from 'vux'
import sidebar from './sidebar'

export default {
  name: 'index',
  data() {
    return {
      flag: false
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    sidebar
  }
}
</script>

<style lang="less" scoped>
@import '../styles/mixin';

.index {
  height: 100%;
  .content-wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 55px;
  }
  .weui-tabbar {
    position: fixed;
    bottom: 0;
    background-color: #f5f5f7;
  }
  .svg-icon {
    font-size: 18px;
    margin-bottom: 6px;
  }
}
.drawer-content {
  height: 100%;
}
</style>




