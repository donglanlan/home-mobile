<template>
  <div class="cube-upload-file" @click="clickHandler">
    <slot>
      <div class="cube-upload-file-def" :style="fileStyle">
        <i class="cubeic-wrong" @click.stop="removeFile"></i>
        <div class="cube-upload-file-state" :class="fileStatusCls">
          <i class="cube-upload-file-status" :class="statusCls"></i>
          <span class="cube-upload-file-progress">{{fileProgress}}</span>
        </div>
      </div>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import {STATUS_SUCCESS, STATUS_ERROR} from './util'

  const COMPONENT_NAME = 'cube-upload-file'
  const STATUS_CLASS_MAP = {
    success: 'cubeic-right',
    error: 'cubeic-warn'
  }
  const EVENT_CLICK = 'click'

  export default {
    name: COMPONENT_NAME,
    props: {
      file: {
        type: Object,
        required: true
      }
    },
    computed: {
      fileStatusCls() {
        const file = this.file
        const status = file.status
        if (file.progress >= 0.01 || status === STATUS_SUCCESS || status === STATUS_ERROR) {
          return 'cube-upload-file_stat'
        }
      },
      fileStyle() {
        const url = this.file.url || this.file.base64
        if (!url) {
          return
        }
        return {
          'background-image': `url("${url}")`
        }
      },
      statusCls() {
        const status = this.file.status
        return STATUS_CLASS_MAP[status]
      },
      fileProgress() {
        if (this.statusCls) {
          return '100%'
        }
        const p = Math.min(Math.floor(this.file.progress * 100), 99)
        return `${p}%`
      }
    },
    methods: {
      clickHandler() {
        this.$emit(EVENT_CLICK, this.file)
      },
      removeFile() {
        this.$parent.removeFile(this.file)
      }
    }
  }
</script>
