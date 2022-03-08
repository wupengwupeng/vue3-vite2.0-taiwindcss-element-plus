<template>
  <div class="aa text-gray-200">
    asdf
    <change-theme />
  </div>
</template>

<script lang="ts">
import ChangeTheme from '@/components/ChangeTheme.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ChangeTheme },
  name: 'Test',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.aa {
  // color: var(--el-color-paimary);
}
</style>
