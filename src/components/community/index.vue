<template>
  <div class="community">

    <home-header ref="header"
      title="小区"></home-header>

    <div class="content"
      @click="change">
      <div class="scroll-wrapper">
        <scroll>
          <group>
            <cell v-for="(item, index) in equs"
              :key="index"
              :title="item.equName"
              :link="{name: 'communityInfo', params: {
        title: item.equName, id: item.id
      }}"></cell>
          </group>

          <!-- <a href="itms-apps://itunes.apple.com/app/id414478124">跳转到微信</a> -->
        </scroll>
      </div>
    </div>

  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import {
  Group,
  Cell
} from 'vux'
import { Load } from '@/utils/msg'
import { getUserDetail } from '@/api/mgr/user'
import { getEquGroups } from '@/api/equ/equ'
import { getName } from '@/utils/auth'

export default {
  name: 'community',
  components: {
    homeHeader,
    Group,
    Cell
  },
  data() {
    return {
      system: null,
      showFlag: false,
      equs: []
    }
  },
  methods: {
    change() {
      this.$refs.header.changeFlag()
    },
    async test() {
      try {
        Load.show('加载中...')
        let name = getName()
        let res = await getUserDetail(name)
        this.$store.commit('SET_USERINFO', res)
        // 获取用户拥有权限的小区
        let response = await getEquGroups(name, res.roleIds.join())
        this.equs = response
        let equIds = response.map(item => {
          return item.id
        })
        this.$store.commit('SET_EQUIDS', equIds)
      } catch (err) {
        alert(err)
      }
    }
  },
  created() {
    this.test()
    /* let name = getName()
    getUserDetail(name)
      .then(response => {
        Load.show('加载中...')
        this.$store.commit('SET_USERINFO', response)
        // 获取用户拥有权限的小区
        getEquGroups(name, response.roleIds.join()).then(response => {
          let equIds = response.map(item => {
            return item.id
          })
          this.equs = response
          this.$store.commit('SET_EQUIDS', equIds)
        })
      })
      .catch(error => {
        reject(error)
      }) */
    //判断系统
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    if (isAndroid) {
      this.system = 'Android'
    } else if (isIOS) {
      this.system = 'IOS'
    } else {
      this.system = 'pc'
    }
    console.log(this.system)
  }
}
</script>

<style lang='less' scoped>
.scroll-wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  h1 {
    margin: 20px;
  }
}
</style>