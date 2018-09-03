<template>
  <div class="register">

    <sub-header title="登记"></sub-header>

    <div class="content">
      <div class="scroll-wrapper">
        <scroll>

          <!-- 扫描二维码 -->
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">小区地址</label>
              </div>
              <div class="weui-cell__bd">
                <textarea class="weui-textarea"
                  readonly
                  v-model="location"></textarea>
              </div>
              <svg-icon class="icon-saoyisao"
                icon-class="scan"
                @click.native="scanCode" />
            </div>
          </div>

          <!-- 上传照片 -->
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__bd weui-cell_upload">
                <div class="picParent">
                  <div class="weui-uploader">
                    <div class="weui-uploader__hd">
                      <p class="weui-uploader__title">头像照片</p>
                      <div class="weui-uploader__info"></div>
                    </div>
                  </div>
                  <ktt-upload @click.native="clickUpload('head')"
                    @fileEntry-added="addFileEntry"></ktt-upload>
                </div>
                <div class="picParent">
                  <div class="weui-uploader">
                    <div class="weui-uploader__hd">
                      <p class="weui-uploader__title">身份证正面</p>
                      <div class="weui-uploader__info"></div>
                    </div>
                  </div>
                  <ktt-upload @click.native="clickUpload('front')"
                    @fileEntry-added="addFileEntry"></ktt-upload>
                </div>
                <div class="picParent">
                  <div class="weui-uploader">
                    <div class="weui-uploader__hd">
                      <p class="weui-uploader__title">身份证反面</p>
                      <div class="weui-uploader__info"></div>
                    </div>
                  </div>
                  <ktt-upload @click.native="clickUpload('back')"
                    @fileEntry-added="addFileEntry"></ktt-upload>
                </div>
              </div>
            </div>
          </div>

          <!-- 登记表单 -->
          <div v-for="(item, primary) in fieldInfo"
            :key="primary"
            class="form">
            <div class="weui-cells__title"
              @click="show(primary)">{{primary}}
              <svg-icon class="fr"
                icon-class="arrow_right"></svg-icon>
            </div>
            <div v-show="item.showContent">
              <group>
                <template v-for="(value, key) in item">
                  <popup-picker :title="value.desc"
                    v-if="value['type']==='dic'"
                    :data="dics[key]"
                    v-model="dicInfo[key]"
                    :show-name="true"
                    confirm-text="确定"
                    :key="key"></popup-picker>
                  <datetime :title="value.desc"
                    v-if="value['type']==='date'"
                    v-model="peopleInfo[key]"
                    confirm-text="确定"
                    required
                    :key="key"></datetime>
                  <x-input :title="value.desc"
                    v-if="value['type']==='input'"
                    v-model="peopleInfo[key]"
                    required
                    :key="key"></x-input>
                </template>
              </group>
            </div>
          </div>
          <div class="saveBox">
            <a href="javascript:"
              class="weui-btn save"
              @click="peopleinfoSave">保存</a>
          </div>
        </scroll>

      </div>
    </div>

  </div>
</template>

<script>
import subHeader from '@/components/subHeader'
import { Group, PopupPicker, Datetime, XInput } from 'vux'
import kttUpload from './upload/upload'
import { Msg } from '@/utils/msg'

import { listByParentDicKey } from '@/api/mgr/dic'
import { addPerson } from '@/api/community/person'

const fieldInfo = {
  '基本信息': {
    cerNum: {
      type: 'input',
      desc: '身份证号'
    },
    name: {
      type: 'input',
      desc: '姓名'
    },
    gender: {
      type: 'dic',
      desc: '性别'
    },
    birth: {
      type: 'date',
      desc: '出生日期'
    },
    native: {
      type: 'dic',
      desc: '民族'
    },
    phone: {
      type: 'input',
      desc: '手机号'
    },
    showContent: true
  },
  '户籍信息': {
    nation: {
      type: 'input',
      desc: '国籍'
    },
    place: {
      type: 'dic',
      desc: '籍贯'
    },
    showContent: false
  },
  '其它信息': {
    marriage: {
      type: 'dic',
      desc: '婚姻状态'
    },
    workunit: {
      type: 'input',
      desc: '工作单位'
    },
    political: {
      type: 'dic',
      desc: '政治面貌'
    },
    religion: {
      type: 'input',
      desc: '宗教信仰'
    },
    showContent: false
  },
  '流动人口信息': {
    defence_state: {
      type: 'dic',
      desc: '是否布防'
    },
    is_floating: {
      type: 'dic',
      desc: '是否流动人口'
    },
    key_person_prop: {
      type: 'dic',
      desc: '人员性质'
    },
    showContent: false
  }
}

const people = {
  facePic1: '',
  cerFront: '',
  cerBack: '',
  name: '',
  cerNum: '',
  birth: '',
  phone: '',
  nation: '',
  workunit: '',
  religion: ''
}
const dic = {
  gender: [],
  native: [],
  marriage: [],
  place: [],
  political: [],
  defence_state: [],
  is_floating: [],
  key_person_prop: []
}
const cardIden = {
  houseregisteraddress: '住址',
  cerNum: '公民身份号码',
  birth: '出生',
  name: '姓名',
  gender: '性别',
  native: '民族'
}
export default {
  name: 'register',
  data() {
    return {
      fieldInfo,
      dics: {
        marriage: [['未婚', '已婚', '离婚', '丧偶']]
      },
      peopleInfo: Object.assign({}, people),
      dicInfo: Object.assign({}, dic),
      cardIden,
      type: '',
      location: ''
    }
  },
  methods: {
    scanCode() {
      window.cordova.plugins.barcodeScanner.scan(result => {
        this.peopleInfo.policeRoomId = result.text.split(',')[0]
        this.location = result.text.split(',')[1]
      }, error => {
        Msg.error('调用失败 :' + error.code)
      }, {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: false, // Android, save scan history (default false)
          prompt: '将二维码放入框内', // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          // formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
          // orientation: 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        })
    },
    clickUpload(picType) {
      this.type = picType
    },
    addFileEntry(fileEntry) {
      let options = new window.FileUploadOptions()
      options.fileKey = 'file'
      options.fileName = fileEntry.name
      options.mimeType = 'text/plain'

      var params = {}
      params.type = this.type
      options.params = params

      let ft = new window.FileTransfer()
      ft.upload(fileEntry.toURL(), 'http://192.168.11.230:11000/baidu/recognize', result => {
        let info = JSON.parse(result.response)
        if (!info.message) {
          /* let path = JSON.parse(info.data)['imgUrl']
          if (params.type === 'head') {
            this.peopleInfo.facePic1 = path[0]
          }
          if (params.type === 'front') {
            this.peopleInfo.front_pic_url = path[0]
          }
          if (params.type === 'back') {
            this.peopleInfo.back_pic_url = path[0]
          } */
          // 身份证文字识别
          let wordsResult = info['words_result']
          for (let key in this.cardIden) {
            let wordResult = wordsResult[cardIden[key]]
            if (wordResult) {
              if (key === 'birth') {
                this.peopleInfo[key] = wordResult['words'].slice(0, 4) + '-' + wordResult['words'].slice(4, 6) + '-' + wordResult['words'].slice(6, 8)
              } else if (key === 'gender') {
                this.dicInfo[key] = wordResult['words'] === '男' ? ['1'] : ['2']
              } else if (key === 'native') {
                for (let key in this.dics.native[0]) {
                  if (this.dics.native[0][key]['name'] === wordResult['words'] + '族') {
                    this.dicInfo['native'] = [this.dics.native[0][key]['value']]
                    return
                  }
                }
              } else {
                this.peopleInfo[key] = wordResult['words']
              }
            }
          }
        } else {
          Msg.error(info.message)
        }
      }, (error) => {
        Msg.error('上传失败：' + error.code)
      }, options)
    },
    show(primary) {
      var temp = this.fieldInfo
      temp[primary].showContent = !temp[primary].showContent
    },
    peopleinfoSave() {
      let residentInfo = {
        sex: this.dicInfo.gender[0],
        personNative: this.dicInfo.native[0],
        marriage: this.dicInfo.marriage[0],
        residence: this.dicInfo.place[0],
        political: this.dicInfo.political[0],
        defenceState: this.dicInfo.defence_state[0],
        isFloating: this.dicInfo.is_floating[0],
        keyPersonProp: this.dicInfo.key_person_prop[0]
      }
      addPerson(Object.assign(this.peopleInfo, residentInfo))
        .then(response => {
          console.log(response)
        })
    },
    // 获取字典值
    getDicValue(parentDicKey) {
      listByParentDicKey(parentDicKey)
        .then(response => {
          let dicData = []
          response.forEach(item => {
            dicData.push({
              name: item.dicValue,
              value: item.dicKey
            })
          })
          this.$set(this.dics, parentDicKey, [dicData])
        })
    }
  },
  components: {
    subHeader,
    Group,
    PopupPicker,
    Datetime,
    XInput,
    kttUpload
  },
  created() {
    // 注入字典 
    this.getDicValue('gender')
    this.getDicValue('native')
    this.getDicValue('place')
    this.getDicValue('political')
    this.getDicValue('defence_state')
    this.getDicValue('is_floating')
    this.getDicValue('key_person_prop')
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin';

.register {
  height: 100%;
  background-color: #f8f8f8;
  .scroll-wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    .form {
      .weui-cell {
        font-size: 16px;
      }
    }
  }
  .icon-saoyisao {
    font-size: 30px;
  }
  .weui-uploader__title,
  .weui-label,
  p {
    font-size: 90%;
  }
  .weui-cell_upload {
    display: flex;
    justify-content: space-around;
    text-align: center;
    .picParent {
      position: relative;
    }
  }
  .saveBox {
    padding: 10px;
    .save {
      background-color: @theme-color;
      margin-bottom: 20px;
    }
  }
}
</style>
