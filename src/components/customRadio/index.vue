<template>
  <el-radio-group v-bind="$attrs" v-model="val">
    <template v-if="hasRadioButton">
      <el-radio-button v-for="(item, index) in options" v-bind="item" @change="handlerChange" :key="index + 'g'"
        :label="item.label">
        <!-- TODO some question -->
        {{ item.value }}
        <template v-for="(inx, name) in slots" :key="inx + 'b'" #[name]>
          <slot :name="name"></slot>
        </template>
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="(item, index) in options" v-bind="item" :key="index + 'g'" @change="handlerChange"
        :label="item.label">
        {{ item.value }}
        <template v-for="(inx, name) in slots" :key="inx + 'b'" #[name]>
          <slot :name="name"></slot>
        </template>
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { useModelVal, useDefaultProps, useDefaultEmits } from '@/utils/vueUse'
import { defaultProps } from './props'
import { defaultEmits } from './emits'
const props = defineProps({ ...useDefaultProps(), ...defaultProps })
const emits = defineEmits([...useDefaultEmits(), ...defaultEmits])
const val = useModelVal(props, emits)
const slots = useSlots()

function handlerChange(val: any) {
  emits('change', val)
}
</script>