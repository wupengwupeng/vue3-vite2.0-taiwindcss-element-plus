<template>
  <div class="flex items-center">
    <el-color-picker v-model="color" :predefine="predefineColors" @change="changeTheme"></el-color-picker>
    <div class="aa">切换颜色</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
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
      console.log(color, 'color')
      state.color = color
      store.commit(RootMutations.SET_THEME, color)
    }
    return {
      predefineColors,
      ...toRefs(state),
      changeTheme,
    }
  },
})
</script>

<style lang="scss" scoped>
.aa {
  color: var(--el-color-primary);
}
</style>
