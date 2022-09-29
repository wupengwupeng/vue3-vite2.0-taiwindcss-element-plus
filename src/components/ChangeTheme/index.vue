<template>
  <div class="flex items-center hover:cursor-pointer">
    <el-color-picker ref="elColorPicker" v-model="color" :predefine="predefineColors" @change="changeTheme"></el-color-picker>
    <div class="aa" @click="openColorPicker">切换颜色</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, toRefs } from 'vue'
import { ElColorPicker } from 'element-plus'
import { useStore } from '@/store/index'
import { RootMutations } from '@/store/type'
import { getTheme } from '@/utils/storage/index'
export default defineComponent({
  name: 'ChangeTheme',
  setup() {
    const store = useStore()
    const state: { color: string } = reactive({
      color: getTheme(),
    })
    const elColorPicker: Ref<typeof ElColorPicker> = ref()
    const predefineColors = ref([
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577',
    ])

    function changeTheme(color: string) {
      state.color = color
      store.commit(RootMutations.SET_THEME, color)
    }
    function openColorPicker() {
      console.log(elColorPicker.value, 'value')

      setTimeout(() => {
        elColorPicker.value.showPicker = true
      }, 400)
    }
    return {
      predefineColors,
      elColorPicker,
      ...toRefs(state),
      changeTheme,
      openColorPicker,
    }
  },
})
</script>

<style lang="scss" scoped>
.aa {
  color: var(--el-color-primary);
  margin-left: 10px;
}
</style>
