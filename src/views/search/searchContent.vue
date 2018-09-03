<template>
  <div class="familyList">

    <div class="top-bar">
      <span class="goback" @click="goBack">
        <svg-icon icon-class="back" />
      </span>
      <div class="top-bar-left">
        <div class="top-select">
          <div class="input-tab" @click="selectFlag=!selectFlag">
            <div class="input-tab-txt">
              {{selectValue}}
              <span class="caret"></span>
            </div>
            <div class="tab-nav" v-show="selectFlag">
              <ul>
                <li v-for="(item, index) in options" :key="index" @click="getValue(item, index)">{{item.value}}</li>
              </ul>
              <div class="triangle"></div>
            </div>
          </div>
          <div class="searchBox">
            <!--绑定软键盘搜索事件-->
            <form @submit="submit" @click="changeFlag">
              <input ref="search" type="search" class="search" autofocus :placeholder="placeholder" v-model="keywords">
            </form>
          </div>
          <div class="searchBtn" @click="submit">
            <svg-icon icon-class="search" :class="{'searchEmpty': emptyFlag}" />
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-wrapper" @click="selectFlag=false">
      <div v-if="showFlag" class="text">未找到与 {{keywords}} 相关的内容</div>
      <scroll ref="scroll" :data="list">

        <!-- 搜人 -->
        <div class="weui-panel weui-panel_access" v-for="(people, index) in list" :key="index" v-if="type==='person'">
          <div class="weui-panel__bd">
            <a class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" :src="people.facePic1" @error="imgError(people)">
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title"></h4>
                <p class="desc">
                  姓名：{{people.name}}
                </p>
                <p class="desc">
                  电话：{{people.phone}}
                </p>
                <p class="desc">
                  身份证号：{{people.cerNum}}
                </p>
              </div>
            </a>
          </div>
        </div>

        <!-- 搜车 -->
        <div v-for="(car, index) in list" :key="index" class="weui-panel weui-panel_access" v-if="type==='car'">
          <div class="weui-panel__bd">
            <a class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__bd">
                <p class="desc">
                  车主：{{car.carOwnerName}}
                </p>
                <p class="desc">
                  车牌号：{{car.carPlateNum}}
                </p>
                <p class="desc">
                  车主电话：{{car.carOwnerPhone}}
                </p>
              </div>
            </a>
          </div>
        </div>

        <!-- 搜房 -->
        <div v-for="(house, index) in list" :key="index" class="weui-panel weui-panel_access" v-if="type==='house'">
          <div class="weui-panel__bd">
            <a class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__bd">
                <p class="desc">
                  房屋地址：{{house.buildingName}}{{house.unitName}}{{house.houseName}}
                </p>
                <p class="desc">
                  房屋面积：{{house.houseArea}}
                </p>
                <p class="desc">
                  房屋状态：{{house.houseUseStateValue}}
                </p>
              </div>
            </a>
          </div>
        </div>

      </scroll>
    </div>

  </div>
</template>

<script>
import { getSearchInfo } from '@/api/community/search'
import { Load } from '@/utils/msg'

const options = [
  {
    type: 'person',
    value: '搜人'
  },
  {
    type: 'car',
    value: '搜车'
  },
  {
    type: 'house',
    value: '搜房'
  }
]
export default {
  name: '',
  data() {
    return {
      selectFlag: false,
      options,
      selectValue: '搜人',
      placeholderOptions: ['请输入姓名或电话号码、身份证号', '请输入车牌号码', '请输入住房信息，如3-10-101'],
      placeholder: '请输入姓名或电话号码、身份证号',
      keywords: '',
      type: 'person',
      list: [],
      emptyFlag: false,
      showFlag: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getValue(item, index) {
      this.type = item.type
      this.selectValue = item.value
      this.placeholder = this.placeholderOptions[index]
    },
    changeFlag() {
      this.selectFlag = false
      this.emptyFlag = false
    },
    submit() {
      this.$refs.search.blur()
      if (!this.keywords.trim()) {
        this.emptyFlag = true
        return
      }
      Load.show()
      getSearchInfo(this.type, this.keywords)
        .then(response => {
          this.list = response
          this.showFlag = response.length === 0
        })
    },
    imgError(item) {
      item.facePic1 = require('../community/error.jpg')
    }
  },
  created() { }
}
</script>

<style lang='less' scoped>
.familyList {
  height: 100%;
  overflow: hidden;
  background-color: #f8f8f8;
  .top-bar {
    width: 100%;
    color: #212121;
    height: 32px;
    line-height: 32px;
    padding: 6px 0;
    position: relative;
    border-bottom: 1px solid #dbdbdb;
    .goback {
      width: 30px;
      float: left;
      color: #999;
      text-align: center;
    }
    .top-bar-left {
      margin: 0 8px 0 30px;
      .top-select {
        height: 32px;
        background-color: #e3e3e5;
        border-radius: 4px;
        position: relative;
        .input-tab {
          float: left;
          .input-tab-txt {
            width: 56px;
            height: 30px;
            line-height: 30px;
            color: #999;
            font-size: 14px;
            padding-left: 8px;
            .caret {
              display: inline-block;
              width: 0;
              height: 0;
              vertical-align: middle;
              border-top: 4px dashed;
              border-right: 4px solid transparent;
              border-left: 4px solid transparent;
            }
          }
          .tab-nav {
            position: absolute;
            left: 0;
            top: 30px;
            z-index: 99;
            padding: 10px;
            .triangle {
              width: 10px;
              height: 10px;
              background: #484d50;
              position: absolute;
              transform: rotate(45deg);
              top: 4px;
              left: 24px;
            }
            ul {
              background: #484d50;
              border-radius: 6px;
              width: 100px;
              color: #c7c8c9;
              li {
                border-top: 1px solid #707476;
                margin-top: -1px;
                height: 35px;
                line-height: 35px;
                padding-left: 10px;
                font-size: 14px;
                &:first-of-type {
                  border: none;
                }
              }
            }
          }
        }
        .searchBox {
          margin-left: 66px;
          margin-right: 30px;
          line-height: 28px;
          .search {
            width: 100%;
            height: 26px;
            line-height: 26px;
            font-size: 14px;
            margin: 3px 0;
            color: #999;
            outline: none;
            background: none;
          }
        }
        .searchBtn {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 0;
          right: 0;
          text-align: center;
          color: #999;
          font-size: 20px;
          display: flex;
          align-items: center;
          .searchEmpty {
            border: 2px solid #e4bd73;
          }
        }
      }
    }
  }
  .scroll-wrapper {
    width: 100%;
    position: absolute;
    top: 44px;
    bottom: 0;
    padding-top: 10px;
    .desc {
      color: #999;
      font-size: 14px;
      line-height: 25px;
    }
    .text {
      margin: 20px;
      color: #999;
    }
  }
}
</style>