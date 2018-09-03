import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/auth'

const login = r =>
  require.ensure([], () => r(require('@/views/login/login')), 'login')

const events = r =>
  require.ensure([], () => r(require('@/views/events/index')), 'events')
const search = r =>
  require.ensure([], () => r(require('@/views/events/search')), 'search')
const eventsDetail = r =>
  require.ensure([], () => r(require('@/views/events/detail')), 'eventsDetail')
const eventsShow = r =>
  require.ensure(
    [],
    () => r(require('@/views/events/eventsShow')),
    'eventsShow'
  )
const trace = r =>
  require.ensure([], () => r(require('@/views/events/trace')), 'trace')
const traceDetail = r =>
  require.ensure(
    [],
    () => r(require('@/views/events/trace/traceDetail')),
    'traceDetail'
  )

const infoManage = r =>
  require.ensure([], () => r(require('@/views/register/index')), 'infoManage')
const register = r =>
  require.ensure([], () => r(require('@/views/register/register')), 'register')
const register2 = r =>
  require.ensure(
    [],
    () => r(require('@/views/register/register2')),
    'register2'
  )
const takePhoto = r =>
  require.ensure(
    [],
    () => r(require('@/views/register/takePhoto')),
    'takePhoto'
  )

const defence = r =>
  require.ensure([], () => r(require('@/views/defence/index')), 'defence')
const searchDefence = r =>
  require.ensure(
    [],
    () => r(require('@/views/defence/searchDefence')),
    'searchDefence'
  )
const defenceDetail = r =>
  require.ensure(
    [],
    () => r(require('@/views/defence/defenceDetail')),
    'defenceDetail'
  )
const addDefence = r =>
  require.ensure(
    [],
    () => r(require('@/views/defence/addDefence')),
    'addDefence'
  )
const searchAll = r =>
  require.ensure([], () => r(require('@/views/defence/searchAll')), 'searchAll')
const allDetail = r =>
  require.ensure([], () => r(require('@/views/defence/allDetail')), 'allDetail')
const defenceSetting = r =>
  require.ensure(
    [],
    () => r(require('@/views/defence/defenceSetting')),
    'defenceSetting'
  )

const community = r =>
  require.ensure([], () => r(require('@/views/community/index')), 'community')
const communityInfo = r =>
  require.ensure(
    [],
    () => r(require('@/views/community/communityInfo')),
    'communityInfo'
  )
const communityIntro = r =>
  require.ensure(
    [],
    () => r(require('@/views/community/communityIntro')),
    'communityIntro'
  )
const keyPerson = r =>
  require.ensure(
    [],
    () => r(require('@/views/community/keyPerson')),
    'keyPerson'
  )
const keyPersonDetail = r =>
  require.ensure(
    [],
    () => r(require('@/views/community/keyPersonDetail')),
    'keyPersonDetail'
  )
const feedback = r =>
  require.ensure([], () => r(require('@/views/community/feedback')), 'feedback')
const about = r =>
  require.ensure([], () => r(require('@/views/community/about')), 'about')
const searchContent = r =>
  require.ensure(
    [],
    () => r(require('@/views/search/searchContent')),
    'searchContent'
  )

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/events'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/events',
      component: events,
      meta: {
        index: 0,
        keepAlive: true
      }
    },
    {
      path: '/search',
      component: search,
      meta: {
        index: 1
      }
    },
    {
      path: '/detail',
      component: eventsDetail,
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/trace',
      name: 'trace',
      component: trace,
      meta: {
        index: 2,
        keepAlive: true
      }
    },
    {
      path: '/traceDetail',
      component: traceDetail,
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/eventsShow',
      component: eventsShow,
      meta: {
        index: 2
      }
    },
    {
      path: '/infoManage',
      component: infoManage,
      meta: {
        index: 0
      }
    },
    {
      path: '/register',
      component: register,
      meta: {
        index: 1,
        keepAlive: true
      }
    },
    {
      path: '/register2',
      component: register2,
      meta: {
        index: 2
      }
    },
    {
      path: '/takePhoto',
      component: takePhoto,
      meta: {
        index: 2
      }
    },
    {
      path: '/defence',
      component: defence,
      meta: {
        index: 0,
        keepAlive: true
      }
    },
    {
      path: '/defenceDetail',
      component: defenceDetail,
      meta: {
        index: 4
      }
    },
    {
      path: '/searchDefence',
      component: searchDefence,
      meta: {
        index: 2,
        keepAlive: true
      }
    },
    {
      path: '/searchAll',
      component: searchAll,
      meta: {
        index: 2,
        keepAlive: true
      }
    },
    {
      path: '/allDetail',
      component: allDetail,
      meta: {
        index: 2,
        keepAlive: true
      }
    },
    {
      path: '/addDefence',
      component: addDefence,
      meta: {
        index: 1,
        keepAlive: true
      }
    },
    {
      path: '/defenceSetting',
      component: defenceSetting,
      meta: {
        index: 3
      }
    },
    {
      path: '/community',
      component: community,
      meta: {
        index: 0
      }
    },
    {
      path: '/communityInfo',
      component: communityInfo,
      name: 'communityInfo',
      meta: {
        index: 1
      }
    },
    {
      path: '/communityIntro',
      component: communityIntro,
      meta: {
        index: 2
      }
    },
    {
      path: '/keyPerson',
      component: keyPerson,
      meta: {
        index: 2,
        keepAlive: true
      }
    },
    {
      path: '/keyPersonDetail',
      component: keyPersonDetail,
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/feedback',
      component: feedback,
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      component: about
    },
    {
      path: '/searchContent',
      component: searchContent
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to:即将进入的目标路由对象
  // from:当前导航正要离开的路由
  // next:下一步执行的函数钩子
  // 登录验证
  if (to.path === '/login') {
    // 如果即将进入登录路由，则直接放行
    next()
  } else {
    // 进入的不是登录路由
    if (getToken()) {
      // 如果不需要登录验证，或者已经登录成功，则直接放行
      next()
    } else {
      // 下一跳路由需要登录验证，并且还未登录，则路由定向到登录路由
      next({ path: '/login' })
    }
  }

  // 前进刷新，后退不刷新
  let toIndex = to.meta.index
  let fromIndex = from.meta.index
  if (toIndex < fromIndex) {
    from.meta.keepAlive = false
    to.meta.keepAlive = true
  }
  next()
})

export default router
