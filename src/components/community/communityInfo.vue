<template>
  <div class="communityInfo">

    <sub-header :title="this.$route.params.title"></sub-header>

    <div class="content">
      <div class="community">
        <tab custom-bar-width="100px">
          <tab-item selected @on-item-click="onItemClick">重点人员</tab-item>
          <tab-item @on-item-click="onItemClick">小区基本情况</tab-item>
        </tab>
        <div class="scroll-wrapper">
          <keep-alive>
            <key-person v-if="checked===0" :id="id"></key-person>
            <census v-else :id="id"></census>
          </keep-alive>          
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import subHeader from '@/components/subHeader'
import { Tab, TabItem, Panel } from 'vux'
import keyPerson from './keyPerson'
import census from './census/census'

import { getKeyPerson } from '@/api/community/person'
import { Load } from '@/utils/msg'

export default {
  name: 'communityInfo',
  components: {
    subHeader,
    Tab,
    TabItem,
    Panel,
    keyPerson,
    census
  },
  data() {
    return {
      checked: 0,
      id: this.$route.params.id
    }
  },
  methods: {
    onItemClick(index) {
      this.checked = index
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    console.log(this.id)
  }
}
</script>

<style lang='less' scoped>
.scroll-wrapper {
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 0;
  .desc {
    color: #999;
    font-size: 14px;
    line-height: 25px;
  }
}
</style>