<template>
  <div>
    <el-drawer v-bind="$attrs" @opened="onOpen" @close="onClose" :append-to-body="true">
      <div style="height: 100%">
        <div class="right-preview">
          <div class="action-bar" :style="{ 'text-align': 'left' }">
            <span class="bar-btn delete-btn" @click="$emit('update:visible', false)"> <i class="el-icon-circle-close" />关闭 </span>
          </div>
          <div class="preivew-wrap">
            <parser v-if="isRefreshCode" :form-conf="formData" @submit="sumbitForm1" />
          </div>
          <div v-show="!isIframeLoaded" v-loading="true" class="result-wrapper" />
          {{ demoformdata }}
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { parse } from '@babel/parser'
import parser from '../components/parser/index.js'

export default {
  components: { parser },
  props: ['formData', 'generateConf'],
  data() {
    return {
      activeTab: 'html',
      htmlCode: '',
      jsCode: '',
      cssCode: '',
      codeFrame: '',
      isIframeLoaded: true,
      isInitcode: false, // 保证open后两个异步只执行一次runcode
      isRefreshCode: false, // 每次打开都需要重新刷新代码
      resourceVisible: false,
      scripts: [],
      links: [],
      demoformdata: null,
    }
  },
  methods: {
    onOpen() {
      if (!this.isInitcode) {
        this.isRefreshCode = true
        this.isIframeLoaded && (this.isInitcode = true)
      }
    },
    onClose() {
      this.isInitcode = false
      this.isRefreshCode = false
    },
    sumbitForm1(data) {
      this.demoformdata = data
      console.log('sumbitForm1提交数据：', data)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
.tab-editor {
  position: absolute;
  top: 33px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
}
.left-editor {
  position: relative;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}
.setting {
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}
.right-preview {
  height: 100%;
  .preivew-wrap {
    padding: 20px;
  }
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
@include action-bar;
::v-deep .el-drawer__header {
  display: none;
}
</style>
