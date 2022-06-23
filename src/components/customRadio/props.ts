
import { PropType } from 'vue'
export const defaultProps = {
  options: {
    type: Array as PropType<any>,
    default: () => []
  },
  hasRadioButton: {
    type: Boolean,
    default: false
  }
}