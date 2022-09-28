<template>
  <div>
    <el-checkbox v-if="isCheckAll" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
      <template #default>
        <slot name="header">check all</slot>
      </template>
    </el-checkbox>
    <el-checkbox-group v-bind="$attrs" v-model="checkedOptions" @change="handleCheckedCitiesChange">
      <template v-if="!isCheckButton">
        <el-checkbox
          v-for="(item, index) in options"
          :key="index + 'gg'"
          v-bind="item.props"
          :label="JSON.stringify(item.item)"
          @change="(val: boolean, item: OptionsRaw) => handlerCheckItemBox(val, item)"
        >
          <template v-for="(index, slotName) in slots" :key="index + 'hh'" #[slotName]>
            <slot :name="slotName" :item="item"></slot>
          </template>
        </el-checkbox>
      </template>
      <!-- 多选的时候的多选框 -->
      <template v-else>
        <el-checkbox-button
          v-for="(item, index) in options"
          :key="index + 'gg'"
          v-bind="item.props"
          :label="JSON.stringify(item.item)"
          @change="(val: boolean, item) => handlerCheckItemBox(val, item)"
        >
          <template v-for="(index, slotName) in slots" :key="index + 'hh'" #[slotName]>
            <slot :name="slotName" :item="item"></slot>
          </template>
        </el-checkbox-button>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts" name="CustomCheckBox">
import { computed, unref, Ref, useSlots } from 'vue'
import { defaultProps } from './props'
import { defaultEmits } from './emits'
import { useDefaultProps, useDefaultEmits, useModelVal } from '@/utils/vueUse'
import type { OptionsRaw } from './props'

const props = defineProps({ ...useDefaultProps(), ...defaultProps })
const emits = defineEmits([...useDefaultEmits(), ...defaultEmits])
const slots = useSlots()
//Object.prototype.toString.call(undefined)  '[object Undefined]'
const isShowChecAll = computed(() => typeof props.modelValue !== 'undefined')
const checkAll = useModelVal(props, emits)

const checkedOptions: Ref<Array<string> | undefined> = computed({
  get() {
    return props.checkedValue
  },
  set(v) {
    emits('update:checkedValue', v)
  },
})
const isIndeterminate: Ref<boolean> = computed(() => {
  const checkedCount = checkedOptions.value?.length
  if (checkedCount === props.options!.length) return false
  return checkedCount! > 0 && checkedCount! < props.options!.length
})

const handleCheckAllChange = (val: boolean) => {
  checkedOptions.value = val ? props.options?.map(res => JSON.stringify(res.item)) : []
  isIndeterminate.value = false
  emits('changeGroup', unref(checkedOptions))
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === props.options!.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.options!.length
  emits('changeGroup', unref(checkedOptions))
}
const handlerCheckItemBox = (val: Boolean, item: OptionsRaw) => {
  const data = { val, item }
  emits('change', data)
}
</script>
