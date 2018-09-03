<template>
  <div class="home">

    <home-header title="布控通知"
      :backFlag="false"
      :scanFlag="true"></home-header>

    <div class="content">

      <!-- 搜索框 -->
      <div class="searchBox">
        <div class="search"
          @click="$router.push('/search')">
          <svg-icon class="icon-search"
            icon-class="search" />
          <span>请输入姓名</span>
        </div>
      </div>

      <div class="scroll-wrapper">
        <scroll ref="scroll">
          <div class="descItem"
            id="1"
            @click="$router.push('/eventsShow')">
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
                  @click.native.stop="$router.push({name: 'trace', params: {id: '40288bae64c541840164c544f3e70002'}})">历史轨迹</x-button>
              </div>
            </div>
            <div class="badge">2</div>
          </div>
          <div class="descItem"
            id="2"
            @click="$router.push('/eventsShow')">
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
                  @click.native.stop="$router.push({name: 'trace', params: {id: '40288bae64c541840164c544f3e70002'}})">历史轨迹</x-button>
              </div>
            </div>
            <div class="badge">2</div>
          </div>
          <div class="descItem"
            id="3"
            @click="$router.push('/eventsShow')">
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
                  @click.native.stop="$router.push({name: 'trace', params: {id: '40288bae64c541840164c544f3e70002'}})">历史轨迹</x-button>
              </div>
            </div>
            <div class="badge">2</div>
          </div>
          <div class="descItem"
            id="4"
            @click="$router.push('/eventsShow')">
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
                  @click.native.stop="$router.push({name: 'trace', params: {id: '40288bae64c541840164c544f3e70002'}})">历史轨迹</x-button>
              </div>
            </div>
            <div class="badge">2</div>
          </div>
          <div class="descItem"
            id="5"
            @click="$router.push('/eventsShow')">
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
                  @click.native.stop="$router.push({name: 'trace', params: {id: '40288bae64c541840164c544f3e70002'}})">历史轨迹</x-button>
              </div>
            </div>
            <div class="badge">2</div>
          </div>
        </scroll>
      </div>

    </div>

    <foot-guide></foot-guide>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import footGuide from '@/components/footer'
import { getAlarmList } from '@/api/equ/alarm'
import { Load } from '@/utils/msg'
import { getName } from '@/utils/auth'
import { getUserDetail } from '@/api/mgr/user'
import { getEquGroups } from '@/api/equ/equ'
import { XButton } from 'vux'

export default {
  name: '',
  components: {
    homeHeader,
    footGuide,
    XButton
  },
  data() {
    return {
      eventsList: [],
      listQuery: {
        page: 0,
        size: 5,
        equGroupIds: 'COMMUNITY_LJY'
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
    },
    async getEqus() {
      try {
        let name = getName()
        let res = await getUserDetail(name)
        this.$store.commit('SET_USERINFO', res)
        // 获取用户拥有权限的小区
        let response = await getEquGroups(name, res.roleIds.join())
        let equs = response.map(item => {
          return {
            name: item.equName,
            value: item.id
          }
        })
        this.$store.commit('SET_EQUS', equs)
        this.$store.commit('SET_CHECKEDEQU', equs[0])
        /* let equIds = response.map(item => {
          return item.id
        })
        this.$store.commit('SET_EQUIDS', equIds) */
      } catch (err) {
        alert(err)
      }
    }
  },
  created() {
    this.getEqus()
    // Load.show('正在加载...')
    // this.getList()
    // this.getUserInfo()
  },
  watch: {
    // 锚点定位
    $route(to, from) {
      if (from.path === '/keyPersonDetail' && to.path === '/events') {
        let id = this.$route.query.id
        let anchor = document.getElementById(id)
        this.$refs.scroll.scrollTo(0, -(anchor.offsetTop))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  overflow: hidden;
  background-color: #ebebeb;
  .searchBox {
    height: 50px;
    background-color: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
    color: #999;
    .search {
      padding: 0 12px;
      height: 100%;
      line-height: 30px;
      background-color: #f2f2f2;
      border-radius: 5px;
      font-size: 12px;
      .icon-search {
        font-size: 16px;
      }
    }
  }
  .scroll-wrapper {
    top: 50px;
    .subtitle {
      color: #999;
    }
    .text {
      font-size: 12px;
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
    .badge {
      width: 15px;
      height: 15px;
      line-height: 15px;
      border-radius: 50%;
      font-size: 10px;
      text-align: center;
      background-color: #f4423e;
      color: #fff;
      position: absolute;
      top: 0;
      right: 15px;
    }
  }
}
</style>