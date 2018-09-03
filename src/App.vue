<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view/>
    </keep-alive> -->
    <!-- <transition :name="transitionName">
      <router-view/>
    </transition> -->
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </div>
</template>

<script>
import { getName } from '@/utils/auth'
import { getUserDetail } from '@/api/mgr/user'
import { getEquGroups } from '@/api/equ/equ'

export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route'(to, from) {
      // 切换动画
      const toIndex = to.meta.index
      const fromIndex = from.meta.index
      this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
      if (toIndex === 0 && fromIndex === 0) {
        this.transitionName = ''
      }
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
  will-change: transform;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
