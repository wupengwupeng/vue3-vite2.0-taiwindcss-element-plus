<script setup lang="ts">
import { ref, watch, unref } from 'vue'
// import the component
import Treeselect from 'vue3-treeselect'
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'

const value = ref(null)
const options = ref([{
  id: 'a',
  label: 'a',
  children: [{
    id: 'aa',
    label: 'aa',
  }, {
    id: 'ab',
    label: 'ab',
  }],
}, {
  id: 'b',
  label: 'b',
}, {
  id: 'c',
  label: 'c',
}])
watch(value, () => {
  console.log(unref(value), 223)
})
</script>

<template>
  <div class="mx-12 my-12 shadow rounded p-12">
    <div class="card-header">
      <span class="font-medium">
        采用
        <el-link
          href="https://github.com/megafetis/vue3-treeselect"
          target="_blank"
          style="font-size: 16px; margin: 0 4px 5px"
        >vue3-treeselect</el-link>
        <el-link
          href="https://github.com/megafetis/vue3-treeselect"
          target="_blank"
          style="font-size: 16px; margin: 0 4px 5px"
        >TreeSelect</el-link>写法
        <el-link
          href="https://github.com/megafetis/vue3-treeselect"
          target="_blank"
          style="font-size: 16px; margin: 0 4px 5px"
        >How to use it?</el-link>
      </span>
    </div>
    <div>
      <treeselect v-model="value" :multiple="true" placeholder="请选择企业架构" :options="options" />
    </div>
    <div class="w-full h-200 bg-gray-200">
      <AppSvgIcon class="w-500 h-159 text-red-400" iconName="logo"></AppSvgIcon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ::v-deep(.vue-treeselect__multi-value-item),
// ::v-deep(.vue-treeselect__value-remove) {
//   color: var(--el-color-paimary);
// }
// ::v-deep(.vue-treeselect__checkbox--indeterminate) {
//   background-color: var(--el-color-paimary);
// }
// ::v-deep(.vue-treeselect__checkbox--checked) {
//   background-color: var(--el-color-paimary);
// }
</style>