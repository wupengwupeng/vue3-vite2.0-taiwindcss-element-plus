<template>
  <el-radio-group v-model="val" class="ml-4">
    <el-radio label="1" size="large">Option 1</el-radio>
    <el-radio label="2" size="large">Option 2</el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useModelVal, useDefaultProps, useDefaultEmits } from '@/utils/vueUse'
const props = defineProps(useDefaultProps())
const emits = defineEmits(useDefaultEmits())
const val = useModelVal(props, emits)
</script>