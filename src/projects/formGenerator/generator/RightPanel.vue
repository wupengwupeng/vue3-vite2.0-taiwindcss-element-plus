<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <!-- <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <i class="el-icon-link" />
      </a> -->
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="currentTab==='field' && showField" size="small" label-width="120px">
          <el-form-item v-if="activeData.__config__.changeTag" label="组件类型">
            <el-select
              v-model="activeData.__config__.tagIcon"
              placeholder="请选择组件类型"
              :style="{width: '100%'}"
              @change="tagChange"
            >
              <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.__config__.label"
                  :label="item.__config__.label"
                  :value="item.__config__.tagIcon"
                >
                  <span> {{ item.__config__.label }}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="显示隐藏关联">
            <el-switch v-model="activeData.__config__.visibleControl" @change="changeVisibleControl"/>
          </el-form-item>
          <template v-if="activeData.__config__.visibleControl">
            <el-divider>显示隐藏关联</el-divider>
            <el-form-item label="关联字段">
                <el-input v-model="activeData.__config__.visible.data" placeholder="请输入关联字段" />
            </el-form-item>
            <el-form-item label="可见值">
                <el-input v-model="activeData.__config__.visible.value" placeholder="请输入可见状态的值" />
            </el-form-item>
            <el-form-item label="名称关联" v-if="activeData.__config__.tagIcon != 'row'">
              <el-switch v-model="activeData.__config__.labelControl"/>
            </el-form-item>
            <el-form-item label="必填关联" v-if="activeData.__config__.tagIcon != 'row'">
              <el-switch v-model="activeData.__config__.requiredControl" />
            </el-form-item>
            <template v-if="activeData.__config__.labelControl">
              <el-divider>名称关联设置</el-divider>
              <template v-if="activeData.__config__.varLabel">
                <template v-for="(key) in Object.keys(activeData.__config__.varLabel)">
                  <div class="panels-select-item">
                    <el-input placeholder="关联值" size="small" :value="key" disabled/>
                    <el-input placeholder="名称" size="small" :value="activeData.__config__.varLabel[key]" disabled/>
                    <div class="close-btn select-line-icon" @click="removeDicKey(activeData.__config__.varLabel, key)">
                      <i class="el-icon-remove-outline" />
                    </div>
                  </div>
                </template>
              </template>
              <div v-if="!varLabel.add" class="panels-select-item">
                <el-button icon="el-icon-circle-plus-outline" type="text" @click="addLabel(0)">
                  添加名称关联
                </el-button>
              </div>
              <template  v-else>
                <div class="panels-select-item">
                  <el-input placeholder="关联值" size="small" v-model="varLabel.key" />
                  <el-input placeholder="名称" size="small" v-model="varLabel.value" />
                </div>
                <el-button type="text" @click="addLabel(1)">确定</el-button>
                <el-button type="text"  @click="varLabel.add = false">取消</el-button>
              </template>
            </template>
            <template v-if="activeData.__config__.requiredControl">
              <el-divider>必填关联设置</el-divider>
              <template v-if="activeData.__config__.requiredConfig">
                <template v-for="(key) in Object.keys(activeData.__config__.requiredConfig)">
                  <div class="panels-select-item">
                    <label class="el-form-item__label">{{key}}</label>
                    <el-switch :value="activeData.__config__.requiredConfig[key]" disabled />
                    <div class="close-btn select-line-icon" @click="removeDicKey(activeData.__config__.requiredConfig, key)">
                      <i class="el-icon-remove-outline" />
                    </div>
                  </div>
                </template>
              </template>
              <div v-if="!requiredControl.add" class="panels-select-item">
                <el-button icon="el-icon-circle-plus-outline" type="text" @click="addRequired(0)">
                  添加必填关联
                </el-button>
              </div>
              <template v-else>
                <div class="panels-select-item">
                  <el-input placeholder="关联值" size="small" v-model="requiredControl.key" />
                  是否必填 <el-switch v-model="requiredControl.value" />
                </div>
                <el-button type="text" @click="addRequired(-1)">确定</el-button>
                <el-button type="text"  @click="requiredControl.add = false">取消</el-button>
              </template>
            </template>
            <el-divider></el-divider>
          </template>
          <el-form-item v-if="activeData.__vModel__!==undefined" label="字段名">
             <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.componentName!==undefined" label="组件名">
            {{ activeData.__config__.componentName }}
          </el-form-item>
          <el-form-item v-if="activeData.__config__.extendField" label="扩展字段名">
            <!-- <el-input v-model="activeData.__config__.extendField" placeholder="请输入扩展字段名" /> -->
            {{activeData.__config__.extendField}}
          </el-form-item>
          <el-form-item v-if="activeData.__config__.label!==undefined" label="标题">
            <el-input v-model="activeData.__config__.label" placeholder="请输入标题" @input="changeRenderKey" />
          </el-form-item>
          <el-form-item label="占位提示">
            <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" @input="changeRenderKey" />
          </el-form-item>
          <el-form-item v-if="activeData['start-placeholder']!==undefined" label="开始占位">
            <el-input v-model="activeData['start-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData['end-placeholder']!==undefined" label="结束占位">
            <el-input v-model="activeData['end-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.span!==undefined" label="表单栅格">
            <el-slider v-model="activeData.__config__.span" :max="24" :min="1" :marks="{12:''}" @change="spanChange" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.layout==='rowFormItem'&&activeData.gutter!==undefined" label="栅格间隔">
            <el-input-number v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.layout==='rowFormItem'&&activeData.type!==undefined" label="布局模式">
            <el-radio-group v-model="activeData.type">
              <el-radio-button label="default" />
              <el-radio-button label="flex" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.justify!==undefined&&activeData.type==='flex'" label="水平排列">
            <el-select v-model="activeData.justify" placeholder="请选择水平排列" :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in justifyOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.align!==undefined&&activeData.type==='flex'" label="垂直排列">
            <el-radio-group v-model="activeData.align">
              <el-radio-button label="top" />
              <el-radio-button label="middle" />
              <el-radio-button label="bottom" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.labelWidth!==undefined" label="标签宽度">
            <el-input v-model.number="activeData.__config__.labelWidth" type="number" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item v-if="activeData.style&&activeData.style.width!==undefined" label="组件宽度">
            <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
          </el-form-item>
          <el-form-item v-if="activeData.__vModel__!==undefined" label="默认值">
            <el-input
              :value="setDefaultValue(activeData.__config__.defaultValue)"
              placeholder="请输入默认值"
              @input="onDefaultValueInput"
            />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.defaultValidate!==undefined" label="校验提示">
            <el-input v-model="activeData.__config__.defaultValidate" placeholder="请输入校验提示内容"/>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.className!==undefined" label="类选择器">
            <el-input v-model="activeData.__config__.className" placeholder="请输入类选择器名称"/>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag==='el-checkbox-group'" label="至少应选">
            <el-input-number
              :value="activeData.min"
              :min="0"
              placeholder="至少应选"
              @input="$set(activeData, 'min', $event?$event:undefined)"
            />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag==='el-checkbox-group'" label="最多可选">
            <el-input-number
              :value="activeData.max"
              :min="0"
              placeholder="最多可选"
              @input="$set(activeData, 'max', $event?$event:undefined)"
            />
          </el-form-item>
          <el-form-item v-if="activeData.__slot__&&activeData.__slot__.prepend!==undefined" label="前缀">
            <el-input v-model="activeData.__slot__.prepend" placeholder="请输入前缀" />
          </el-form-item>
          <el-form-item v-if="activeData.__slot__&&activeData.__slot__.append!==undefined" label="后缀">
            <el-input v-model="activeData.__slot__.append" placeholder="请输入后缀" />
          </el-form-item>
          <el-form-item v-if="activeData['prefix-icon']!==undefined" label="前图标">
            <el-input v-model="activeData['prefix-icon']" placeholder="请输入前图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData['suffix-icon'] !== undefined" label="后图标">
            <el-input v-model="activeData['suffix-icon']" placeholder="请输入后图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData['icon']!==undefined && activeData.__config__.tag === 'el-button'"
            label="按钮图标"
          >
            <el-input v-model="activeData['icon']" placeholder="请输入按钮图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="选项分隔符">
            <el-input v-model="activeData.separator" placeholder="请输入选项分隔符" />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="最小行数">
            <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="最小行数" />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="最大行数">
            <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="最大行数" />
          </el-form-item>
          <el-form-item v-if="isShowMin" label="最小值">
            <el-input-number v-model="activeData.min" placeholder="最小值" />
          </el-form-item>
          <el-form-item v-if="isShowMax" label="最大值">
            <el-input-number v-model="activeData.max" placeholder="最大值" />
          </el-form-item>
          <el-form-item v-if="activeData.height!==undefined" label="组件高度">
            <el-input-number v-model="activeData.height" placeholder="高度" @input="changeRenderKey" />
          </el-form-item>
          <el-form-item v-if="isShowStep" label="步长">
            <el-input-number v-model="activeData.step" placeholder="步数" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="精度">
            <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="按钮位置">
            <el-radio-group v-model="activeData['controls-position']">
              <el-radio-button label="">
                默认
              </el-radio-button>
              <el-radio-button label="right">
                右侧
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData.maxlength !== undefined" label="最多输入">
            <el-input v-model="activeData.maxlength" placeholder="请输入字符长度">
              <template slot="append">
                个字符
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData['active-text'] !== undefined" label="开启提示">
            <el-input v-model="activeData['active-text']" placeholder="请输入开启提示" />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-text'] !== undefined" label="关闭提示">
            <el-input v-model="activeData['inactive-text']" placeholder="请输入关闭提示" />
          </el-form-item>
          <el-form-item v-if="activeData['active-value'] !== undefined" label="开启值">
            <el-input
              :value="setDefaultValue(activeData['active-value'])"
              placeholder="请输入开启值"
              @input="onSwitchValueInput($event, 'active-value')"
            />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-value'] !== undefined" label="关闭值">
            <el-input
              :value="setDefaultValue(activeData['inactive-value'])"
              placeholder="请输入关闭值"
              @input="onSwitchValueInput($event, 'inactive-value')"
            />
          </el-form-item>
          <el-form-item
            v-if="activeData.type !== undefined && 'el-date-picker' === activeData.__config__.tag"
            label="时间类型"
          >
            <el-select
              v-model="activeData.type"
              placeholder="请选择时间类型"
              :style="{ width: '100%' }"
              @change="dateTypeChange"
            >
              <el-option
                v-for="(item, index) in dateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.name !== undefined" label="文件字段名">
            <el-input v-model="activeData.name" placeholder="请输入上传文件字段名" />
          </el-form-item>
          <el-form-item v-if="activeData.accept !== undefined" label="文件类型">
            <el-select
              v-model="activeData.accept"
              placeholder="请选择文件类型"
              :style="{ width: '100%' }"
              clearable
            >
              <el-option label="图片" value="image/*" />
              <el-option label="视频" value=".ogm,.wmv,.mpeg,.asx,.mpg,.ogv,.webm,.mov,.mp4,.m4v,.avi" />
              <el-option label="音频" value=".weba,.webm,.opus,.flac,.m4a,.ogg,.wav,.oga,.mid,.mp3,.aiff,.wma,.au" />
              <el-option label="音视频" value=".weba,.webm,.opus,.flac,.m4a,.ogg,.wav,.oga,.mid,.mp3,.aiff,.wma,.au,ogm,.wmv,.mpeg,.asx,.mpg,.ogv,.webm,.mov,.mp4,.m4v,.avi" />
              <el-option label="excel" value=".xls,.xlsx" />
              <el-option label="word" value=".doc,.docx" />
              <el-option label="pdf" value=".pdf" />
              <el-option label="txt" value=".txt" />
              <el-option label="图片、pdf" value="image/*,.pdf" />
              <el-option label="图片、word、pdf" value=".jpg,.jpeg,.png,.doc,.docx,.pdf" />
              <el-option label="证据类型" value=".jpg,.jpeg,.png,.doc,.docx,.pdf,.xls,.xlsx,.weba,.m4a,.wav,.mp3,.wmv,.mov,.mp4,.m4v,.avi" />
              <el-option label="文书类型.doc,.docx,.pdf" value=".doc,.docx,.pdf" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.fileSize !== undefined" label="文件大小">
            <el-input v-model.number="activeData.__config__.fileSize" placeholder="请输入文件大小">
              <el-select slot="append" v-model="activeData.__config__.sizeUnit" :style="{ width: '66px' }">
                <el-option label="KB" value="KB" />
                <el-option label="MB" value="MB" />
                <el-option label="GB" value="GB" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.action !== undefined" label="上传地址">
            <el-input v-model="activeData.action" placeholder="请输入上传地址" clearable />
          </el-form-item>
          <el-form-item v-if="activeData.limit !== undefined"  label="允许上传个数">
            <el-input-number v-model="activeData.limit" :min="0" placeholder="上传个数" />
          </el-form-item>
          <el-form-item v-if="activeData['list-type'] !== undefined" label="列表类型">
            <el-radio-group v-model="activeData['list-type']" size="small">
              <el-radio-button label="text">
                text
              </el-radio-button>
              <el-radio-button label="picture">
                picture
              </el-radio-button>
              <el-radio-button label="picture-card">
                picture-card
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="activeData.type !== undefined && activeData.__config__.tag === 'el-button'"
            label="按钮类型"
          >
            <el-select v-model="activeData.type" :style="{ width: '100%' }">
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
              <el-option label="text" value="text" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.buttonText !== undefined"
            v-show="'picture-card' !== activeData['list-type']"
            label="按钮文字"
          >
            <el-input v-model="activeData.__config__.buttonText" placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.tag === 'el-button'"
            label="按钮文字"
          >
            <el-input v-model="activeData.__slot__.default" placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item v-if="activeData['range-separator'] !== undefined" label="分隔符">
            <el-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
          </el-form-item>
          <el-form-item v-if="activeData['picker-options'] !== undefined" label="时间段">
            <el-input
              v-model="activeData['picker-options'].selectableRange"
              placeholder="请输入时间段"
            />
          </el-form-item>
          <el-form-item v-if="activeData.format !== undefined" label="时间格式">
            <el-input
              :value="activeData.format"
              placeholder="请输入时间格式"
              @input="setTimeValue($event)"
            />
          </el-form-item>
          <template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeData.__config__.tag) > -1">
            <el-divider>选项</el-divider>
            <el-form-item label="数据类型">
              <el-radio-group v-model="activeData.__config__.dataType" size="small">
                <el-radio-button label="local">
                  读取文件
                </el-radio-button>
                <el-radio-button label="dynamic">
                  动态
                </el-radio-button>
                <el-radio-button label="static">
                  静态
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <template v-if="activeData.__config__.dataType === 'local'">
              <el-input placeholder="请输入字典值" v-model="activeData.__config__.parentCode" class="input-with-select">
              </el-input>
            </template>
            <template v-if="activeData.__config__.dataType === 'dynamic'">
                 <el-input placeholder="请输入查询字典值" v-model="activeData.__config__.parentCode" class="input-with-select">
                    <el-button v-preventReClick="2000" slot="append" icon="el-icon-search" @click="searchParentCode"></el-button>
                </el-input>
            </template>
            <draggable
                :list="activeData.__slot__.options"
                :animation="340"
                group="selectItem"
                handle=".option-drag"
                >
                <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="panels-select-item">
                    <div class="select-line-icon option-drag">
                    <i class="el-icon-s-operation" />
                    </div>
                    <el-input v-model="item.label" placeholder="选项名" size="small" />
                    <el-input
                    placeholder="选项值"
                    size="small"
                    :value="item.value"
                    @input="setOptionValue(item, $event)"
                    />
                    <div class="close-btn select-line-icon" @click="activeData.__slot__.options.splice(index, 1)">
                    <i class="el-icon-remove-outline" />
                    </div>
                </div>
            </draggable>
            <div style="margin-left: 20px;">
                <el-button
                    style="padding-bottom: 0"
                    icon="el-icon-circle-plus-outline"
                    type="text"
                    @click="addSelectItem"
                >
                    添加选项
                </el-button>
            </div>
            <el-divider />
          </template>

          <template v-if="['el-cascader'].indexOf(activeData.__config__.tag) > -1">
            <el-divider>选项</el-divider>
            <el-form-item label="数据类型">
              <el-radio-group v-model="activeData.__config__.dataType" size="small">
                <el-radio-button label="dynamic">
                  动态数据
                </el-radio-button>
                <el-radio-button label="static">
                  静态数据
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <template v-if="activeData.__config__.dataType === 'dynamic'">
              <el-form-item label="接口地址">
                <el-input
                  v-model="activeData.__config__.url"
                  :title="activeData.__config__.url"
                  placeholder="请输入接口地址"
                  clearable
                >
                  <el-select
                    slot="prepend"
                    v-model="activeData.__config__.method"
                    :style="{width: '85px'}"
                  >
                    <el-option label="get" value="get" />
                    <el-option label="post" value="post" />
                    <el-option label="put" value="put" />
                    <el-option label="delete" value="delete" />
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="数据位置">
                <el-input v-model="activeData.__config__.dataKey" placeholder="请输入标签键名" />
              </el-form-item>
              <el-form-item label="标签键名">
                <el-input v-model="activeData.props.props.label" placeholder="请输入标签键名" />
              </el-form-item>
              <el-form-item label="值键名">
                <el-input v-model="activeData.props.props.value" placeholder="请输入值键名" />
              </el-form-item>
              <el-form-item label="子级键名">
                <el-input v-model="activeData.props.props.children" placeholder="请输入子级键名" />
              </el-form-item>
            </template>
            <!-- 级联选择静态树 -->
            <el-tree
              v-if="activeData.__config__.dataType === 'static'"
              draggable
              :data="activeData.options"
              node-key="id"
              :expand-on-click-node="false"
              :render-content="renderContent"
            />
            <div v-if="activeData.__config__.dataType === 'static'" style="margin-left: 20px">
              <el-button
                style="padding-bottom: 0"
                icon="el-icon-circle-plus-outline"
                type="text"
                @click="addTreeItem"
              >
                添加父级
              </el-button>
            </div>
            <el-divider />
          </template>
          <template  v-if="activeData.__config__.APPLICANT">
            <el-divider>申请人特殊配置</el-divider>
            <el-form-item label="开启特殊配置">
              <el-switch v-model="activeData.__config__.APPLICANT.useable" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.APPLICANT.useable" label="必填设置">
              <el-switch v-model="activeData.__config__.APPLICANT.required" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.APPLICANT.useable" label="隐藏字段">
              <el-switch v-model="activeData.__config__.APPLICANT.hidden" />
            </el-form-item>
          </template>
          <template v-if="activeData.__config__.RESPONDENT">
            <el-divider>被申请人特殊配置</el-divider>
            <el-form-item label="开启特殊配置">
              <el-switch v-model="activeData.__config__.RESPONDENT.useable" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.RESPONDENT.useable" label="必填设置">
              <el-switch v-model="activeData.__config__.RESPONDENT.required" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.RESPONDENT.useable" label="隐藏字段">
              <el-switch v-model="activeData.__config__.RESPONDENT.hidden" />
            </el-form-item>
          </template>
          <template v-if="activeData.__config__.THIRD">
            <el-divider>第三人特殊配置</el-divider>
            <el-form-item label="开启特殊配置">
              <el-switch v-model="activeData.__config__.THIRD.useable" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.THIRD.useable" label="必填设置">
              <el-switch v-model="activeData.__config__.THIRD.required" />
            </el-form-item>
            <el-form-item v-if="activeData.__config__.THIRD.useable" label="隐藏字段">
              <el-switch v-model="activeData.__config__.THIRD.hidden" />
            </el-form-item>
          </template>
<!--            <el-divider>权限</el-divider>-->
<!--            <template v-if="activeData.__config__.authority">-->
<!--                <template v-for="(item,index) in Object.keys(activeData.__config__.authority)">-->
<!--                <el-form-item :key="'auth'+index" :label="activeData.__config__.authority[item].name">-->
<!--                    <el-switch v-model="activeData.__config__.authority[item].showLabel" active-text="查看"></el-switch>-->
<!--                    <el-switch v-show="activeData.__config__.authority[item].showLabel" v-model="activeData.__config__.authority[item].editLabel" active-text="编辑" :disabled="!activeData.__config__.authority[item].showLabel"></el-switch>-->
<!--                </el-form-item>-->
<!--                </template>-->
<!--            </template>-->
<!--            <template v-else>-->
<!--                <el-button icon="el-icon-circle-plus-outline" type="text">添加权限</el-button>-->
<!--            </template>-->
            <!-- <div v-for="(item, index) in authority.eventList" :key="index" class="panels-select-item">
                <el-input v-model="item.key" readonly  size="small" />
                <el-input v-model="item.value" readonly  size="small" />
                <div class="close-btn select-line-icon" @click="addEvent(index)">
                    <i class="el-icon-remove-outline" />
                </div>
            </div> -->

          <template>
            <el-divider>事件</el-divider>
              <div v-for="(item, index) in onEvent.eventList" :key="index" class="panels-select-item">
                <el-input v-model="item.key" readonly  size="small" />
                <el-input v-model="item.value" readonly  size="small" />
                <div class="close-btn select-line-icon" @click="addEvent(index)">
                  <i class="el-icon-remove-outline" />
                </div>
              </div>
            <div v-show="onEvent.add" class="panels-select-item">
                <el-select v-model="onEvent.key" placeholder="事件名"  size="small">
                    <el-option key="click" label="click" value="click"></el-option>
                    <el-option key="change" label="change" value="change"></el-option>
                    <el-option key="focus" label="focus" value="focus"></el-option>
                    <el-option key="select" label="select" value="select"></el-option>
                </el-select>
                <el-input placeholder="方法名或表达式" size="small" v-model="onEvent.value" />
            </div>
            <template v-if="onEvent.add">
                <el-button v-if="onEvent.add" type="text" @click="addEvent(-1)">确定</el-button>
                <el-button type="text"  @click="onEvent.add = false">取消</el-button>
            </template>
            <el-button v-else icon="el-icon-circle-plus-outline" type="text" @click="onEvent.add = true">
                添加事件监听器
            </el-button>
            <el-divider />
          </template>

          <el-form-item v-if="activeData.__config__.optionType !== undefined" label="选项样式">
            <el-radio-group v-model="activeData.__config__.optionType">
              <el-radio-button label="default">
                默认
              </el-radio-button>
              <el-radio-button label="button">
                按钮
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData['active-color'] !== undefined" label="开启颜色">
            <el-color-picker v-model="activeData['active-color']" />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-color'] !== undefined" label="关闭颜色">
            <el-color-picker v-model="activeData['inactive-color']" />
          </el-form-item>

          <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签"
          >
            <el-switch v-model="activeData.__config__.showLabel" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tagIcon == 'input'" label="数字组件">
            <el-switch v-model="activeData.isNumberType" @input="changeTypeKey" />
          </el-form-item>
          <el-form-item v-if="activeData.branding !== undefined" label="品牌烙印">
            <el-switch v-model="activeData.branding" @input="changeRenderKey" />
          </el-form-item>
          <el-form-item v-if="activeData['allow-half'] !== undefined" label="允许半选">
            <el-switch v-model="activeData['allow-half']" />
          </el-form-item>
          <el-form-item v-if="activeData['show-text'] !== undefined" label="辅助文字">
            <el-switch v-model="activeData['show-text']" @change="rateTextChange" />
          </el-form-item>
          <el-form-item v-if="activeData['show-score'] !== undefined" label="显示分数">
            <el-switch v-model="activeData['show-score']" @change="rateScoreChange" />
          </el-form-item>
          <el-form-item v-if="activeData['show-stops'] !== undefined" label="显示间断点">
            <el-switch v-model="activeData['show-stops']" />
          </el-form-item>
          <el-form-item v-if="activeData.range !== undefined" label="范围选择">
            <el-switch v-model="activeData.range" @change="rangeChange" />
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.border !== undefined && activeData.__config__.optionType === 'default'"
            label="是否带边框"
          >
            <el-switch v-model="activeData.__config__.border" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-color-picker'" label="颜色格式">
            <el-select
              v-model="activeData['color-format']"
              placeholder="请选择颜色格式"
              :style="{ width: '100%' }"
              clearable
              @change="colorFormatChange"
            >
              <el-option
                v-for="(item, index) in colorFormatOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="activeData.size !== undefined &&
              (activeData.__config__.optionType === 'button' ||
                activeData.__config__.border ||
                activeData.__config__.tag === 'el-color-picker' ||
                activeData.__config__.tag === 'el-button')"
            label="组件尺寸"
          >
            <el-radio-group v-model="activeData.size">
              <el-radio-button label="medium">
                中等
              </el-radio-button>
              <el-radio-button label="small">
                较小
              </el-radio-button>
              <el-radio-button label="mini">
                迷你
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData['show-word-limit'] !== undefined" label="输入统计">
            <el-switch v-model="activeData['show-word-limit']" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="严格步数">
            <el-switch v-model="activeData['step-strictly']" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="任选层级">
            <el-switch v-model="activeData.props.props.checkStrictly" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="是否多选">
            <el-switch v-model="activeData.props.props.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="展示全路径">
            <el-switch v-model="activeData['show-all-levels']" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="可否筛选">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.clearable !== undefined" label="能否清空">
            <el-switch v-model="activeData.clearable" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.showTip !== undefined" label="显示提示">
            <el-switch v-model="activeData.__config__.showTip" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-upload'" label="多选文件">
            <el-switch v-model="activeData.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-upload'" label="启用拖拽">
            <el-switch v-model="activeData.drag" />
          </el-form-item>
          <el-form-item v-if="activeData['auto-upload'] !== undefined" label="自动上传">
            <el-switch v-model="activeData['auto-upload']" />
          </el-form-item>
          <el-form-item v-if="activeData.readonly !== undefined" label="是否只读">
            <el-switch v-model="activeData.readonly" />
          </el-form-item>
          <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
            <el-switch v-model="activeData.disabled" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-select'" label="能否搜索">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-select'" label="远程搜索">
            <el-switch v-model="activeData.remote" @change="remoteChanged"/>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-select'" label="是否多选">
            <el-switch v-model="activeData.multiple" @change="multipleChange" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.required !== undefined" label="是否必填">
            <el-switch v-model="activeData.__config__.required" />
          </el-form-item>
          <el-form-item label="是否自动去空格">
            <el-switch v-model="activeData.__config__.autoTrim" />
          </el-form-item>
          <el-form-item label="是否自定组件">
            <el-switch v-model="activeData.__config__.custom" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.custom" label="组件名称">
            <el-radio-group v-model="activeData.__config__.customName">
              <el-radio-button label="areaSelect">
              </el-radio-button>
              <el-radio-button label="areaSearch">
              </el-radio-button>
              <el-radio-button label="customUpload">
            </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <template v-if="activeData.__config__.layoutTree">
            <el-divider>布局结构树</el-divider>
            <el-tree
              :data="[activeData.__config__]"
              :props="layoutTreeProps"
              node-key="renderKey"
              default-expand-all
              draggable
            >
              <span slot-scope="{ node, data }">
                <span class="node-label">
                  <svg-icon class="node-icon" :icon-class="data.__config__?data.__config__.tagIcon:data.tagIcon" />
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </template>

          <template v-if="Array.isArray(activeData.__config__.regList)">
            <el-divider>正则校验</el-divider>
            <div
              v-for="(item, index) in activeData.__config__.regList"
              :key="item.message"
              class="reg-item"
            >
              <span class="close-btn" @click="activeData.__config__.regList.splice(index, 1)">
                <i class="el-icon-close" />
              </span>
              <el-form-item label="表达式">
                <el-input v-model="item.pattern" placeholder="请输入正则" />
              </el-form-item>
              <el-form-item label="错误提示" style="margin-bottom:0">
                <el-input v-model="item.message" placeholder="请输入错误提示" />
              </el-form-item>
            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                添加规则
              </el-button>
            </div>
          </template>
        </el-form>
        <!-- 表单属性 -->
        <el-form v-show="currentTab === 'form'" size="small" label-width="90px">
          <el-form-item label="表单名">
            <el-input v-model="formConf.formRef" placeholder="请输入表单名（ref）" />
          </el-form-item>
          <el-form-item label="表单模型">
            <el-input v-model="formConf.formModel" placeholder="请输入数据模型" />
          </el-form-item>
          <el-form-item label="校验模型">
            <el-input v-model="formConf.formRules" placeholder="请输入校验模型" />
          </el-form-item>
          <el-form-item label="默认规则">
            <el-input v-model="formConf.defalutRules" placeholder="请输入默认字段" />
          </el-form-item>
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="formConf.size">
              <el-radio-button label="medium">
                中等
              </el-radio-button>
              <el-radio-button label="small">
                较小
              </el-radio-button>
              <el-radio-button label="mini">
                迷你
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left">
                左对齐
              </el-radio-button>
              <el-radio-button label="right">
                右对齐
              </el-radio-button>
              <el-radio-button label="top">
                顶部对齐
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input v-model.number="formConf.labelWidth" type="number" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item label="禁用表单">
            <el-switch v-model="formConf.disabled" />
          </el-form-item>
          <el-form-item label="表单新增">
            <el-switch v-model="formConf.addStatus" />
          </el-form-item>
          <el-form-item label="表单按钮">
            <el-switch v-model="formConf.formBtns" />
          </el-form-item>
          <el-form-item label="显示未选中组件边框">
            <el-switch v-model="formConf.unFocusedComponentBorder" />
          </el-form-item>
          <el-form-item label="表单方法">
            <el-input type="textarea" :rows="10" v-model="formConf.__methods__" placeholder="请输入表单组件方法" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

    <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />
    <icons-dialog :visible.sync="iconsVisible" :current="activeData[currentIconModel]" @select="setIcon" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import '../icons'
import { isArray } from 'util'
import TreeNodeDialog from './TreeNodeDialog'
import { isNumberStr } from '../utils/index'
import IconsDialog from './IconsDialog'
import svgIcon from '../components/SvgIcon/index'
import {
  inputComponents, selectComponents
} from '../components/generator/config'
import { saveFormConf } from '../utils/db'

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

export default {
  components: {
    'svg-icon': svgIcon,
    TreeNodeDialog,
    IconsDialog,
    draggable
  },
  props: ['showField', 'activeData', 'formConf'],
  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        {
          label: '月范围(monthrange)',
          value: 'monthrange'
        },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ],
      layoutTreeProps: {
        label(data, node) {
          const config = data.__config__
          return data.componentName || `${config.label}: ${data.__vModel__}`
        }
      },
      authority:{
        extentOptions: [
          {
            value: 'app',
            label: '申请方'
          },{
            value: 'rep',
            label: '被申请方'
          },{
            value: 'med',
            label: '调解员'
          }
        ],
        APPLICANT: {
          showLabel: false,
          editLabel: false,
        },
        MEDIATOR: {
          showLabel: false,
          editLabel: false,
        },
        showList: [],
        editList: [],

      },
      onEvent:{
          add: false,
          key: "",
          value: "",
          eventList: []
      },
      varLabel:{
          add: true,
          key: "",
          value: ""
      },
      requiredControl:{
          add: true,
          key: "",
          value: true,
      }
    }
  },
  computed: {
    documentLink() {
      return (
        this.activeData.__config__.document
        || 'https://element.eleme.cn/#/zh-CN/component/installation'
      )
    },
    dateOptions() {
      if (
        this.activeData.type !== undefined
        && this.activeData.__config__.tag === 'el-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    },
    tagList() {
      return [
        {
          label: '输入型组件',
          options: inputComponents
        },
        {
          label: '选择型组件',
          options: selectComponents
        }
      ]
    },
    activeTag() {
      return this.activeData.__config__.tag
    },
    isShowMin() {
      return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1
    },
    isShowMax() {
      return ['el-input-number', 'el-slider', 'el-rate'].indexOf(this.activeTag) > -1
    },
    isShowStep() {
      return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1
    }
  },
  watch: {
    'activeData': {
      handler(val,oldval) {
          this.resetForm(val,oldval)
      },
      deep: true
    }
  },
  mounted(){
      this.resetForm(this.activeData)
  },
  methods: {
    resetForm(data,olddata){
        if(data.on){
            this.onEvent.eventList = []
            Object.keys(data.on).forEach(item => {
                this.onEvent.eventList.push({key: item, value: data.on[item]})
            })
        }else {
            this.onEvent.eventList = []
        };
        if(Object.getOwnPropertyNames(Object.assign({},data.__config__.varLabel))!=0){
            Object.keys(data.__config__.varLabel).forEach(item => {
                this.varLabel.key = item, this.varLabel.value = data.__config__.varLabel[item]
            })
            this.varLabel.add = false
        }else {
            this.varLabel.add = true
        };
        if(Object.getOwnPropertyNames(Object.assign({},data.__config__.requiredConfig))!=0){
            this.requiredControl = {...this.requiredControl, ...data.__config__.requiredConfig}
            this.requiredControl.add = false
        }else {
            this.requiredControl.add = true
        }
    },
    addReg() {
      this.activeData.__config__.regList.push({
        pattern: '',
        message: ''
      })
    },
    changeVisibleControl() {
      console.log('changeVisibleControl', this.activeData.__config__.visible)
      if (!this.activeData.__config__.visible) this.activeData.__config__.visible = {data: '', value: ''}
    },
    addSelectItem() {
      this.activeData.__slot__.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem() {
      ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      )
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node, data) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData.__config__, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    spanChange(val) {
      this.formConf.span = val
    },
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
    },
    remoteChanged(val) {
      this.activeData['allow-create'] = val
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    rangeChange(val) {
      this.$set(
        this.activeData.__config__,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      )
    },
    rateTextChange(val) {
      if (val) this.activeData['show-score'] = false
    },
    rateScoreChange(val) {
      if (val) this.activeData['show-text'] = false
    },
    colorFormatChange(val) {
      this.activeData.__config__.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
    },
    openIconsDialog(model) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val
    },
    tagChange(tagIcon) {
      let target = inputComponents.find(item => item.__config__.tagIcon === tagIcon)
      if (!target) target = selectComponents.find(item => item.__config__.tagIcon === tagIcon)
      this.$emit('tag-change', target)
    },
    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.__config__.tag)) {
        this.activeData.__config__.renderKey = +new Date()
      }
    },
    changeTypeKey(val) {
      if (val) {
        this.activeData.type = 'number'
      } else {
        this.activeData.type = 'text'
      }
      this.$forceUpdate()
    },
    addEvent(index){
        if(~index){
            this.onEvent.eventList.splice(index, 1)
        }else{
            this.onEvent.add = false
            this.onEvent.eventList.push({key: this.onEvent.key,value: this.onEvent.value})
        }
        let templatedata = {}
        this.onEvent.eventList.forEach(element => {
            templatedata = {...templatedata,...{[element.key]:element.value}}
            // this.$set(this.activeData.on,element.key,element.value)
        });
        this.activeData.on = templatedata
    },
    addLabel(index){
        if(index === 0){
            this.varLabel.add = true
            this.varLabel.key = ""
            this.varLabel.value = ""
        }else{
          if (!this.activeData.__config__.varLabel) this.activeData.__config__.varLabel = {}
            this.varLabel.add = false
            if (this.varLabel.key) {
              this.activeData.__config__.varLabel[this.varLabel.key] = this.varLabel.value
            }
        }
    },
    removeDicKey(dic, item) {
      delete dic[item]
      this.$forceUpdate()
    },
    addRequired(index){
        if(~index){
            this.requiredControl.add = true
            this.requiredControl.key = ""
            this.requiredControl.value = true
        }else{
            this.requiredControl.add = false
          if (!this.activeData.__config__.requiredConfig) this.activeData.__config__.requiredConfig = {}
          this.activeData.__config__.requiredConfig[this.requiredControl.key] = this.requiredControl.value
        }
    },
    searchParentCode(){
        this.$api['basic/getGroupNameByParentCode']({
            "parentCode": this.activeData.__config__.parentCode,
        }).then(data=>{
            data.forEach(item => {
                this.activeData.__slot__.options.push({label: item.name, value: item.code})
            })
        });
    }
  }
}
</script>
<style lang="scss">
.center-tabs{
  .el-tabs__header{
    margin-bottom: 0!important;
  }
  .el-tabs__item{
    width: 50%;
    text-align: center;
  }
  .el-tabs__nav{
    width: 100%;
  }
}
.right-scrollbar {
  .el-scrollbar__view {
    padding: 12px 18px 15px 15px;
  }
}
.panels-select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
  .el-input {
    width: auto;
  }
}
.panels-select-item + .panels-select-item {
  margin-top: 4px;
}
.panels-select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
</style>
<style lang="scss" scoped>
.right-board {
  height: 100%;
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  .field-box {
    position: relative;
    height: calc(100% - 40px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label{
  font-size: 14px;
}
.node-icon{
  color: #bebfc3;
}
</style>
