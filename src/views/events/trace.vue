<template>
  <div class="trace">

    <home-header title="历史轨迹"></home-header>

    <div class="subContent">
      <tab custom-bar-width="40px">
        <tab-item selected
          @click.native="name='trace1'">今日</tab-item>
        <tab-item @click.native="name='trace2'">7天内</tab-item>
        <tab-item @click.native="name='trace3'">30天内</tab-item>
      </tab>
      <keep-alive>
        <component :is="name"
          :id="id"></component>
      </keep-alive>
    </div>

  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import trace1 from './trace/trace1'
import trace2 from './trace/trace2'
import trace3 from './trace/trace3'
import { Tab, TabItem } from 'vux'

export default {
  name: '',
  components: {
    homeHeader,
    trace1,
    trace2,
    trace3,
    Tab,
    TabItem
  },
  data() {
    return {
      id: this.$route.params.id,
      index: 0,
      name: 'trace1'
    }
  }
}
</script>

<style lang='less' scoped>
</style>