<script setup lang="ts">
import { ref } from 'vue'
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
      <treeselect v-model="value" :multiple="true" :options="options" />
    </div>
  </div>
</template>