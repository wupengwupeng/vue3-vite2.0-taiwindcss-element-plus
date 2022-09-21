<template>
  <Dialog v-model:visible="visible" :footer-right="false" @close="handlerClose">
    <el-row>
      <el-col :span="24">
        <el-input v-model="search" size="large" v-focus placeholder="请输入查询菜单" clearable></el-input>
      </el-col>
      <!-- <el-col v-for="(item, index) in menus" :key="index + 'gg'" :span="24" @click="handleClickItem(index)">
        <div class="menu-item" :class="{ isActive: isActive === index }">
          {{ item!.meta.title }}
        </div>
      </el-col> -->
      <template v-if="menus.length">
        <ListItem v-for="(item, index) in menus" :key="index" :item="item" :depth="1" :id="listItemId(index)" :is-active="activeId" />
      </template>
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
import { ref, watch, computed } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { routes as defaultRoutes } from '@/router/modules/index'
import { debounce } from '@/utils/modules/common'
import { treeToList } from '@/utils/index'
import { useRouter, RouteRecordRaw } from 'vue-router'
import ListItem from './listItem.vue'
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
const activeId = ref('0-1')
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
  // isActive.value = index
}
// 父级拼接id
const listItemId = index => {
  return index + '-' + (index + 1)
}

const handleEnter = () => {
  routerPush()
}
// 直接返回下一个的activeId TODO 获取树形数据中对应的值。
const computedDownActiveId = date => {
  const arr = activeId.value.split('-')
  let i = arr[0]
  const each = (date, i) => {
    if (date[arr[i]].children.length) {
      each(date[arr[i]].children, 0)
    } else {
    }
  }

  return
}
// 获取最深层的层数
function getMaxFloor(treeData) {
  let floor = 0
  let v = this
  let max = 0
  function each(data, floor) {
    data.forEach(e => {
      e.floor = floor
      if (floor > max) {
        max = floor
      }
      if (e?.children?.length > 0) {
        each(e?.children, floor + 1)
      }
    })
  }
  each(treeData, 1)
  return max
}

// TODO 找到对应的active的选项，判断下方是否还有多余的值，如果有就+1，没有就回退到上一级进行加减。
const handleDown = () => {
  console.log(menus.value)
  const arr = activeId.value.split('-')
  const index = getMaxFloor(menus.value)
  console.log(index, 'index')
}
const handleUp = () => {
  console.log(activeId.value, 'up')
  console.log(menus.value)
}
const handlerClose = () => {
  emits('update:visible', false)
}

const searchTreeDateList = (date: Array<RouteRecordRaw>, search: string) => {
  let arr: Array<RouteRecordRaw> = []
  date.forEach(res => {
    if (search.length && (res.meta.title as string).includes(search)) {
      arr.push(res)
    } else {
      if (res?.children?.length) {
        const temp = searchTreeDateList(res?.children, search)
        arr = arr.concat(temp)
      }
    }
  })
  return arr
}

const handlerSearch = () => {
  menus.value = searchTreeDateList(cloneDeep(defaultRoutes), search.value)
  console.log(menus.value, 'menus')
}
watch(search, debounce(handlerSearch, 500), { immediate: true })
onKeyStroke('Enter', handleEnter)
onKeyStroke('ArrowUp', handleUp)
onKeyStroke('ArrowDown', handleDown)
</script>

<style lang="scss" scoped></style>
