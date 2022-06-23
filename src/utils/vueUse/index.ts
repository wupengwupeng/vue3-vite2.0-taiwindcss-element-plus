import { reactive, ref, computed, PropType, defineProps, defineEmits } from "vue";

// use分页
export function useElPagination() {
  const pagination = reactive({
    pageSizes: [10, 20, 30, 50, 100, 150, 200, 300],
    pageSize: 10,
    currentPage: 1,
    total: 0
  })
  return pagination
}
// useProps
export function useDefaultProps<T extends Record<keyof T, any>>(arg?: T) {
  return {
    modelValue: {
      type: String as PropType<any>
    },
    ...arg
  }
}
// useEmits
export function useDefaultEmits() {
  return ['update:modelValue']
}
// useModelValue
export function useModelVal() {
  const props = defineProps(useDefaultProps())
  const emits = defineEmits(useDefaultEmits())
  const val = computed({
    get() {
      return props.modelValue
    },
    set(v) {
      emits('update:modelValue', v)
    }
  })
  return val
}