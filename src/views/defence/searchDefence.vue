<template>
  <div class="search">

    <div class="head-wrapper">
      <div class="subBack"
        @click="goBack">
        <svg-icon icon-class="back" />
      </div>
      <input type="search"
        placeholder="请输入姓名"
        class="searchInput"
        v-model="listQuery['basePerson.name']"
        @keyup.enter="getList">
      <svg-icon icon-class="search"
        class="icon-search" />
      <span class="cancel">取消</span>
    </div>

    <!-- 搜索列表 -->
    <div class="subContent">
      <div class="scroll-wrapper" v-if="list.length">
        <scroll>
          <div class="descItem"
            @click="$router.push({path: '/defenceDetail', query: {detail: item}})"
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
      <p class="none" v-if="flag">未找到相关内容</p>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
import { mapGetters } from 'vuex'
import { Load } from '@/utils/msg'
import { getPerson } from '@/api/community/person'

export default {
  name: '',
  components: {
    XButton
  },
  data() {
    return {
      showFlag: false,
      list: [],
      listQuery: {
        'basePerson.name': '',
        communityId: '',
        defenceState: 1
      },
      flag: false      
    }
  },
  methods: {
    getList() {
      Load.show('正在加载...')
      getPerson(this.listQuery)
        .then(response => {
          if(!response.content.length) {
            this.flag = true
            return
          }
          this.list = response.content
        })
    },
    imgError(item) {
      item.basePerson.facePic1 = require('../../static/image/error.jpg')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.listQuery.communityId = this.checkedEqu.value
  },
  computed: {
    ...mapGetters([
      'checkedEqu'
    ])
  }
}
</script>

<style lang='less' scoped>
/* 头部 */
.head-wrapper {
  display: flex;
  align-items: center;
  .subBack {
    margin: 0 25px 0 15px;
  }
  .searchInput {
    flex: 1;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 5px;
    font-size: 12px;
    padding-left: 30px;
    outline: none;
  }
  .icon-search {
    position: absolute;
    left: 64px;
    color: #999;
    font-size: 16px;
  }
  .cancel {
    padding: 0 15px 0 13px;
    font-size: 14px;
  }
}
.none {
  font-size: 14px;
  color: #333;
  margin: 10px;
}
</style>