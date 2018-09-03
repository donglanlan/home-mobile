import Vue from 'vue'
import { LoadingPlugin, ToastPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

export let Msg = {
  success(msg) {
    Vue.$vux.toast.show({
      type: 'success',
      text: msg
    })
  },

  error(msg) {
    Vue.$vux.toast.show({
      type: 'warn',
      text: msg
    })
  }
}

export let Load = {
  show(msg) {
    Vue.$vux.loading.show({
      text: msg
    })
  },
  hide() {
    Vue.$vux.loading.hide()
  }
}
