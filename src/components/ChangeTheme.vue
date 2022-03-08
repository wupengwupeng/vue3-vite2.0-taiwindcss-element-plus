<template>
  <div>
    <el-color-picker v-model="color" @change="changeTheme"></el-color-picker>
    <span class="aa">asdfd</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { mix } from '../utils/index'
export default defineComponent({
  name: 'ChangeTheme',
  setup() {
    const node = document.documentElement
    // 变量前缀
    const pre = '--el-color-primary'
    // 白色混合色
    const mixWhite = '#ffffff'
    // 黑色混合色
    const mixBlack = '#000000'
    const defaultColor = '#0780F1'
    const state: { color: string } = reactive({
      color: localStorage.getItem('primaryColor') || defaultColor,
    })

    // 需要提到vuex中
    function changeTheme(color: string = state.color) {
      node.style.setProperty(pre, color)
      localStorage.setItem('primaryColor', color)
      node.style.setProperty('--el-color-paimary', color)
      // 这里是覆盖原有颜色的核心代码
      for (let i = 1; i < 10; i += 1) {
        node.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1))
        node.style.setProperty(`--el-color-primary-dark-${i}`, mix(color, mixBlack, 0.1))
      }

      // 本地缓存style，样式持久化，你也可以存在后端
      localStorage.setItem('style', node.style.cssText)
    }
    changeTheme(state.color)
    return {
      ...toRefs(state),
      changeTheme,
    }
  },
})
</script>

<style lang="scss" scoped>
.aa {
  color: var(--el-color-paimary);
}
</style>
