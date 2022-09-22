<script lang="ts">
import { defineComponent, h, VNodeNormalizedChildren, useSlots } from 'vue'
import More from './more.vue'
export default defineComponent({
  props: {
    sliceIndexd: {
      type: Number,
      default: -1,
    },
  },
  setup(_, { slots }) {
    const flattedChildren = (children: VNodeNormalizedChildren) => {
      const vnodes = Array.isArray(children) ? children : [children]
      const result: any[] = []
      vnodes.forEach((child: any) => {
        // if (Array.isArray(child.children)) {
        //   result.push(...flattedChildren(child.children))
        // } else {
        result.push(child)
        // }
      })
      return result
    }
    return {
      flattedChildren,
      slots,
    }
  },
  render() {
    const slots = useSlots()
    const originalSlot = this.flattedChildren(slots.default())
    const slotMore = this.sliceIndexd === -1 ? [] : originalSlot.slice(this.sliceIndexd)
    return h(
      More,
      {},
      {
        default: () => slotMore,
      }
    )
  },
})
</script>

<style></style>
