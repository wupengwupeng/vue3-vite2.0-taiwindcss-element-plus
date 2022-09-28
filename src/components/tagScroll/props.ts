import { PropType } from 'vue'
export type OptionsRaw = {
  [key: string]: any
}
export const defaultProps = {
  options: {
    type: Array as PropType<OptionsRaw[]>,
  },
}
