<template>
  <div class="w-full h-60 shadow-inner flex justify-between">
    <div class="flex-1 flex items-center px-12 h-full">
      <el-radio-group size="small" v-model="isCollapse">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
      </el-radio-group>
      <div class="ml-12">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item
            v-for="(item, index) in menus"
            :key="index"
            :to="{ path: item.path }"
          >{{ item.meta.title ? item.meta.title : '主页' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
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
import { defineComponent, ref, watch, computed, toRefs, reactive, onBeforeMount } from 'vue'
import circleUrl from '@/assets/logo.png'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
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
    const state = reactive({
      menus: [] as Array<RouteLocationMatched>,
    })
    const route = useRoute()
    const isCollapse = computed({
      get() {
        return modelValue.value
      },
      set(value: boolean) {
        emit('update:modelValue', value)
      },
    })

    function getMenus() {
      state.menus = route.matched
    }
    watch(route, () => {
      getMenus()
    })
    onBeforeMount(() => {
      getMenus()
    })
    return {
      isCollapse,
      circleUrl,
      getMenus,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
</style>

