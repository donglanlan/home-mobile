<template>
  <div class="defenceSetting">

    <div class="homeHeader">
      <div class="head-wrapper">
        <div class="back"
          @click="goBack">
          <svg-icon icon-class="back" />
        </div>
        <span>详细信息</span>
        <span class="remove"
          @click="confirmVisible=true">移除</span>
      </div>
    </div>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <div class="descItem">
            <img :src="detail.basePerson.facePic1 ? detail.basePerson.facePic1 : '../../static/image/error.jpg'"
              @error="imgError(item)">
            <div class="describe">
              <p>
                <span class="title left">{{detail.basePerson.name}}</span>
                <span class="title">{{checkedEqu.name}}</span>
              </p>
              <p>
                <span class="left subtitle">性别</span>
                <span class="text">{{detail.basePerson.sexValue}}</span>
              </p>
              <p>
                <span class="left subtitle">年龄</span>
                <span class="text">{{detail.basePerson.age}}</span>
              </p>
              <p>
                <span class="left subtitle">民族</span>
                <span class="text">{{detail.basePerson.nationValue}}</span>
              </p>
            </div>
          </div>
          <ul>
            <li>
              <p>布控类型</p>
              <span>{{detail.basePerson.keyPersonPropValue}}</span>
            </li>
            <li>
              <p>身份证号</p>
              <span>{{detail.basePerson.cerNum}}</span>
            </li>
            <li>
              <p>房间号</p>
              <span v-if="detail.baseHouses[0] && detail.baseHouses[0].buildingName && detail.baseHouses[0].unitName && detail.baseHouses[0].houseName">{{detail.baseHouses[0].buildingName + detail.baseHouses[0].unitName + detail.baseHouses[0].houseName}}</span>
            </li>
            <li>
              <p>手机号</p>
              <span>{{detail.basePerson.phone}}</span>
            </li>
          </ul>
          <group v-if="defence">
            <cell :title="item.dicValue + '布控'"
              is-link
              @click.native="getChannel(item)"
              v-for="(item, index) in dics"
              :key="index">{{defence[item.dicKey][item.dicKey + 'Num'] ? defence[item.dicKey][item.dicKey + 'Num'] + '处' : '无'}}</cell>
          </group>

          <box gap="23px 16px">
            <x-button type="primary">开始布控</x-button>
          </box>

        </scroll>
        <!-- 布控地点选择 -->
        <x-dialog v-model="dialogVisible"
          hide-on-blur
          v-if="tempt">
          <div class="defenceTitle">{{tempt.dicValue + '布控'}}
            <span class="vux-close" @click="dialogVisible=false"></span>
          </div>
          <checker v-model="defenceChecked"
            type="checkbox"
            selected-item-class="checked">
            <div class="filterSelect">
              <checker-item :value="item.id"
                v-for="(item, index) in defence[tempt.dicKey][tempt.dicKey + 'List'] "
                :key="index">
                <span>{{item.channelName}}</span>
              </checker-item>
            </div>
          </checker>
        </x-dialog>

        <!-- 移出重点人员名单-->
        <confirm v-model="confirmVisible">
          <p>是否将此人移出重点人员名单？</p>
        </confirm>

      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell, Box, XButton, XDialog, Checker, CheckerItem, Confirm } from 'vux'
import { mapGetters } from 'vuex'
import { Load } from '@/utils/msg'
import { getDefenceChannel } from '@/api/face/faceChannel'
import { listByParentDicKey } from '@/api/mgr/dic'

export default {
  name: '',
  components: {
    Group,
    Cell,
    Box,
    XButton,
    XDialog,
    Checker,
    CheckerItem,
    Confirm
  },
  data() {
    return {
      detail: this.$route.query.detail,
      dialogVisible: false,
      confirmVisible: false,
      defenceChecked: [],
      defence: null,
      dics: null,
      tempt: null
    }
  },
  methods: {
    getChannel(value) {
      this.dialogVisible = true
      this.tempt = value
    },
    imgError(item) {
      item.basePerson.facePic1 = require('../../static/image/error.jpg')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    Load.show('正在加载...')
    // 加入通道类型字典
    listByParentDicKey('channel_type')
      .then(response => {
        this.dics = response
      })
    // 人员通道布控详情
    getDefenceChannel({ communityId: this.checkedEqu.value, personId: this.detail.personId })
      .then(response => {
        this.defence = response
        this.dics.forEach(item => {
          let checked = response[item.dicKey][item.dicKey + 'List'].map(value => {
            if (value.personDefence) {
              return value.id
            }
          })
          if(checked[0]) {
            checked.forEach(item => {
              this.defenceChecked.push(item)
            })
          }
        })
      })
  },
  computed: {
    ...mapGetters([
      'checkedEqu'
    ])
  }
}
</script>

<style lang='less' scoped>
.defenceSetting {
  height: 100%;
}
.remove {
  position: absolute;
  right: 15px;
  font-size: 14px;
}
ul {
  margin-top: 10px;
  color: #999;
  li {
    height: 44px;
    line-height: 44px;
    padding-left: 15px;
    font-size: 14px;
    border-bottom: 1px solid #dddbdb;
    background-color: #fff;
    display: flex;
    p {
      width: 110px;
    }
    span {
      color: #333;
    }
  }
}
// 布控地点弹框选择
.defenceTitle {
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}
.filterSelect {
  padding: 13px 4%;
  .vux-checker-item {
    width: 48%;
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: center;
    float: left;
    &:nth-of-type(2n + 1) {
      margin-right: 4%;
    }
  }
  .checked {
    background-color: #f2f2f2;
  }
}
.vux-close {
  position: absolute;
  top: 16px;
  right: 5px;
  color: #999;
  width: 16px;
  height: 16px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 0;
    display: inline-block;
    width: 16px;
    height: 1px;
    background-color: currentColor;
  }
  &:after {
    transform: rotate(-45deg);
  }
  &:before {
    transform: rotate(45deg);
  }
}
</style>