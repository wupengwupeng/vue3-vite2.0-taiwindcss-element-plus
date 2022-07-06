import { PropType, ComponentInternalInstance, Component } from 'vue';
import type { FormRules } from 'element-plus'
export type Obj = {
  [key: string]: any
}
export type FormColumnRaw = {
  col: Obj // el-col的属性
  slotName?: string
  formItemProps: Obj // el-form-item的属性
  label: string // from表单的label
  prop: string // from表单的prop
  componentsProps?: Obj // 组件的props
  slot?: Obj// 组件的slot
  type: string | ComponentInternalInstance | Component // 组件的名字

}
export const defaultProps = {
  formColumn: {// 表单输props
    type: Array as PropType<Array<FormColumnRaw>>,
    default: () => []
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => { }
  }
}