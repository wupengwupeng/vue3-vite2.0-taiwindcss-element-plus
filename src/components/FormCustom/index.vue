<template>
  <div>
    <el-form v-bind="$attrs" ref="ruleFormRef" :model="formDate" :rules="props.rules">
      <el-row>
        <el-col v-for="(item, index) in formColumn" :key="index + 'sd'" v-bind="item.col">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :item="item"></slot>
          </template>
          <el-form-item v-else :label="item.label" :prop="item.prop" v-bind="item.formItemProps">
            <component :is="item.type" v-bind="item.componentsProps" v-model="formDate[item.prop]">
              <template v-if="item.slot">
                <create-element :component-type="item.type" :slots="item.slot"></create-element>
              </template>
            </component>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defaultProps } from './props'
import { useModelVal, useDefaultProps, useDefaultEmits } from '@/utils/vueUse';
const props = defineProps({ ...useDefaultProps(), ...defaultProps })
const emits = defineEmits([...useDefaultEmits()])
const formDate = useModelVal(props, emits)

// 将表单绑定的ref暴露给父组件
const ruleFormRef = ref();
defineExpose({ ruleFormRef });

</script>