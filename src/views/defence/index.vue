<template>
  <div class="defence">
    <div class="homeHeader">
      <div class="head-wrapper">
        <span>布控设置</span>
        <div class="add"
          @click="$router.push('/addDefence')">
          <svg-icon icon-class="add" />
        </div>
      </div>
    </div>

    <div class="content">

      <!-- 搜索框 -->
      <div class="searchBox">
        <div class="search"
          @click="$router.push('/searchDefence')">
          <svg-icon class="icon-search"
            icon-class="search" />
          <span>请输入姓名</span>
        </div>
      </div>

      <div class="scroll-wrapper">
        <scroll ref="scroll"
          :data="list"
          @pulling-down="refreshList"
          @pulling-up="getList"
          :options="scrollOptions">
          <div class="descItem"
            @click="$router.push({path: '/defenceSetting', query: {detail: item}})"
            v-for="(item, index) in list"
            :key="index">
            <img :src="item.basePerson.facePic1 ? item.basePerson.facePic1 : '../../static/image/error.jpg'"
              @error="imgError(item)">
            <div class="describe">
              <p>
                <span class="title left">{{item.basePerson.name}}</span>
                <span class="title">{{checkedEqu.name}}</span>
              </p>
              <p>
                <span class="left subtitle">布控类型</span>
                <span class="text">{{item.basePerson.keyPersonPropValue}}</span>
              </p>
              <p>
                <span class="left subtitle">家庭住址</span>
                <span class="text"
                  v-if="item.baseHouses[0] && item.baseHouses[0].buildingName && item.baseHouses[0].unitName && item.baseHouses[0].houseName">{{item.baseHouses[0].buildingName + item.baseHouses[0].unitName + item.baseHouses[0].houseName}}</span>
              </p>
              <p>
                <span class="left subtitle">联系方式</span>
                <span class="text">{{item.basePerson.phone}}</span>
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
import footGuide from '@/components/footer'
import { Load } from '@/utils/msg'
import { getPerson } from '@/api/community/person'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: {
    footGuide
  },
  data() {
    return {
      list: [],
      listQuery: {
        page: 0,
        size: 5,
        communityId: '',
        defenceState: 1
      },
      scrollOptions: {
        pullUpLoad: {
          threshold: 60,
          txt: '没有更多了'
        },
        pullDownRefresh: {
          threshold: 60,
          txt: '刷新成功'
        }
      }
    }
  },
  methods: {
    getList() {
      getPerson(this.listQuery)
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
    // 下拉刷新
    refreshList() {
      this.listQuery.page = 0
      getPerson(this.listQuery)
        .then(response => {
          // 如果有新数据
          if (response.content.length > 0) {
            this.list = response.content
          } else {
            // 如果没有新数据，结束此次刷新
            this.$refs.scroll.forceUpdate()
          }
        })
    },
    imgError(item) {
      item.basePerson.facePic1 = require('../../static/image/error.jpg')
    }
  },
  created() {
    this.listQuery.communityId = this.checkedEqu.value
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
.defence {
  height: 100%;
}
.add {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 18px;
}
.searchBox {
  height: 50px;
  background-color: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
  color: #999;
  .search {
    padding: 0 12px;
    height: 100%;
    line-height: 30px;
    background-color: #f2f2f2;
    border-radius: 5px;
    font-size: 12px;
    .icon-search {
      font-size: 16px;
    }
  }
}
.scroll-wrapper {
  top: 50px;
}
</style>