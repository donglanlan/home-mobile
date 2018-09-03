<template>

  <div class="msgManager">
    <home-header title="信息管理"
      :backFlag="false"
      :addFlag="true"></home-header>

    <div class="content">
      <div class="scroll-wrapper">
        <scroll>
          <div class="descItem">
            <img src="../../static/image/test.jpg">
            <div class="describe">
              <p>
                <span>姓名</span>
                <span class="text">张三丰</span>
              </p>
              <p>
                <span>性别</span>
                <span class="text">男</span>
              </p>
              <p>
                <span>年龄</span>
                <span class="text">66</span>
              </p>
              <p>
                <span>电话</span>
                <span class="text">1111111111</span>
              </p>
            </div>
          </div>
          <div class="descItem" v-if="list.length" v-for="(item, index) in list" :key="index">
            <img :src="item.img ? item.img : '../../static/image/01.jpg'"
              @error="imgError(item)">
            <div class="describe">
              <p>
                <span>姓名</span>
                <span class="text">{{item.name}}</span>
              </p>
              <p>
                <span>性别</span>
                <span class="text">{{item.sexValue}}</span>
              </p>
              <p>
                <span>年龄</span>
                <span class="text">{{item.age}}</span>
              </p>
              <p>
                <span>电话</span>
                <span class="text">{{item.phone}}</span>
              </p>
            </div>
          </div>

        </scroll>
      </div>
    </div>

    <foot-guide></foot-guide>

  </div>

</template>

<script>
import homeHeader from '@/components/homeHeader'
import footGuide from '@/components/footer'

import { getListByPoliceId } from '@/api/community/person'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: {
    homeHeader,
    footGuide
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    imgError(item) {
      item.img = require('../../static/image/01.jpg')
    }
  },
  created() {
    getListByPoliceId(this.userInfo.id)
      .then(response => {
        this.list = response
      })
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style lang='less' scoped>
.msgManager {
  height: 100%;
  .text {
    margin-left: 10px;
  }
}
</style>