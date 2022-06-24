<template>
  <div>
    <el-checkbox v-if="isShowChecAll" v-model="checkAll" :indeterminate="isIndeterminate"
      @change="handleCheckAllChange">
      Check all
    </el-checkbox>
    <el-checkbox-group v-bind="$attrs" v-model="checkedOptions" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :key="city" :label="city">{{
          city
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defaultProps } from './props'
import { defaultEmits } from './emits'
import { useDefaultProps, useDefaultEmits, useModelVal } from '@/utils/vueUse'


const props = defineProps({ ...useDefaultProps(), ...defaultProps })
const emits = defineEmits([...useDefaultEmits(), ...defaultEmits])

const isShowChecAll = computed(() => typeof props.modelValue !== 'undefined') //Object.prototype.toString.call(undefined)  '[object Undefined]'
const checkAll = useModelVal(props, emits)

const isIndeterminate = ref(true)
const checkedOptions = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val: boolean) => {
  checkedOptions.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>