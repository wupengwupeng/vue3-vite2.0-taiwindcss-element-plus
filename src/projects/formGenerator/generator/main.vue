<template>
  <div class="generator-main">
    <div class="left-board">
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              {{ item.title }}
            </div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div v-for="(element, index) in item.list" :key="index" class="components-item" @click="addComponent(element)">
                <div class="components-body">
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar" v-show="currentEditStatus">
        <el-button icon="el-icon-video-play" type="text" @click="execRun">预览</el-button>
        <el-button icon="el-icon-view" type="text" @click="showJson">查看json</el-button>
        <el-button v-preventReClick="2000" icon="el-icon-document-checked" type="text" @click="saveJson">保存</el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">清空</el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <div class="center-board-row">
          <div class="info-type">
            <el-tabs v-model="activeInfoName" type="card" :before-leave="handleInfoType">
              <template v-for="item in formBasicinfo.formTabs">
                <el-tab-pane :label="item.tabTitle" :name="item.tabField"></el-tab-pane>
              </template>
            </el-tabs>
          </div>
          <el-row :gutter="formConf.gutter">
            <el-form :size="formConf.size" :label-position="formConf.labelPosition" :disabled="formConf.disabled" :label-width="formConf.labelWidth + 'px'">
              <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
                <draggable-item
                  v-for="(item, index) in drawingList"
                  :key="item.renderKey"
                  :drawing-list="drawingList"
                  :current-item="item"
                  :index="index"
                  :active-id="activeId"
                  :form-conf="formConf"
                  :currentEditStatus="currentEditStatus"
                  @activeItem="activeFormItem"
                  @copyItem="drawingItemCopy"
                  @deleteItem="drawingItemDelete"
                />
              </draggable>
              <div v-show="!drawingList.length" class="empty-info">从左侧拖入或点选组件进行表单设计</div>
            </el-form>
          </el-row>
        </div>
      </el-scrollbar>
    </div>

    <right-panel v-if="!!drawingList.length" :active-data="activeData" :form-conf="formConf" :show-field="!!drawingList.length" @tag-change="tagChange" />

    <form-drawer :visible.sync="drawerVisible" :form-data="currentInfoTypeFormConf[activeInfoName]" size="60%" :generate-conf="generateConf" />
    <json-drawer size="60%" :visible.sync="jsonDrawerVisible" :json-str="JSON.stringify(formData)" @refresh="refreshJson" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { debounce } from '../utils'
import render from '../components/render/render'
import FormDrawer from './FormDrawer.vue'
import JsonDrawer from './JsonDrawer.vue'
import RightPanel from './RightPanel.vue'
import { inputComponents, selectComponents, formConf, commonComponents } from '../components/generator/config'
import { exportDefault, beautifierConf, isNumberStr, titleCase, deepClone } from '../utils/index'
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from '../components/generator/html'
import { makeUpJs } from '../components/generator/js'
import { makeUpCss } from '../components/generator/css'
import { drawingDefalut, applyUserGroup, formConfGroup } from '../components/generator/drawingDefalut'
import DraggableItem from './DraggableItem.vue'
import { getDrawingList, saveDrawingList, getIdGlobal, saveIdGlobal, getFormConf } from '../utils/db'
// import loadBeautifier from '@/components/formGenerator/utils/loadBeautifier'

// let beautifier
const emptyActiveData = { style: {}, autosize: {} }
let oldActiveId
let tempActiveData
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
const idGlobal = getIdGlobal()

export default {
  components: {
    draggable,
    render,
    FormDrawer,
    JsonDrawer,
    RightPanel,
    DraggableItem,
  },
  props: {
    fieldList: Object,
    getFormData: Object,
    currentFormConf: Object,
  },
  data() {
    return {
      idGlobal,
      formConf,
      applyUserGroup,
      formConfGroup,
      inputComponents,
      selectComponents,
      formBasicinfo: {
        formName: '',
        formKey: '',
        formDesc: '',
        formType: '',
        formTabs: [],
      },
      labelWidth: 100,
      drawingList: [],
      drawingData: {},
      activeId: '',
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: {
        fileName: undefined,
        type: 'file',
      },
      showFileName: false,
      activeData: {},
      saveDrawingListDebounce: debounce(340, saveDrawingList),
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      allLeftComponents: {},
      leftComponents: [
        {
          title: '原始组件',
          list: commonComponents.concat(inputComponents).concat(selectComponents),
        },
      ],
      activeInfoName: '',
      currentInfoTypeFormConf: {},
      currentEditStatus: true,
    }
  },
  computed: {},
  watch: {
    // eslint-disable-next-line func-names
    'activeData.__config__.label': function (val, oldVal) {
      if (this.activeData.placeholder === undefined || !this.activeData.__config__.tag || oldActiveId !== this.activeId) {
        return
      }
      this.activeData.placeholder = this.activeData.placeholder.replace(oldVal, '') + val
    },
    getFormData: {
      handler(val) {
        this.formBasicinfo = { ...this.formBasicinfo, ...val }
        if (this.formBasicinfo.formTabs.length) {
          this.activeInfoName = this.formBasicinfo.formTabs[0].tabField
        }
      },
      deep: true,
    },
    activeId: {
      handler(val) {
        oldActiveId = val
      },
      immediate: true,
    },
    // drawingList: {
    //   handler(val) {
    //     this.saveDrawingListDebounce(val);
    //     if (val.length === 0) this.idGlobal = 100;
    //   },
    //   deep: true,
    // },
    idGlobal: {
      handler(val) {
        this.saveIdGlobalDebounce(val)
      },
      immediate: true,
    },
    fieldList: {
      handler(val) {
        this.allLeftComponents = val
        this.handleInfoType(this.activeInfoName)
      },
      deep: true,
    },
    currentFormConf: {
      handler(val) {
        const clone = JSON.parse(JSON.stringify(val))
        let currentTab = clone[this.activeInfoName]
        this.drawingList = currentTab.fields
        this.formConf = currentTab.formConf
        this.currentInfoTypeFormConf = clone
        this.activeFormItem(currentTab.fields[0])

        let allKeys = Object.keys(this.currentInfoTypeFormConf)
        allKeys.forEach(key => {
          let fields = this.currentInfoTypeFormConf[key].fields
          let maxId = 100
          for (let i = 0; i < fields.length; i++) {
            let field = fields[i]
            if (maxId < field.__config__.formId) {
              maxId = field.__config__.formId
            }
          }

          for (let i = 0; i < fields.length; i++) {
            let field1 = fields[i]
            for (let j = i + 1; j < fields.length; j++) {
              let field2 = fields[j]
              if (field1.__config__.formId == field2.__config__.formId) {
                maxId = maxId + 1
                field2.__config__.formId = maxId
                console.log('出现重复formId 已更新', key, field1.__config__.formId, i, j)
              }
            }
          }
        })
      },
      deep: true,
    },
  },
  created() {
    if (this.$route.params.status == 'detail') {
      this.currentEditStatus = false
    } else if (this.$route.params.status == 'add' || this.$route.params.status == 'edit') {
      this.currentEditStatus = true
    }
    if (this.getFormData) {
      this.formBasicinfo = { ...this.formBasicinfo, ...this.getFormData }
      if (this.formBasicinfo.formTabs.length) {
        this.activeInfoName = this.formBasicinfo.formTabs[0].tabField
        this.handleInfoType(this.activeInfoName)
      }
    }
    if (this.currentFormConf) {
      if (Object.keys(this.currentFormConf).length === 0) return
      const clone = JSON.parse(JSON.stringify(this.currentFormConf))
      let currentTab = clone[this.activeInfoName]
      this.drawingList = currentTab.fields
      this.formConf = currentTab.formConf
      this.currentInfoTypeFormConf = clone
      this.activeFormItem(currentTab.fields[0])
    }
  },
  mounted() {
    // if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
    //   this.drawingList = drawingListInDB;
    // } else {
    //   this.drawingList = drawingDefalut;
    // }
    // this.activeFormItem(this.drawingList[0]);
    // if (formConfInDB) {
    //   this.formConf = formConfInDB;
    // }
    // loadBeautifier(btf => {
    //   beautifier = btf
    // })
  },
  methods: {
    activeFormItem(currentItem) {
      this.activeData = currentItem
      this.activeId = currentItem.__config__.formId
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
    },
    handleInfoType(activeName, oldActiveName) {
      if (this.fieldList != undefined && Object.keys(this.allLeftComponents).length === 0) return
      if (this.leftComponents.length > 1) {
        this.leftComponents.shift()
      }
      if (['case_employee', 'case_employer'].includes(activeName)) {
        this.leftComponents.unshift(this.allLeftComponents.applicants)
      }
      if (['case_agent'].includes(activeName)) {
        this.leftComponents.unshift(this.allLeftComponents.agents)
      }
      if (['case_request_layout', 'case_request_text_layout', 'case_fact_reason_layout', 'case_mediate_direction_layout', 'case_upload_protocol_layout'].includes(activeName)) {
        this.leftComponents.unshift(this.allLeftComponents.lawCase)
      }
      if (['upload_evidence'].includes(activeName)) {
        this.leftComponents.unshift(this.allLeftComponents.proofList)
      }
      this.AssembleFormData(oldActiveName)
      if (this.currentInfoTypeFormConf[activeName]) {
        this.drawingList = this.currentInfoTypeFormConf[activeName]['fields']
        this.formConf = this.currentInfoTypeFormConf[activeName]['formConf']
        this.drawingList.length && this.activeFormItem(this.drawingList[0])
      } else {
        this.drawingList = []
      }
      return true
    },
    addComponent(item) {
      if (item.__config__.layout == 'groupFormItem') {
        this.drawingList = this.applyUserGroup
        this.formConf = this.formConfGroup
        this.activeFormItem(this.applyUserGroup[0])
      } else {
        const clone = this.cloneComponent(item)
        this.drawingList.push(clone)
        this.activeFormItem(clone)
      }
    },
    cloneComponent(origin) {
      const clone = deepClone(origin)
      const config = clone.__config__
      config.span = this.formConf.span // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone)
      clone.placeholder !== undefined && (clone.placeholder += config.label)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey(item) {
      const config = item.__config__
      config.formId = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        item.__vModel__ = item.__vModel__ || ''
        // item.__vModel__ = item.__vModel__ || `field${this.idGlobal}`;
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        delete config.label // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    AssembleFormData(target, type) {
      let templateFormData = null
      this.formData = {
        fields: deepClone(this.drawingList),
        ...this.formConf,
      }
      if (target) {
        if (type) {
          templateFormData = { fields: deepClone(this.drawingList), formConf: deepClone(this.formConf) }
          templateFormData.fields.forEach(item => {
            item.__config__.authStatus = { showLabel: true, editLabel: true }
            if (item.__config__.children) {
              item.__config__.children.forEach(child => {
                child.__config__.authStatus = item.__config__.authStatus
              })
            }
          })
          this.currentInfoTypeFormConf[target] = templateFormData
        } else {
          templateFormData = { fields: deepClone(this.drawingList), formConf: deepClone(this.formConf) }
          this.currentInfoTypeFormConf[target] = templateFormData
        }
      }
    },
    generate(data) {
      const func = this[`exec${titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    },
    execRun(data) {
      this.AssembleFormData(this.activeInfoName, 'run')
      this.drawerVisible = true
    },
    execCopy(data) {
      document.getElementById('copyNode').click()
    },
    empty() {
      this.$confirm('确定要清空当前的所有组件吗？', '提示', { type: 'warning' }).then(() => {
        this.drawingList = []
        this.idGlobal = 100
      })
    },
    drawingItemCopy(item, list) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      list.push(clone)
      this.activeFormItem(clone)
    },
    drawingItemDelete(index, list) {
      list.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    generateCode() {
      const { type } = this.generateConf
      this.AssembleFormData()
      const script = vueScript(makeUpJs(this.formData, type))
      const html = vueTemplate(makeUpHtml(this.formData, type))
      const css = cssStyle(makeUpCss(this.formData))
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    showJson() {
      this.AssembleFormData()
      this.jsonDrawerVisible = true
    },
    saveJson() {
      this.AssembleFormData(this.activeInfoName)
      this.$emit('submitForm', this.currentInfoTypeFormConf)
    },
    run() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'run'
    },
    copy() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'copy'
    },
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag)
      const config = newTag.__config__
      newTag.__vModel__ = this.activeData.__vModel__
      config.formId = this.activeId
      config.span = this.activeData.__config__.span
      this.activeData.__config__.tag = config.tag
      this.activeData.__config__.tagIcon = config.tagIcon
      this.activeData.__config__.document = config.document
      if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
        config.defaultValue = this.activeData.__config__.defaultValue
      }
      Object.keys(newTag['__config__']).forEach(key => {
        if (this.activeData['__config__'][key] !== undefined) {
          newTag['__config__'][key] = this.activeData['__config__'][key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.__config__.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach(item => {
          if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children)
        })
      }
    },
    refreshJson(data) {
      this.drawingList = deepClone(data.fields)
      delete data.fields
      this.formConf = data
    },
  },
}
</script>

<style lang="scss">
$selectedColor: #f6f7ff;
$lighterBlue: #409eff;

.generator-main {
  position: relative;
  width: 100%;
  height: 100%;
}

.components-list {
  padding: 8px;
  box-sizing: border-box;
  height: 100%;
  .components-item {
    display: inline-block;
    width: 95%;
    margin: 2%;
    transition: transform 0ms !important;
  }
}
.components-draggable {
  padding-bottom: 20px;
}
.components-title {
  font-size: 14px;
  color: #222;
  margin: 6px 2px;
  .svg-icon {
    color: #666;
    font-size: 18px;
  }
}

.components-body {
  padding: 8px 10px;
  background: $selectedColor;
  font-size: 12px;
  cursor: move;
  border: 1px dashed $selectedColor;
  border-radius: 3px;
  .svg-icon {
    color: #777;
    font-size: 15px;
  }
  &:hover {
    border: 1px dashed #787be8;
    color: #787be8;
    .svg-icon {
      color: #787be8;
    }
  }
}

.left-board {
  height: 100%;
  width: 130px;
  position: absolute;
  left: 0;
  top: 0;
}
.left-scrollbar {
  height: 100%;
  overflow: hidden;
}
.center-scrollbar {
  height: calc(100% - 42px);
  overflow: hidden;
  border-left: 1px solid #f1e8e8;
  border-right: 1px solid #f1e8e8;
  box-sizing: border-box;
}
.center-board {
  height: 100%;
  width: auto;
  margin: 0 350px 0 130px;
  box-sizing: border-box;
}
.empty-info {
  position: absolute;
  top: 46%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 18px;
  color: #ccb1ea;
  letter-spacing: 4px;
}
.action-bar {
  position: relative;
  height: 42px;
  text-align: right;
  padding: 0 15px;
  box-sizing: border-box;
  border: 1px solid #f1e8e8;
  border-top: none;
  .delete-btn {
    color: #f56c6c;
  }
}
.logo-wrapper {
  position: relative;
  height: 42px;
  background: #fff;
  border-bottom: 1px solid #f1e8e8;
  box-sizing: border-box;
}

.center-board-row {
  height: 100%;
  padding: 12px 12px 15px 12px;
  box-sizing: border-box;
  .el-row {
    height: calc(100% - 42px);
    overflow-y: scroll;
  }
}
.drawing-board {
  height: 100%;
  position: relative;
  .components-body {
    padding: 0;
    margin: 0;
    font-size: 0;
  }
  .sortable-ghost {
    position: relative;
    display: block;
    overflow: hidden;
    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 3px;
      background: rgb(89, 89, 223);
      z-index: 2;
    }
  }
  .components-item.sortable-ghost {
    width: 100%;
    height: 60px;
    background-color: $selectedColor;
  }
  .active-from-item {
    & > .el-form-item {
      background: $selectedColor;
      border-radius: 6px;
    }
    & > .drawing-item-copy,
    & > .drawing-item-delete {
      display: initial;
    }
    & > .component-name {
      color: $lighterBlue;
    }
  }
  .el-form-item {
    margin-bottom: 15px;
  }
}
.drawing-item {
  position: relative;
  cursor: move;
  &.unfocus-bordered:not(.active-from-item) > div:first-child {
    border: 1px dashed #ccc;
  }
  .el-form-item {
    padding: 12px 10px;
  }
}
.drawing-row-item {
  position: relative;
  cursor: move;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  border-radius: 3px;
  padding: 0 2px;
  margin-bottom: 15px;
  .drawing-row-item {
    margin-bottom: 2px;
  }
  .el-col {
    margin-top: 22px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .drag-wrapper {
    min-height: 80px;
  }
  &.active-from-item {
    border: 1px dashed $lighterBlue;
  }
  .component-name {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #bbb;
    display: inline-block;
    padding: 0 6px;
  }
}
.drawing-item,
.drawing-row-item {
  &:hover {
    & > .el-form-item {
      background: $selectedColor;
      border-radius: 6px;
    }
    & > .drawing-item-copy,
    & > .drawing-item-delete {
      display: initial;
    }
  }
  & > .drawing-item-copy,
  & > .drawing-item-delete {
    display: none;
    position: absolute;
    top: -10px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    border: 1px solid;
    cursor: pointer;
    z-index: 1;
  }
  & > .drawing-item-copy {
    right: 56px;
    border-color: $lighterBlue;
    color: $lighterBlue;
    background: #fff;
    &:hover {
      background: $lighterBlue;
      color: #fff;
    }
  }
  & > .drawing-item-delete {
    right: 24px;
    border-color: #f56c6c;
    color: #f56c6c;
    background: #fff;
    &:hover {
      background: #f56c6c;
      color: #fff;
    }
  }
}
</style>
