import { PropType } from 'vue'
export type Label = string | number | boolean
export type OptionsRaw = {
  [key: string]: any
}
export const defaultProps = {
  options: {
    type: Array as PropType<Array<OptionsRaw>>,
    default: () => [],
  },
  hasRadioButton: {
    type: Boolean,
    default: false,
  },
}
