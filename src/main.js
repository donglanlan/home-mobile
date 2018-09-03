// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vux/src/styles/reset.less'
import 'vux/src/styles/weui/weui.less'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { Style, Scroll, Upload } from 'cube-ui'

Vue.component('scroll', Scroll)

import '@/styles/index.less'
import './icons' // icon

Vue.config.productionTip = false

// 加入cordova
let cordovaJsPath = null
if (window.location.protocol === 'file:') {
  // 文件打包到app
  cordovaJsPath = 'cordova.js'
} else {
  // 文件从远程服务器上获取
  // 安卓平台
  if (navigator.userAgent.match(/Android/i)) {
    cordovaJsPath = 'static/android/platform_www/cordova.js'
  }
}
if (cordovaJsPath != null) {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', cordovaJsPath)
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
