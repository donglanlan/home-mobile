<template>

  <div class="scroll-wrapper">
    <img src="./bg.jpg"
      style="width: 100%">

    <scroll>
      <group>
        <cell v-for="(item, index) in equs"
          :key="index"
          :title="item.equName"
          :link="{name: 'communityInfo', params: {
        title: item.equName, id: item.id
      }}"></cell>
      </group>
    </scroll>
  </div>

</template>

<script>
import {
  Group,
  Cell
} from 'vux'
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  components: {
    Group,
    Cell
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'equs'
    ])
  }
}
</script>

<style lang='less' scoped>
.scroll-wrapper {
  background-color: #fff;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>