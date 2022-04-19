<script setup lang="ts" name="Item">
import { defineEmits, defineProps, getCurrentInstance } from 'vue'
const props = defineProps({
  source: {
    type: Object,
    default: () => ({}),
  },
  event: {
    type: String
  }
});


const emits = defineEmits(['changeSingleCheckBox'])
const { appContext: { app: { config: { globalProperties } } } }: any = getCurrentInstance()
const handleChangeCheckBox = (source: any, val: boolean) => {
  globalProperties.$myBus.emit('changeSingleCheckBox', source)
}

// function dispatch(componentName: any, eventName: any, ...rest: any) {
//   let parent = that.$parent || that.$root
//   let name = parent.$options.name

//   while (parent && (!name || name !== componentName)) {
//     parent = parent.$parent
//     if (parent) {
//       name = parent.$options.name
//     }
//   }

//   if (parent) {
//     parent.$emit.apply(parent, [eventName].concat(rest))
//   }
// }
</script>

<template>
  <div class="item-inner border-b px-12">
    <div class="head">
      {{ event }}
      <el-checkbox v-model="source.checked" size="large" @change="(val) => handleChangeCheckBox(source, val)" />
      <span class="index"># {{ source.index }}</span>
      <span class="name">{{ source.name }}</span>
    </div>
    <div class="desc">{{ source.desc }}</div>
  </div>
</template>

<style lang="scss" scoped>
.item-inner {
  .head {
    font-weight: 500;
  }

  .index {
    margin-right: 1em;
  }

  .name {
    margin-left: 1em;
  }

  .desc {
    padding-top: 0.5em;
    text-align: justify;
  }
}
</style>
