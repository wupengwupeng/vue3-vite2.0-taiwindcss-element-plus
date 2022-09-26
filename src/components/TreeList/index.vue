<template>
  <div><TreeItem v-for="(res, index) in treeList" :item="res" :id="res.name" :is-active="isActive" :handlerClick="handlerClick" /></div>
</template>

<script setup lang="ts" name="TreeList">
import { ref, PropType } from 'vue'
import TreeItem from '@/components/TreeItem/index.vue'
import { TreeListRaw } from './index.type'
const props = defineProps({
  treeList: {
    type: Array as PropType<Array<TreeListRaw>>,
  },
})
const isActive = ref('')

// 查找所有父级得name
const findAcitiveId = (array, label) => {
  const find = (array, label) => {
    let stack = []
    let going = true
    const walker = (array, label) => {
      array.forEach((item, index) => {
        if (!going) return
        stack.push(item.name + '')
        if (item.name === label) {
          going = false
        } else if (item['children']) {
          walker(item['children'], label)
        } else {
          stack.pop()
        }
      })
      // remove last index
      if (going) stack.pop()
    }
    walker(array, label)
    return stack.join('^')
  }
  return find(array, label)
}

const handlerClick = item => {
  if (item.hasOwnProperty('expand')) {
    item.expand = !item.expand
  }
  if (!(item.children && item.children.length)) {
    isActive.value = findAcitiveId(props.treeList, item.name)
  }
}
</script>

<style></style>
