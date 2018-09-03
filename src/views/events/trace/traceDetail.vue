<template>
  <div>
    <home-header :title="query.day + '详情'"></home-header>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <div class="detail">
            <flow orientation="vertical">
              <template v-for="index in list.length">
                <flow-state :key="index+'0'"></flow-state>
                <flow-line :key="index"></flow-line>
              </template>

              <flow-state></flow-state>
            </flow>
            <div class="list">
              <div class="item"
                v-for="(item, index) in list"
                :key="index">
                <p>{{item.time}}</p>
                <p>{{item.position}}</p>
                <img :src="item.img ? item.img : '../../../static/image/01.jpg'"
                  @error="imgError(item)">
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { Flow, FlowState, FlowLine } from 'vux'
import { getDefenceByDay } from '@/api/community/defenceEvent'
import { Load } from '@/utils/msg'

export default {
  name: '',
  components: {
    homeHeader,
    Flow,
    FlowState,
    FlowLine
  },
  data() {
    return {
      query: {
        personId: this.$route.query.id,
        day: this.$route.query.time,
        recentdays: 0
      },
      list: []
    }
  },
  methods: {
    getDetail() {
      Load.show('正在加载...')
      getDefenceByDay(this.query)
        .then(response => {
          this.list = response
        })
    },
    imgError(item) {
      item.img = require('../../../static/image/01.jpg')
    }
  },
  created() {
    this.getDetail()
  }
}
</script>

<style lang='less' scoped>
.detail {
  padding: 15px 0 0 47px;
  background-color: #fff;
  display: flex;
  .list {
    margin-left: 15px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    .item {
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      img {
        height: 75px;
        margin: 5px 0 10px;
      }
    }
  }
}
</style>