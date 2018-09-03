<template>
  <div class="detail">
    <home-header title="基本信息"></home-header>

    <div class="subContent" v-if="detail">
      <div class="scroll-wrapper">
        <scroll ref="scroll">
          <div class="descItem">
            <img src="../../static/image/test.jpg">
            <div class="describe">
              <p>
                <span>姓名</span>
                <span class="text">{{detail.name}}</span>
                <span class="text">{{checkedEqu.name}}</span>
              </p>
              <p>
                <span>性别</span>
                <span class="text">{{detail.sexValue}}</span>
              </p>
              <p>
                <span>年龄</span>
                <span class="text">{{detail.age}}</span>
              </p>
              <p>
                <span>民族</span>
                <span class="text">{{detail.personNativeValue}}</span>
              </p>
            </div>
          </div>
          <ul>
            <li>
              <p>布控类型</p>
              <span>{{detail.keyPersonPropValue}}</span>
            </li>
            <li>
              <p>身份证号</p>
              <span>{{detail.cerNum}}</span>
            </li>
            <li>
              <p>房间号</p>
              <span v-if="detail.baseHouses[0]">{{detail.baseHouses[0].buildingName + detail.baseHouses[0].unitName + detail.baseHouses[0].houseName}}</span>
            </li>
            <li>
              <p>手机号</p>
              <span>11111111111</span>
            </li>
          </ul>
        </scroll>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import homeHeader from '@/components/homeHeader'
import { getDetail } from '@/api/community/person'

export default {
  name: '',
  components: {
    homeHeader
  },
  data() {
    return {
      detail: null
    }
  },
  methods: {},
  created() {
    let id = this.$route.query.id
    getDetail({communityId: this.checkedEqu.value, personId: id})
      .then(response => {
        this.detail = response
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
.subContent {
  color: #999;
  .text {
    margin-left: 10px;
  }
  ul {
    margin-top: 10px;
    li {
      height: 44px;
      line-height: 44px;
      padding-left: 15px;
      font-size: 15px;
      border-bottom: 1px solid #dddbdb;
      background-color: #fff;
      display: flex;
      p {
        width: 110px;
      }
      span {
        font-size: 13px;
        color: #333;
      }
    }
  }
}
</style>