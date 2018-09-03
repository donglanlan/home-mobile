<template>
  <div>
    <home-header title="反馈"></home-header>
    <div class="subContent">
      <div class="title">反馈类型</div>
      <checker v-model="labelCheck"
        type="radio"
        selected-item-class="checked">
        <div class="selection">
          <checker-item :value="1">
            <span>功能建议</span>
          </checker-item>
          <checker-item :value="2">
            <span>BUG反馈</span>
          </checker-item>
          <checker-item :value="3">
            <span>其他问题</span>
          </checker-item>
        </div>
      </checker>
      <div class="title">反馈内容</div>
      <textarea class="question" placeholder="请填写您的建议或在使用中遇到的问题"></textarea>
      <box gap="10px">
        <x-button class="submit" type="primary">提交</x-button>
      </box>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import { Checker, CheckerItem, Box, XButton } from 'vux'

export default {
  name: '',
  components: {
    homeHeader,
    Checker,
    CheckerItem,
    Box,
    XButton
  },
  data() {
    return {
      labelCheck: 1
    }
  },
  methods: {},
  created() { }
}
</script>

<style lang='less' scoped>
@import '../../styles/mixin';

.title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #666;
  padding-left: 10px;
}
.selection {
  height: 83px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .vux-checker-item {
    width: 74px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    border: 1px solid #9e9e9e;
    border-radius: 5px;
    margin-left: 25px;
    font-size: 13px;
  }
  .checked {
    color: @theme-color;
    border-color: @theme-color;
  }
  .vux-tap-active:active {
    background-color: #fff;
  }
}
.question {
  color: #333;
  width: 100%;
  height: 128px;
  padding: 16px;
  box-sizing: border-box;
  border: none;
  outline: none;
  resize: none;
  &::-webkit-input-placeholder {
    color: #9e9e9e;
  }
}
/* .submit {
  position: absolute;
  top: 0;
  border-radius: 0;
} */
</style>