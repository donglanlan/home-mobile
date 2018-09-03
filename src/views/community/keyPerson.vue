<template>
  <div>

    <div class="homeHeader">
      <div class="head-wrapper">
        <div class="back"
          @click="goBack">
          <svg-icon icon-class="back" />
        </div>
        <span>重点人员</span>
        <span class="filter"
          @click="flag=true, maskFlag=true">筛选</span>
      </div>
    </div>

    <!-- 筛选功能 -->
    <transition :name="flag ? 'fade_in' : 'fade_out'">
      <div class="filterBox"
        v-show="flag">

        <div class="filterTitle">选择标签</div>
        <checker v-model="labelCheck"
          type="checkbox"
          selected-item-class="checked">
          <div class="filterSelect">
            <checker-item :value="item.dicKey"
              v-for="(item, index) in dics"
              :key="index">
              <span>{{item.dicValue}}</span>
            </checker-item>
          </div>
        </checker>
        <div class="confirm">
          <div class="cannel"
            @click="cannel">取消</div>
          <div class="ensure"
            @click="filter">确定</div>
        </div>
      </div>
    </transition>

    <!-- 遮罩 -->
    <div class="mask"
      @click="flag=false, maskFlag=false"
      v-show="maskFlag"></div>

    <div class="subContent">
      <div class="scroll-wrapper">
        <component :is="name" :filter="labelCheck" ref="filter"></component>
      </div>
    </div>

  </div>
</template>

<script>
import { Load } from '@/utils/msg'
import { XDialog, Group, Cell, Checker, CheckerItem } from 'vux'
import allKeyPerson from './components/allKeyPerson'
import filterKeyPerson from './components/filterKeyPerson'

import { listByParentDicKey } from '@/api/mgr/dic'

export default {
  name: '',
  components: {
    XDialog,
    Group,
    Cell,
    Checker,
    CheckerItem,
    allKeyPerson,
    filterKeyPerson
  },
  data() {
    return {
      flag: false,
      maskFlag: false,
      labelCheck: [],
      dics: null,
      name: ''
    }
  },
  methods: {    
    cannel() {
      this.flag = false
      this.maskFlag = false
      this.labelCheck = []
    },
    filter() {
      if (this.labelCheck.length) {
        this.name = 'filterKeyPerson'
        this.$refs.filter.reset()
        this.$refs.filter.getList()
      }
      this.flag = false
      this.maskFlag = false
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.name = 'allKeyPerson'
    // 注入字典 
    listByParentDicKey('key_person_prop')
      .then(response => {
        this.dics = response
      })
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/mixin';

.filter {
  position: absolute;
  right: 15px;
  font-size: 14px;
}


// 筛选
.filterBox {
  width: 90%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  color: #2e2e2e;
  z-index: 999;
  .filterTitle {
    margin-left: 12px;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
  }
  .filterSelect {
    margin-left: 12px;
    .vux-checker-item {
      width: 47%;
      font-size: 12px;
      height: 36px;
      line-height: 36px;
      margin: 0 2% 20px 0;
      border-radius: 118px;
      text-align: center;
    }
  }
  .checked {
    background: #f2f2f2;
  }
  .confirm {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #f2f2f2;
    display: flex;
    .cannel {
      flex: 1;
      color: #757575;
      font-weight: 700;
      text-align: center;
    }
    .ensure {
      flex: 1;
      color: #fff;
      font-weight: 700;
      text-align: center;
      background-color: @theme-color;
    }
  }
}

//遮罩
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
}
// 筛选动画
.fade_in-enter {
  transform: translateX(100%);
}
.fade_in-leave-to {
  transform: translateX(-90%);
}
.fade_in-enter-active,
.fade_in-leave-active {
  transition: all 0.5s ease;
}
.fade_out-enter {
  transform: translateX(-90%);
}
.fade_out-leave-to {
  transform: translateX(100%);
}
.fade_out-enter-active,
.fade_out-leave-active {
  transition: all 0.5s ease;
}
</style>