<template>
  <main-card>
    <span>form表单测试</span>
    <form-custom name="张三" :type-component="ElButton" clearable :options="options">
      <template #default>
        nihap
      </template>
    </form-custom>
  </main-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomSelect from '@/components/customSelect/index.vue'
import { ElButton } from 'element-plus';
const options = ref([
  {
    value: '张三',
    label: '张三',
  }
])

</script>