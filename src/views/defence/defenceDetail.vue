<template>
  <div>

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
          <group>
            <cell title="公共区域布控"
              is-link>{{defence.publicAreaNum ? defence.publicAreaNum + '处' : '无'}}</cell>
            <cell title="大门布控"
              is-link>{{defence.doorNum ? defence.doorNum + '处' : '无'}}</cell>
            <cell title="停车库布控"
              is-link>{{defence.parkNum ? defence.parkNum + '处' : '无'}}</cell>
          </group>

        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { Group, Cell } from 'vux'
import { mapGetters } from 'vuex'
import { getDefenceChannel } from '@/api/face/faceChannel'

export default {
  name: '',
  components: {
    homeHeader,
    Group,
    Cell
  },
  data() {
    return {
      detail: this.$route.query.detail,
      defence: {}
    }
  },
  methods: {
    imgError() {
      this.detail.basePerson.facePic1 = require('../../static/image/error.jpg')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    getDefenceChannel({communityId: this.checkedEqu.value, personId: this.detail.personId})
      .then(response => {
        this.defence = response
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
</style>