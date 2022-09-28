import { PropType } from 'vue'
import { Method } from 'axios'
export const defaultProps = {
  url: {
    type: String,
    default: '',
  },
  methods: {
    type: String as PropType<Method>,
    default: 'GET',
  },
  fun: {
    type: Function as PropType<() => void | undefined> & undefined,
  },
}
