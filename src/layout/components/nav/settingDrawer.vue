<template>
  <custom-drawer v-model:visible="visible" title="系统设置" :size="300" @close="handlerClose">
    <el-divider>主题</el-divider>
    <div class="flex w-full justify-center">
      <el-switch v-model="lightDark" style="margin-left: 24px" inline-prompt :active-icon="darkIcon" :inactive-icon="lightIcon" @change="dataThemeChange" />
    </div>
    <el-divider>主题色</el-divider>
    <div class="flex w-full gap-x-12 justify-center items-center">
      <ChangeTheme />
      <!-- <span>切换主题</span> -->
    </div>
    <el-divider>导航栏模式</el-divider>
    <ul class="grid grid-cols-2 justify-center justify-items-center">
      <li class="w-100 h-100 flex hover:cursor-pointer" :class="navOneStyle" @click="handlerSaveNav('1')">
        <div class="w-1/3 h-full bg-[#272a36]"></div>
        <div class="w-2/3 h-full">
          <div class="w-full h-1/4 bg-gray-50"></div>
          <div class="w-full h-3/4 bg-gray-100"></div>
        </div>
      </li>
      <li class="w-100 h-100 flex flex-col hover:cursor-pointer" :class="navTwoStyle" @click="handlerSaveNav('2')">
        <div class="w-full h-1/4 bg-[#272a36]"></div>
        <div class="w-full h-3/4 bg-gray-100"></div>
      </li>
    </ul>
    <!-- <el-button @click="toggle()">切换主题</el-button> -->
  </custom-drawer>
</template>

<script setup lang="ts">
import { ref, computed, Ref, defineComponent, h, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useStore } from '@/store'
import { setNav, setDayDark } from '@/utils/storage'
import { RootMutations } from '@/store/type'
import AppSvgIcon from '@/components/appSvgIcon/index.vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:visible'])
const isDark = useDark()
const toggle = useToggle(isDark)
const store = useStore()
const body = document.documentElement as HTMLElement
const lightDark = computed(() => {
  return store.state.config.dayDark === '2'
})

const isAcitveNav: Ref<string> = ref(store.state.config.nav)

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
  return isAcitveNav.value === '1' ? 'border-2 border-blue-500' : ''
})
const navTwoStyle = computed(() => {
  return isAcitveNav.value === '2' ? 'border-2 border-blue-500' : ''
})

const handlerClose = () => {
  emits('update:visible', false)
}

const handlerSaveNav = (type: string) => {
  isAcitveNav.value = type
  store.commit(RootMutations.SET_NAV, type)
  setNav(type)
}
const dataThemeChange = (type: boolean) => {
  const newType = type ? '2' : '1'
  store.commit(RootMutations.SET_DATDARK, newType)
  setDayDark(newType)
}
watch(
  lightDark,
  () => {
    if (lightDark.value) {
      body.setAttribute('data-theme', 'dark')
    } else {
      body.setAttribute('data-theme', '')
    }
  },
  { immediate: true }
)
</script>
