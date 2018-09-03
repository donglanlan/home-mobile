<template>
  <div class="communityInfo">

    <home-header :title="checkedEqu.name"></home-header>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <group v-if="info">
            <cell title="小区名字">{{info.community.equName}}</cell>
            <cell title="小区编号">{{info.community.equMemo1}}</cell>
            <cell title="行政区域">{{info.community.equMemo2}}</cell>
            <cell title="小区地址">{{info.community.equMemo2}}</cell>
            <cell title="小区二维码"
              is-link
              @click.native="dialogVisible=true"></cell>
            <cell title="小区简介"
              is-link
              @click.native="$router.push({path: '/communityIntro', query: {id: id}})"></cell>
          </group>
          <group v-if="info">
            <cell title="楼栋数">{{info.buildingNum}}</cell>
            <cell title="单元数">{{info.unitNum}}</cell>
            <cell title="实有房屋数">{{info.houseNum}}</cell>
            <cell title="入住户数">{{info.useHouseNum}}</cell>
            <cell title="现有人口数">{{info.personNum}}</cell>
          </group>
        </scroll>
      </div>
    </div>

    <x-dialog v-model="dialogVisible"
      hide-on-blur>
      <!-- <img src="../../static/image/QR-code.jpg"> -->
      <img v-if="info" :src="info.community.equMemo4">
    </x-dialog>

  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { Group, Cell, XDialog } from 'vux'
import { mapGetters } from 'vuex'

import { Load } from '@/utils/msg'
import { getCommunityInfo } from '@/api/equ/equ'

export default {
  name: 'communityInfo',
  components: {
    homeHeader,
    Group,
    Cell,
    XDialog
  },
  data() {
    return {
      dialogVisible: false,
      id: this.$route.query.id,
      info: null
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    Load.show('加载中...')
    getCommunityInfo(this.id)
      .then(response => {
        this.info = response
      })
  },
  computed: {
    ...mapGetters([
      'checkedEqu'
    ])
  }
}
</script>

<style lang='less' scoped>
.communityInfo {
  height: 100%;
}
.toggle {
  position: absolute;
  right: 15px;
  font-size: 15px;
}
.weui-dialog {
  img {
    margin: 32px 0;
  }
}
</style>