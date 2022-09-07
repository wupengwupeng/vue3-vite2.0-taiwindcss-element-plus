<template>
  <Dialog v-model:visible="visible" :footer-right="false" @close="handlerClose">
    <el-row>
      <el-col :span="24">
        <el-input v-model="search" size="large" v-focus placeholder="请输入查询菜单" clearable></el-input>
      </el-col>
      <el-col v-for="(item, index) in menus" :key="index + 'gg'" :span="24" @click="handleClickItem(index)">
        <div class="menu-item" :class="{ isActive: isActive === index }">
          {{ item!.meta.title }}
        </div>
      </el-col>
      <el-col v-if="!menus.length" :span="24">
        <div
          class="w-full h-100 flex items-center justify-center animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]"
        >
          Empty data
        </div>
      </el-col>
    </el-row>
    <template #footerLeft>
      <div class="w-full flex justify-start gap-x-8">
        <span v-for="(index, item) in OBJICON" :key="index">
          <span class="inline-flex items-center justify-center w-28 h-28 bg-white border rounded shadow-2xl" :class="{ 'rotate-180': item === '向上' }">
            <AppSvgIcon :icon-name="OBJICON[item]"></AppSvgIcon>
          </span>
          <span class="ml-4">{{ item }}</span>
        </span>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts" name="SearchDialog">
import { ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { routes as defaultRoutes } from '@/router/modules/index'
import { debounce } from '@/utils/modules/common'
import { treeToList } from '@/utils/index'
import { useRouter } from 'vue-router'
import { cloneDeep } from 'lodash'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'
const OBJICON: { [key: string]: string } = {
  确认: 'enter_outlined',
  向下: 'keybord_arrow_down',
  向上: 'keybord_arrow_down',
  退出: 'mdi_keyboard_esc',
}
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter()
const store = useStore()
const search = ref('')
const isActive = ref(0)
const menus = ref([])
const emits = defineEmits(['update:visible'])

const routerPush = () => {
  const routeActive = menus.value[isActive.value]
  if (routeActive && routeActive.path) {
    router.push(routeActive.path)
    store.commit(RootMutations.SET_TAGS, {
      ...routeActive,
      name: routeActive.meta.title,
      path: routeActive.path,
      type: '',
      color: '#fff',
    })
    handlerClose()
  }
}
const handleClickItem = index => {
  routerPush()
  isActive.value = index
}

const handleEnter = () => {
  routerPush()
}
const handleDown = () => {
  if (isActive.value === menus.value.length - 1) return
  isActive.value += 1
}
const handleUp = () => {
  if (isActive.value === 0) return
  isActive.value -= 1
}
const handlerClose = () => {
  emits('update:visible', false)
}

// TODO 改进优化
// const treeToList = (menuArr: any[]) => {
//   const data = []
//   while (menuArr.length !== 0) {
//     const popData = menuArr.pop()
//     if (popData && popData.children) {
//       popData.children.forEach(res => {
//         if (res.children && res.children.length) {
//           res.children.forEach(item => {
//             data.unshift(item)
//           })
//         } else {
//           data.unshift(res)
//         }
//       })
//     }
//   }
//   return data
// }
const handlerSearch = () => {
  menus.value = treeToList(cloneDeep(defaultRoutes)).filter(res => {
    if (search.value.length) {
      return res.meta.title.includes(search.value)
    }
  })
}
watch(search, debounce(handlerSearch, 500), { immediate: true })
onKeyStroke('Enter', handleEnter)
onKeyStroke('ArrowUp', handleUp)
onKeyStroke('ArrowDown', handleDown)
</script>

<style lang="scss" scoped>
.menu-item {
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 8px;
  margin-top: 8px;

  &:hover {
    cursor: pointer;
    border: 1px solid var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
}

.isActive {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
