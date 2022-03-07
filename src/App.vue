<template>
  <router-view />
  <!-- <div class="container">
    <h1 class="text-red-900 text-30">Custom theme example (on demand)</h1>
    <span class="bg-yellow-400 flex h-40">taiwindcss</span>
    <el-color-picker v-model="state.color" @change="changeTheme">更换主题</el-color-picker>
    <el-row>
      <el-button @click="onClick">Default</el-button>
      <el-button type="primary" @click="onClick">Primary</el-button>
      <el-button type="success" @click="onClick">Success</el-button>
      <el-button type="info" @click="onClick">Info</el-button>
      <el-button type="warning" @click="onClick">Warning</el-button>
      <el-button type="danger" @click="onClick">Danger</el-button>
    </el-row>

    <el-radio-group v-model="radioVal">
      <el-radio-button label="New York"></el-radio-button>
      <el-radio-button label="Washington"></el-radio-button>
      <el-radio-button label="Los Angeles"></el-radio-button>
      <el-radio-button label="Chicago"></el-radio-button>
    </el-radio-group>

    <div>
      <el-switch v-model="switchVal"></el-switch>&nbsp;
      <el-switch v-model="switchVal" active-color="#13ce66" inactive-color="#ff4949" />
    </div>

    <div>
      <el-select>
        <el-option>test</el-option>
      </el-select>
      &nbsp;
      <el-date-picker></el-date-picker>
    </div>

    <el-slider v-model="sliderVal"></el-slider>

    <p>
      It is a example built by vite.&nbsp; More info see
      <a href="https://github.com/element-plus/unplugin-element-plus" target="_blank">unplugin-element-plus</a>.
    </p>
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {}
  },
})
// import { mix } from './utils/index'
// import { reactive, ref } from 'vue'
// import { ElButton, ElSwitch, ElNotification, ElSelect, ElRadioGroup, ElRadioButton, ElSlider, ElDatePicker, ElColorPicker } from 'element-plus'

// const radioVal = ref('New York')
// const switchVal = ref(true)
// const sliderVal = ref(50)
// // 变量前缀
// const pre = '--el-color-primary'
// // 白色混合色
// const mixWhite = '#ffffff'
// // 黑色混合色
// const mixBlack = '#000000'
// // 默认主题
// const defaultTheme = '#409eff'
// const state = reactive({
//   color: localStorage.getItem('primaryColor') || defaultTheme,
// })
// console.log(state.color, 'sdf')
// const node = document.documentElement
// function onClick() {
//   ElNotification({
//     type: 'success',
//     title: '已成功发送邮件',
//     message: '验证码区分大小写，有效期5分钟',
//     duration: 3000,
//   })
// }
// // 更改主题
// function changeTheme(color: any = state.color) {
//   console.log(color)
//   console.log(node, 'node')
//   node.style.setProperty(pre, color)
//   localStorage.setItem('primaryColor', color)
//   // 这里是覆盖原有颜色的核心代码
//   for (let i = 1; i < 10; i += 1) {
//     node.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1))
//   }
//   node.style.setProperty('--el-color-primary-dark', mix(color, mixBlack, 0.1))
//   // 本地缓存style，样式持久化，你也可以存在后端
//   localStorage.setItem('style', node.style.cssText)
// }
</script>
