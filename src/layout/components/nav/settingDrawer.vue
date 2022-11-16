<template>
  <custom-drawer v-model:visible="props.visible" title="系统设置" :size="350" @close="handlerClose">
    <el-divider>主题</el-divider>
    <div class="flex w-full items-center flex-col">
      <el-switch v-model="lightDark" style="margin-left: 24px" inline-prompt :active-icon="darkIcon" :inactive-icon="lightIcon" @change="dataThemeChange" />
    </div>
    <el-divider>主题色</el-divider>
    <div class="flex w-full gap-x-12 justify-center items-center">
      <ChangeTheme />
    </div>
    <el-divider>导航栏模式</el-divider>
    <ul class="grid grid-cols-3 justify-center justify-items-center">
      <li class="w-60 h-60 flex hover:cursor-pointer" :class="navOneStyle" @click="handlerSaveNav('1')">
        <div class="w-1/3 h-full bg-[#272a36]"></div>
        <div class="w-2/3 h-full">
          <div class="w-full h-1/4 bg-gray-50"></div>
          <div class="w-full h-3/4 bg-gray-100"></div>
        </div>
      </li>
      <li class="w-60 h-60 flex flex-col hover:cursor-pointer" :class="navTwoStyle" @click="handlerSaveNav('2')">
        <div class="w-full h-1/4 bg-[#272a36]"></div>
        <div class="w-full h-3/4 bg-gray-100"></div>
      </li>
      <li class="w-60 h-60 flex flex-col hover:cursor-pointer" :class="navThreeStyle" @click="handlerSaveNav('3')">
        <div class="w-full h-1/4 bg-[#272a36]"></div>
        <div class="flex flex-1 overflow-hidden">
          <div class="w-1/3 h-full bg-[#3e4252]"></div>
          <div class="flex-1 bg-gray-100"></div>
        </div>
      </li>
    </ul>
  </custom-drawer>
</template>

<script setup lang="ts">
import { ref, computed, Ref, defineComponent, h, watch } from 'vue'
import { useToggle } from '@vueuse/core'
import { useStore } from '@/store'
import { setNav, setDayDark } from '@/utils/storage'
import { darkTheme } from '@/utils/index'
import { RootMutations } from '@/store/type'
import AppSvgIcon from '@/components/AppSvgIcon/index.vue'
import { isDark } from '@/utils/config/index'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:visible'])
const toggle = useToggle(isDark)
const store = useStore()
const body = document.documentElement as HTMLElement
const lightDark = computed(() => {
  return store.state.config.dayDark === '2'
})

let isActiveNav: Ref<string> = computed(() => {
  return store.state.config.nav
})

const darkIcon = defineComponent({
  setup() {
    return () => {
      return h(AppSvgIcon, { iconName: 'dark' })
    }
  },
})
const lightIcon = defineComponent({
  setup() {
    return () => {
      return h(AppSvgIcon, { iconName: 'day' })
    }
  },
})
const navOneStyle = computed(() => {
  return isActiveNav.value === '1' ? 'border-2 border-blue-500' : ''
})
const navTwoStyle = computed(() => {
  return isActiveNav.value === '2' ? 'border-2 border-blue-500' : ''
})
const navThreeStyle = computed(() => {
  return isActiveNav.value === '3' ? 'border-2 border-blue-500' : ''
})

const handlerClose = () => {
  emits('update:visible', false)
}

const handlerSaveNav = (type: string) => {
  isActiveNav.value = type
  store.commit(RootMutations.SET_NAV, type)
  setNav(type)
}
const dataThemeChange = (type: boolean) => {
  darkTheme(!isDark.value)
  toggle()
  const newType = type ? '2' : '1'
  store.commit(RootMutations.SET_DATDARK, newType)
  setDayDark(newType)
}
watch(
  lightDark,
  () => {
    if (lightDark.value) {
      // TODO
      // body.setAttribute('data-theme', 'dark')
    } else {
      body.setAttribute('data-theme', '')
    }
  },
  { immediate: true }
)
</script>
