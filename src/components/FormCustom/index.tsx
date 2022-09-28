import { useSlots, reactive, ref, useAttrs, watch, Ref, markRaw, defineComponent, unref, h, resolveComponent } from 'vue'
import { defaultProps } from './props'
import { useModelVal, useDefaultProps, useDefaultEmits } from '@/utils/vueUse'
export default defineComponent({
  props: {
    ...useDefaultProps(),
    ...defaultProps,
  },
  emits: [...useDefaultEmits()],
  setup(props, { emit, attrs }) {
    const ruleFormRef = ref()
    const formDate = useModelVal(props, emit)
    // 将表单绑定的ref暴露给父组件
    return {
      ruleFormRef,
      formDate,
    }
  },
  render() {
    const OtherTemplate = (_: any, {}) => <div v-slots={_.slotName}></div>
    const ElFormItems = (props: any, {}) => (
      <el-form-item label={props.Label} prop={props.prop} {...props}>
        {h(resolveComponent('ElInput'), { props: { modelValue: 'WOSHINIDAYE' } })}
      </el-form-item>
    )
    return (
      <>
        <div>
          <el-form {...this.$attrs} ref={this.ruleFormRef} model={this.formDate}>
            <el-row>
              {this.formColumn.map((res, index) => {
                return (
                  <el-col {...res.col} key={index + 'ks'}>
                    {res.slotName && <OtherTemplate slotName={res.slotName} item={res} />}
                    {!res.slotName && <ElFormItems label={res.label} prop={res.prop} {...res.formItemProps} />}
                  </el-col>
                )
              })}
            </el-row>
          </el-form>
        </div>
      </>
    )
  },
})
