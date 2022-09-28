import { PropType } from 'vue'
export type OptionsRaw = {
  props: object
  item: object
}
export const defaultProps = {
  isCheckAll: {
    type: Boolean,
    default: true,
  },
  isCheckButton: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<Array<OptionsRaw>>,
  },
  checkedValue: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
}
