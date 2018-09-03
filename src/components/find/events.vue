<template>
  <div class="events">

    <sub-header title="事件"></sub-header>

    <div class="content">
      <div class="scroll-wrapper">
        <scroll ref="scroll" :data="eventsList" @pulling-down="refreshList" @pulling-up="getList" :options="scrollOptions">
          <div class="weui-form-preview" v-if="eventsList.length" v-for="(item, index) in eventsList" :key="index">
            <div class="weui-form-preview__hd">
              <label class="weui-form-preview__label">事件类型</label>
              <em class="weui-form-preview__value">{{item.alarmTypeName}}</em>
            </div>
            <div class="weui-form-preview__bd">
              <p>
                <label class="weui-form-preview__label">事件来源</label>
                <span class="weui-form-preview__value">{{item.alarmSourceName}}</span>
              </p>
              <p>
                <label class="weui-form-preview__label">事件时间</label>
                <span class="weui-form-preview__value">{{item.alarmTime}}</span>
              </p>
              <p>
                <label class="weui-form-preview__label">事件地点</label>
                <span class="weui-form-preview__value">{{item.groupName + item.equName}}</span>
              </p>
              <p>
                <label class="weui-form-preview__label">处理状态</label>
                <span class="weui-form-preview__value">{{item.alarmStatusName}}</span>
              </p>
            </div>
          </div>
        </scroll>
      </div>
    </div>

  </div>
</template>

<script>
import subHeader from '@/components/subHeader'
import { getAlarmList } from '@/api/equ/alarm'
import { Load } from '@/utils/msg'

export default {
  name: '',
  components: {
    subHeader
  },
  data() {
    return {
      eventsList: [],
      listQuery: {
        page: 0,
        size: 5,
        equGroupIds: this.$store.state.equIds.join()
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
      getAlarmList(this.listQuery)
        .then(response => {
          // 如果有新数据
          if (response.content.length > 0) {
            this.eventsList = this.eventsList.concat(response.content)
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
      getAlarmList(this.listQuery)
        .then(response => {
          // 如果有新数据
          if (response.content.length > 0) {
            this.eventsList = response.content
          } else {
            // 如果没有新数据，结束此次刷新
            this.$refs.scroll.forceUpdate()
          }
        })
    }
  },
  created() {
    Load.show('正在加载...')
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
  .weui-form-preview {
    margin-bottom: 20px;
    &:first-of-type {
      margin-top: 20px;
    }
    .weui-form-preview__value {
      font-size: 1em;
    }
  }
}
</style>