<template>

  <div class="scroll-wrapper">
    <!-- 重点人员 -->
    <scroll ref="scroll"
      :data="list"
      @pulling-down="refreshList"
      @pulling-up="getList"
      :options="scrollOptions">
      <div class="weui-panel weui-panel_access"
        v-for="(item, index) in list"
        :key="index"
        @click="getDetail(item.id)">
        <div class="weui-panel__bd">
          <a class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb"
                :src="item.facePic1 ? item.facePic1 : '../community/error.jpg'"
                @error="imgError(item)">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title"></h4>
              <p class="desc">
                姓名：{{item.name}}
              </p>
              <p class="desc">
                电话：{{item.phone}}
              </p>
              <p class="desc">
                身份证号：{{item.cerNum}}
              </p>
            </div>
          </a>
        </div>
      </div>
    </scroll>

    <x-dialog v-model="showDialog"
      hide-on-blur>
      <div class="dialog">
        <div class="icon" @click="showDialog=false"><x-icon type="ios-close-empty" size="30"></x-icon></div>
        <p class="info" style="color: #000;margin-bottom: 10px;">详细信息</p>
        <p class="info">姓名：<span>{{personDetail.name}}</span></p>
        <p class="info">性别：<span>{{personDetail.sexValue}}</span></p>
        <p class="info">住址：<span>{{personDetail.personNativeValue}}</span></p>
        <p class="info">出生日期：<span>{{personDetail.birth}}</span></p>
        <p class="info">联系方式：<span>{{personDetail.phone}}</span></p>
        <p class="info">身份证：<span>{{personDetail.cerNum}}</span></p>
        <p class="info">民族：<span>{{personDetail.nationValue}}</span></p>
        <p class="info">政治面貌：<span>{{personDetail.politicalValue}}</span></p>
        <p class="info">是否流动人口：<span>{{personDetail.isFloating === '0' ? '否' : '是'}}</span></p>
        <p class="info">人员性质：<span>{{personDetail.keyPersonPropValue}}</span></p>
        <p class="info">布防状态：<span>{{personDetail.defenceState === '0' ? '正常' : '布防'}}</span></p>
      </div>
    </x-dialog>
  </div>

</template>

<script>
import { XDialog, Group, Cell } from 'vux'
import { getKeyPerson } from '@/api/community/person'
import { Load } from '@/utils/msg'

export default {
  name: '',
  props: {
    id: ''
  },
  components: {
    XDialog,
    Group,
    Cell
  },
  data() {
    return {
      listQuery: {
        page: 0,
        size: 5,
        communityId: '',
        keyPersonProp: '1'
      },
      list: [],
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
      showDialog: false,
      personDetail: {}
    }
  },
  methods: {
    getList() {
      if (!this.listQuery.page) {
        Load.show('正在加载...')
      }
      getKeyPerson(this.listQuery)
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
      getKeyPerson(this.listQuery)
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
      item.facePic1 = require('./error.jpg')
    },
    getDetail(id) {
      let personDetail = this.list.filter(item => {
        return item.id === id
      })
      this.personDetail = personDetail[0]
      this.showDialog = true
    }
  },
  created() {
    this.listQuery.communityId = this.id
    Load.show()
    this.getList()
  }
}
</script>

<style lang='less' scoped>
.scroll-wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  .desc {
    color: #999;
    font-size: 14px;
    line-height: 25px;
  }
}
.dialog {
  padding: 10px;
  position: relative;
  .icon {
    width: 30px;
    height: 34px;
    padding-top: 5px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .info {
    display: flex;
    justify-content: space-between;
    color: #888;
    line-height: 24px;
  }
}
</style>