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
        v-model="value"
        @keyup.enter="search">
      <svg-icon icon-class="search"
        class="icon-search" />
      <span class="cancel"
        @click="search">搜索</span>
    </div>

    <!-- 搜索历史 -->
    <div class="history"
      v-if="showFlag">
      <template v-if="searchHistory.length">
        <p>搜索记录</p>
        <div class="label">
          <div class="labelItem"
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="history($event)">{{item}}</div>
        </div>
      </template>
      <p v-else>暂无搜索内容!</p>
    </div>

    <!-- 搜索列表 -->
    <transition name="slide-left">
      <div class="subContent"
        v-if="!showFlag">
        <div class="alarmItem">
          <img src="../../static/image/test.jpg">
          <div class="describe">
            <p>
              <span class="title left">张三丰</span>
              <span class="title">绿景苑</span>
            </p>
            <p>
              <span class="left subtitle">布控类型</span>
              <span class="text">孤寡老人</span>
            </p>
            <p>
              <span class="left subtitle">最新告警</span>
              <span class="text">07:22:35离开2号楼单元门</span>
            </p>
            <div>
              <x-button mini
                type="primary"
                @click.native.stop="$router.push({path: '/detail', query: {id: '40288bae64c541840164c544f3e70002'}})">基本信息</x-button>
              <x-button mini
                type="primary"
                @click.native="$router.push({name: 'trace', params: {id: '40288bae64c541840164c544f3e70002'}})">历史轨迹</x-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  name: '',
  components: {
    XButton
  },
  data() {
    return {
      showFlag: true,
      value: '',
      searchHistory: []
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    search() {
      if (!this.value) return
      this.showFlag = false
      // 本地存储搜索历史
      // 是否搜索过
      let index = this.searchHistory.indexOf(this.value)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      // 添加搜索历史
      this.searchHistory.unshift(this.value)
      if (this.searchHistory.length > 10) {
        this.searchHistory.pop()
        window.localStorage.removeItem('history')
      }
      window.localStorage.setItem('history', JSON.stringify(this.searchHistory))
    },
    history(e) {
      this.value = e.target.innerText
      this.search()
    }
  },
  created() {
    this.searchHistory = JSON.parse(window.localStorage.getItem('history')) || []
  }
}
</script>

<style lang='less' scoped>
.search {
  height: 100%;
}
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
/* 搜索历史 */
.history {
  width: 100%;
  position: absolute;
  top: 64px;
  bottom: 0;
  background-color: #fff;
  padding: 0 24px;
  color: #666;
  font-size: 14px;
  box-sizing: border-box;
  p {
    margin: 11px 0;
  }
  .label {
    display: flex;
    flex-wrap: wrap;
    .labelItem {
      padding: 12px 20px;
      margin: 10px 30px 10px 0;
      background-color: #ebebeb;
      border-radius: 5px;
    }
  }
}
/* 搜索列表 */
.subContent {
  .alarmItem {
    margin-top: 10px;
    padding: 15px;
    background-color: #fff;
    display: flex;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    .describe {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
      .title {
        color: #333;
        font-weight: 700;
      }
      .subtitle {
        color: #999;
      }
      .text {
        font-size: 12px;
        color: #333;
      }
      .left {
        display: inline-block;
        width: 60px;
      }
      .weui-btn + .weui-btn {
        margin-top: 0;
      }
      .weui-btn_mini {
        padding: 0 0.5em;
        margin-right: 15px;
      }
    }
  }
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
  will-change: transform;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>