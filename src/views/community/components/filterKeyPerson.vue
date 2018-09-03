<template>
  <scroll ref="scroll"
    :data="list"
    @pulling-up="getList"
    :options="scrollOptions">
    <div class="descItem"
      @click="$router.push({path: '/keyPersonDetail', query: {detail: item}})"
      v-for="(item, index) in list"
      :key="index"
      :id="index">
      <img :src="item.facePic1 ? item.facePic1 : '../../../static/image/error.jpg'"
        @error="imgError(item)">
      <div class="describe">
        <p>
          <span class="title left">{{item.name}}</span>
          <span class="title">{{checkedEqu.name}}</span>
        </p>
        <p>
          <span class="left subtitle">布控类型</span>
          <span>{{item.keyPersonPropValue}}</span>
        </p>
        <p>
          <span class="left subtitle">家庭住址</span>
          <span
            v-if="item.baseHouses[0] && item.baseHouses[0].buildingName && item.baseHouses[0].unitName && item.baseHouses[0].houseName">{{item.baseHouses[0].buildingName + item.baseHouses[0].unitName + item.baseHouses[0].houseName}}</span>
        </p>
        <p>
          <span class="left subtitle">联系方式</span>
          <span>{{item.phone}}</span>
        </p>
      </div>
    </div>
  </scroll>
</template>

<script>
import { Load } from '@/utils/msg'
import { mapGetters } from 'vuex'
import { getPersonByProp } from '@/api/community/person'

export default {
  name: 'filterKeyPerson',
  props: {
    filter: null
  },
  data() {
    return {
      list: [],
      listQuery: {
        page: 0,
        size: 5,
        communityId: this.$route.query.id,
        keyPersonProp: []
      },
      scrollOptions: {
        pullUpLoad: {
          threshold: 60,
          txt: '没有更多了'
        }
      },
    }
  },
  methods: {
    getList() {
      getPersonByProp(Object.assign(this.listQuery, {keyPersonProp: this.filter.join()}))
        .then(response => {
          // 如果有新数据
          if (response.content.length > 0) {
            this.list = this.list.concat(response.content)
            this.listQuery.page++
          } else {
            // 如果没有新数据，结束此次刷新
            this.$refs.scroll.forceUpdate()
          }
        })
    },
    reset() {
      this.listQuery.page = 0
      this.list = []
    },
    imgError(item) {
      item.facePic1 = require('../../../static/image/error.jpg')
    },
  },
  created() {
    Load.show('正在加载...')
    this.getList()
  },
  computed: {
    ...mapGetters([
      'checkedEqu'
    ])
  }
}
</script>

<style lang='less' scoped>
</style>