<template>
  <div class="w-full h-60 shadow flex justify-between">
    <div class="flex-1 flex items-center px-12 h-full">
      <!-- <AppSvgIcon iconName="icon-change-menu" class="w-20 h-20" /> -->
      <el-radio-group v-model="isCollapse">
        <el-radio-button :label="false"> expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
      </el-radio-group>
    </div>
    <div class="w-200 flex items-center justify-between px-12">
      <div class="flex items-center">
        <ChangeTheme />
        <span>切换主题</span>
      </div>
      <el-avatar :size="50" :src="circleUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, toRefs } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const isCollapse = computed({
      get() {
        return modelValue.value
      },
      set(value: boolean) {
        emit('update:modelValue', value)
      },
    })

    return {
      isCollapse,
    }
  },
})
</script>

