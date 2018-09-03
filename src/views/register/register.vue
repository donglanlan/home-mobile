<template>
  <div class="register">
    <home-header title="基本信息"></home-header>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <group>
            <popup-picker title="小区名称"
              placeholder="请选择小区"
              :data="dics['communitys']"
              :show-name="true"
              confirm-text="确定"
              v-model="info.community"
              @on-change="getBuildings"></popup-picker>
            <popup-picker title="楼栋名称"
              placeholder="请选择楼栋"
              :data="dics['buildings']"
              :show-name="true"
              confirm-text="确定"
              v-model="info.building"
              @on-change="getUnits"></popup-picker>
            <popup-picker title="单元号"
              placeholder="请选择单元"
              :data="dics['units']"
              :show-name="true"
              confirm-text="确定"
              v-model="info.unit"
              @on-change="getHouse"></popup-picker>
            <popup-picker title="房间号"
              placeholder="请选择房间"
              :data="dics['houses']"
              :show-name="true"
              confirm-text="确定"
              v-model="info.house"></popup-picker>
          </group>

          <div class="takePhote"
            @click="$router.push('/takePhoto')">
            <svg-icon icon-class="camera"
              class="camera" />
            <span>身份证拍照</span>
          </div>

          <group>
            <x-input title="姓名"
              placeholder="请输入姓名"
              placeholder-align="right"
              text-align="right"
              label-width="70px"
              is-type="china-name"
              required
              v-model="info.name"></x-input>
            <popup-picker title="性别"
              :data="dics['gender']"
              :show-name="true"
              confirm-text="确定"
              v-model="info.gender"></popup-picker>
            <x-input title="身份证号"
              placeholder="请输入身份证号"
              placeholder-align="right"
              text-align="right"
              label-width="70px"
              :is-type="idCard"
              required
              v-model.number="info.cerNum"></x-input>
            <datetime title="出生年月"
              start-date="1900-01-01"
              :end-date="endDate"
              placeholder="请选择出生年月"
              v-model="info.birth"></datetime>
            <popup-picker title="民族"
              :data="dics['native']"
              :show-name="true"
              confirm-text="确定"
              v-model="info.native"></popup-picker>
          </group>

          <x-button type="primary"
            class="next"
            @click.native="$router.push({path: '/register2', query: { info }})">下一步</x-button>

        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { Group, PopupPicker, XInput, Datetime, XButton } from 'vux'
import moment from 'moment'

import { listByParentDicKey } from '@/api/mgr/dic'
import { getBuildingsById, getUnitsById, getHousesById } from '@/api/community/equs'
import { mapGetters } from 'vuex'

const form = {
  community: [],
  building: [],
  unit: [],
  house: [],
  name: '',
  gender: [],
  cerNum: '',
  birth: '',
  native: []
}
const id = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/

export default {
  name: '',
  components: {
    homeHeader,
    Group,
    XInput,
    Datetime,
    PopupPicker,
    XButton
  },
  data() {
    return {
      dics: {},
      info: Object.assign({}, form),
      endDate: '',
      idCard: value => {
        return {
          valid: id.test(value),
          msg: '身份证号码格式不正确'
        }
      }
    }
  },
  methods: {
    // 相应小区下的楼栋
    getBuildings() {
      if (!this.info.community[0]) return
      getBuildingsById(this.info.community[0])
        .then(response => {
          let buildings = response.map(item => {
            return {
              name: item.buildingName,
              value: item.id
            }
          })
          this.$set(this.dics, 'buildings', [buildings])
        })
    },
    // 相应楼栋下的单元
    getUnits() {
      if (!this.info.community[0] || !this.info.building[0]) return
      getUnitsById(this.info.community[0], this.info.building[0])
        .then(response => {
          let units = response.map(item => {
            return {
              name: item.unitName,
              value: item.id
            }
          })
          this.$set(this.dics, 'units', [units])
        })
    },
    // 相应单元下的房间
    getHouse() {
      if (!this.info.community[0] || !this.info.building[0] || !this.info.unit[0]) return
      getHousesById(this.info.community[0], this.info.building[0], this.info.unit[0])
        .then(response => {
          let houses = response.content.map(item => {
            return {
              name: item.houseName,
              value: item.id
            }
          })
          this.$set(this.dics, 'houses', [houses])
        })
    },

    // 获取字典值
    getDicValue(parentDicKey) {
      listByParentDicKey(parentDicKey)
        .then(response => {
          let dicData = []
          response.forEach(item => {
            dicData.push({
              name: item.dicValue,
              value: item.dicKey
            })
          })
          this.$set(this.dics, parentDicKey, [dicData])
        })
    }
  },
  created() {
    this.endDate = moment(Date.now()).format('YYYY-MM-DD')
    this.$set(this.dics, 'communitys', [this.equs])
    // 注入字典 
    this.getDicValue('gender')
    this.getDicValue('native')
  },
  computed: {
    ...mapGetters([
      'equs'
    ])
  },
  watch: {
    // 身份证文字识别结果
    '$route'(to, from) {
      if (from.path === '/takePhoto') {
        let wordsResult = this.$route.query.wordsResult
        this.info.name = wordsResult['姓名'].words
        this.info.gender = wordsResult['性别'].words === '男' ? ['1'] : ['2']
        this.info.cerNum = wordsResult['公民身份号码'].words
        this.info.birth = wordsResult['出生'].words.slice(0, 4) + '-' + wordsResult['出生'].words.slice(4, 6) + '-' + wordsResult['出生'].words.slice(6, 8)
        let native = this.dics.native[0].filter(item => {
          if (item.name === wordsResult['民族'].words + '族') {
            return item
          }
        })
        this.info.native = [native[0].value]
      }
    }
  }
}
</script>

<style lang='less' scoped>
.register {
  .takePhote {
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin-top: 10px;
    background-color: #fff;
    color: #999;
    .camera {
      font-size: 30px;
      margin-right: 10px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 14px;
    }
  }
  .next {
    width: 225px;
    margin-top: 50px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
  /deep/.weui-input {
    color: #999;
  }
  // x-input
  /deep/.vux-x-input .vux-input-icon {
    font-size: 16px;
  }
  /deep/.vux-input-icon.weui-icon-warn:before,
  .vux-input-icon.weui-icon-success:before {
    font-size: 16px;
  }
}
</style>