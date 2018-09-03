<template>
  <div class="scroll-wrapper">
    <scroll>
      <ul class="timeline"
        v-if="list.length">
        <li v-for="(item, index) in list"
          :key="index"
          class="timeline-item"
          @click="goDetail(item)">
          <div>
            <p>{{item.time.split(' ')[0]}}</p>
            <img :src="item.img ? item.img : '../../../static/image/01.jpg'"
              @error="imgError(item)">
          </div>
          <svg-icon icon-class="right" />
        </li>
      </ul>
      <p v-else
        class="none">没有相关数据!</p>
    </scroll>
  </div>
</template>

<script>
import moment from 'moment'
import { getDefenceByDay } from '@/api/community/defenceEvent'
import { Load } from '@/utils/msg'

export default {
  name: 'trace1',
  props: {
    id: ''
  },
  data() {
    return {
      query: {
        personId: this.id,
        day: '',
        recentdays: 0
      },
      list: []
    }
  },
  methods: {
    getDefence() {
      this.query.day = moment(Date.now()).format('YYYY-MM-DD')
      Load.show('正在加载...')
      getDefenceByDay(this.query)
        .then(response => {
          this.list = response
        })
    },
    goDetail(item) {
      let time = item.time.split(' ')[0]
      this.$router.push({ path: '/traceDetail', query: { time: time, id: item.personId } })
    },
    imgError(item) {
      item.img = require('../../../static/image/01.jpg')
    }
  },
  created() {
    this.getDefence()
  }
}
</script>

<style lang='less' scoped>
.scroll-wrapper {
  top: 44px;
  .timeline-item {
    padding: 15px 54px 15px 71px;
    margin-top: 10px;
    background-color: #fff;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    img {
      width: 139px;
      margin-top: 10px;
    }
  }
  .none {
    font-size: 14px;
    color: #333;
    margin: 10px;
  }
}
</style>