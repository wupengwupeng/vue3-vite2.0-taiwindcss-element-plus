<template>
  <el-radio-group v-bind="$attrs" v-model="val">
    <template v-if="hasRadioButton">
      <el-radio-button v-for="(item, index) in options" v-bind="item" @change="val => handlerChange(val, item)" :key="index + 'g'" :label="item.label">
        <template v-for="(inx, name) in slots" :key="inx + 'b'" #[name]>
          <slot :name="name" :item="item"></slot>
        </template>
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="(item, index) in options" v-bind="item" :key="index + 'g'" @change="val => handlerChange(val, item)" :label="item.label">
        <template v-for="(inx, name) in slots" :key="inx + 'b'" #[name]>
          <slot :name="name" :item="item"></slot>
        </template>
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { useModelVal, useDefaultProps, useDefaultEmits } from '@/utils/vueUse'
import { defaultProps, OptionsRaw, Label } from './props'
import { defaultEmits } from './emits'
const props = defineProps({ ...useDefaultProps(), ...defaultProps })
const emits = defineEmits([...useDefaultEmits(), ...defaultEmits])
const val = useModelVal(props, emits)
const slots = useSlots()
function handlerChange(val: Label, item: OptionsRaw) {
  const data = { val, item }
  emits('change', data)
}
</script>
