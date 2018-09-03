import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import { loginByUsername } from '@/api/login'
import { getEquGroups } from '@/api/equ/equ'
import { getToken, setToken, removeToken, setName } from '@/utils/auth'
import { Load } from '@/utils/msg'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    name: '',
    equs: [],
    checkedEqu: {},
    userInfo: {},
    
    /* roles: [],    
    equId: '',
    equIds: '', */
  },
  getters: {
    token: state => state.token,
    name: state => state.name,
    equs: state => state.equs,
    checkedEqu: state => state.checkedEqu,
    userInfo: state => state.userInfo,
    
    /* equId: state => state.equ,
    equIds: state => state.equIds, */
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_EQUS: (state, equs) => {
      state.equs = equs
    },
    SET_CHECKEDEQU: (state, checkedEqu) => {
      state.checkedEqu = checkedEqu
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },

    /* SET_ROLES: (state, roles) => {
      state.roles = roles
    },    
    SET_EQUID: (state, equId) => {
      state.equId = equId
    },
    SET_EQUIDS: (state, equIds) => {
      state.equIds = equIds
    }  */   
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      Load.show('登录中')
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const token = response.token_type + ' ' + response.access_token
            commit('SET_TOKEN', token)
            commit('SET_NAME', username)
            setToken(token)
            setName(username)
            console.log(token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
})

export default store
