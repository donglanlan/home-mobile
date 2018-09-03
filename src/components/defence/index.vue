<template>
  <div>

    <home-header ref="header" title="布防"></home-header>

    <div class="content" @click="change">

      <search ref="search" position="absolute" @on-submit="onSubmit" @on-cancel="list=list.length ? list:temptList" v-model="searchValue"></search>

      <div class="scroll-wrapper">
        <scroll ref="scroll" :data="list" @pulling-down="refreshList" @pulling-up="getList" :options="scrollOptions" v-if="list.length">
          <div class="weui-panel weui-panel_access" v-for="(item, index) in list" :key="index">
            <div class="weui-panel__bd">
              <a class="weui-media-box weui-media-box_appmsg">
                <div class="weui-media-box__hd">
                  <img class="weui-media-box__thumb" :src="item.facePic1 ? item.facePic1 : '../community/error.jpg'" @error="imgError(item)">
                </div>
                <div class="weui-media-box__bd">
                  <p class="desc">
                    姓名：{{item.name}}
                  </p>
                  <p class="desc">
                    人员性质：{{item.keyPersonPropValue}}
                  </p>
                  <x-button v-if="item.defenceState==='1'" mini type="primary" class="btn" @click.native="changeDefenceState(item)">已布防</x-button>
                  <x-button mini type="warn" class="btn" v-else @click.native="changeDefenceState(item)">布防</x-button>
                </div>
              </a>
            </div>
          </div>
        </scroll>
        <div v-if="showFlag" class="text">未找到与 {{searchValue}} 相关的内容</div>
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { Search, XButton } from 'vux'
import {
  getAllKeyPerson,
  getKeyPersonByName,
  updateState
} from '@/api/community/person'
import { Load } from '@/utils/msg'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: {
    homeHeader,
    Search,
    XButton
  },
  data() {
    return {
      list: [],
      temptList: [],
      scrollOptions: {
        pullUpLoad: {
          threshold: 60,
          txt: '没有更多了'
        },
        pullDownRefresh: {
          threshold: 60,
          txt: '刷新成功'
        }
      },
      listQuery: {
        page: 0,
        size: 10,
        communityIds: '',
        keyPersonProp: '1'
      },
      searchValue: '',
      showFlag: false
    }
  },
  methods: {
    getList() {
      if (!this.searchValue) {
        getAllKeyPerson(this.listQuery)
          .then(response => {
            // 如果有新数据
            if (response.content.length > 0) {
              this.list = this.list.concat(response.content)
              this.temptList = this.list
              this.listQuery.page++
            } else {
              // 如果没有新数据，结束此次刷新
              this.$refs.scroll.forceUpdate()
            }
          })
      } else {
        getKeyPersonByName(Object.assign(this.listQuery, { name: this.searchValue }))
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
      }
    },
    // 下拉刷新
    refreshList() {
      if (!this.searchValue) {
        this.listQuery.page = 0
        getAllKeyPerson(this.listQuery)
          .then(response => {
            // 如果有新数据
            if (response.content.length > 0) {
              this.list = response.content
            } else {
              // 如果没有新数据，结束此次刷新
              this.$refs.scroll.forceUpdate()
            }
          })
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    // 图片加载失败显示默认图片
    imgError(item) {
      item.facePic1 = require('../community/error.jpg')
    },
    // 搜索
    onSubmit() {
      // console.dir(this.$refs.search)
      this.$refs.search.setBlur()
      if (this.searchValue.trim()) {
        Load.show()
        this.listQuery.page = 0
        getKeyPersonByName(Object.assign(this.listQuery, { name: this.searchValue }))
          .then(response => {
            this.list = response.content
            this.listQuery.page++
            this.showFlag = response.content.length === 0
          })
      }
    },
    // 改变布防状态
    changeDefenceState(item) {
      item.defenceState = item.defenceState === '1' ? '0' : '1'
      updateState(item.id, { defenceState: item.defenceState })
        .then(() => { })
    },
    change() {
      this.$refs.header.changeFlag()
    }
  },
  created() {
    this.listQuery.communityIds = this.equIds.join()
    Load.show('正在加载...')
    this.getList()
  },
  computed: {
    ...mapGetters([
      'equIds'
    ])
  }
}
</script>

<style lang='less' scoped>
.scroll-wrapper {
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 0;
  .text {
    margin: 20px;
    color: #999;
  }
  .weui-media-box__bd {
    position: relative;
    .desc {
      color: #999;
      font-size: 14px;
      line-height: 25px;
    }
    .btn {
      width: 80px;
      margin-top: 0;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
}
</style>