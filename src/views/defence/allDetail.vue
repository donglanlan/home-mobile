<template>
  <div class="allDetail">

    <home-header title="详细信息"></home-header>

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

          <box gap="23px 16px">
            <x-button type="primary"
              @click.native="addDefence">加入布控</x-button>
          </box>

        </scroll>
        <confirm v-model="labelVisible"
          hide-on-blur
          @on-confirm="onConfirm">
          <checker v-model="keyPersonProp"
            type="radio"
            radio-required
            selected-item-class="checked">
            <checker-item class="label"
              :value="item"
              v-for="(item, index) in dics"
              :key="index">
              <span>{{item.dicValue}}</span>
            </checker-item>
          </checker>
        </confirm>
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { mapGetters } from 'vuex'
import { Box, XButton, Confirm, Checker, CheckerItem } from 'vux'

import { listByParentDicKey } from '@/api/mgr/dic'

export default {
  name: '',
  components: {
    homeHeader,
    Box,
    XButton,
    Confirm,
    Checker,
    CheckerItem
  },
  data() {
    return {
      labelVisible: false,
      detail: this.$route.query.detail,
      dics: null,
      keyPersonProp: {}
    }
  },
  methods: {
    addDefence() {
      if (this.detail.defenceState === '1') {
        this.$router.push({ path: '/defenceSetting', query: { detail: this.detail } })
      } else {
        this.labelVisible = true
      }
    },
    onConfirm() {
      this.detail.basePerson.defenceState = 1
      this.detail.basePerson.keyPersonProp = this.keyPersonProp.dicKey
      this.detail.basePerson.keyPersonPropValue = this.keyPersonProp.dicValue
      this.$router.push({ path: '/defenceSetting', query: { detail: this.detail } })
    },
    imgError(item) {
      item.basePerson.facePic1 = require('../../static/image/error.jpg')
    }
  },
  created() {
    // 注入字典 
    listByParentDicKey('key_person_prop')
      .then(response => {
        this.dics = response
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
@import '../../styles/mixin';

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
.label {
  height: 42px;
  line-height: 42px;
  font-size: 15px;
  color: #2e2e2e;
  border-bottom: 1px solid #e6e6e6;
  display: block;
  transition: all ease 0.2s;
  &:last-of-type {
    border-bottom: none;
  }
}
// 弹出框样式
.vux-confirm {
  /deep/ .weui-dialog__bd {
    padding: 0;
    .vux-checker-box {
      max-height: 386px;
      overflow-y: scroll;
      .vux-tap-active:active {
        background-color: #fff;
      }
    }
  }
}
::-webkit-scrollbar {
  width: 0;
}
.checked {
  color: #fff;
  background-color: @theme-color;
}
</style>