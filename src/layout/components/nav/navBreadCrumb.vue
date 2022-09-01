<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="(item, index) in menus" :key="index" :to="{ path: item.path }"
        @click="handlerClickBread(item)">{{
            item.meta.title
              ? item.meta.title : '主页'
        }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import utils from '@/utils/index'
import { useStore } from '@/store/index';
import { RootMutations } from '@/store/type';
import type { childrenType } from '../../index.type'
const props = defineProps({
  menus: {
    type: Array as PropType<childrenType[]>,
    default: () => []
  }
})

const store = useStore()

// 点击面包屑的时候
function handlerClickBread(item: any) {
  if (!utils.isEmportyObject(item.meta)) return
  const tags: any = {
    name: '主页',
    path: item.path,
    type: '',
    color: '#fff'
  }
  store.commit(RootMutations.SET_TAGS, tags)
}
</script>