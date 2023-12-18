<script lang="ts">
import { defineComponent, h, PropType, toRefs, resolveComponent } from 'vue'
export default defineComponent({
  props: {
    item: {
      type: String as PropType<any>,
    },
    componentType: {
      type: String as PropType<any>,
      default: 'div',
    },
    hProps: {
      type: Object as PropType<any>,
      default: () => {},
    },
    slots: {
      type: Object as PropType<any>,
      default: () => {},
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    }
  },
  render() {
    const app = h(this.componentType, { ...this.hProps }, this.$slots?.default?.call(this))
    const other = h(this.componentType, { ...this.hProps }, this.$slots?.other?.call(this, this.item))
    const isSlots = this.slots && Object.keys(this.slots)?.length
    // return h(resolveComponent(this.componentType), { ...this.hProps }, { ...this.slots })
    if (isSlots) {
      return h(resolveComponent(this.componentType), { ...this.hProps }, { ...this.slots })
    } else {
      console.log(this.$slots, 'default')
      return h('div', {}, [this.$slots.default])
    }
  },
})
</script>
