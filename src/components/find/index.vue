<template>
  <div class="find">

    <home-header ref="header" title="发现"></home-header>

    <div class="content" @click="change">
      <group>
        <cell title="事件" :link="{path: '/events'}">
          <svg-icon slot="icon" class="events" icon-class="events" />
        </cell>
      </group>
      <group>
        <cell title="扫一扫" is-link>
          <svg-icon slot="icon" class="camera" icon-class="scan" />
        </cell>
        <cell title="拍一拍" :link="{path: '/register'}">
          <svg-icon slot="icon" class="camera" icon-class="camera" />
        </cell>
      </group>
      <group>
        <cell title="搜一搜" :link="{path: '/search'}">
          <svg-icon slot="icon" class="search" icon-class="search" />
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
    change() {
      this.$refs.header.changeFlag()
    }
  },
  created() { }
}
</script>

<style lang='less' scoped>
.svg-icon {
  margin-right: 10px;
}
.events {
  color: #19AE16;
}
.camera {
  color: #09AFFF;
}
.search {
  color: #FC4F55;
}
</style>