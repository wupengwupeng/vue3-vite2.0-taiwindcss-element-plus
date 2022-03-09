<template>
  <div>
    <el-color-picker v-model="color" @change="changeTheme"></el-color-picker>
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

    function changeTheme(color: string) {
      state.color = color
      store.commit(RootMutations.SET_THEME, color)
    }
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
