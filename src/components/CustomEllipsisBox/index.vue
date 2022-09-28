<script lang="ts">
import { defineComponent, h, Ref, ref, nextTick, useSlots, VNodeNormalizedChildren } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import mainAppVue from './moreContent.vue'
import { debounce } from '@/utils/modules/common'
export default defineComponent({
  setup(_, { slots }) {
    const content: Ref<HTMLElement> = ref()
    const sliceIndexd = ref(-1)
    const slotsArr = ref([])
    const flattedChildren = (children: VNodeNormalizedChildren) => {
      const vnodes = Array.isArray(children) ? children : [children]
      const result: any[] = []
      // console.log(vnodes, 'vnodes')
      vnodes.forEach((child: any) => {
        // TODO 不需要拓展
        // if (Array.isArray(child.children)) {
        //   result.push(...flattedChildren(child.children))
        // } else {
        result.push(child)
        // }
      })
      // console.log(result, 'result')
      return result
    }
    const calcSliceIndex = menu => {
      if (!menu.value) return -1
      const items = Array.from(menu.value?.childNodes ?? []).filter((item: any) => item.nodeName !== '#text' || item.nodeValue) as HTMLElement[]
      const moreItemWidth = 40
      const paddingLeft = Number.parseInt(getComputedStyle(menu.value!).paddingLeft, 10)
      const paddingRight = Number.parseInt(getComputedStyle(menu.value!).paddingRight, 10)
      const menuWidth = menu.value!.clientWidth - paddingLeft - paddingRight
      let calcWidth = 0
      let sliceIndex = 0
      items.forEach((item, index) => {
        calcWidth += item.offsetWidth || 0
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex = index + 1
        }
      })
      return sliceIndex === items.length ? -1 : sliceIndex
    }
    const handlerSize = () => {
      const callBack = () => {
        sliceIndexd.value = -1
        nextTick(() => {
          sliceIndexd.value = calcSliceIndex(content)
        })
      }
      callBack()
    }
    useResizeObserver(content, debounce(handlerSize, 34.43))
    return {
      content,
      sliceIndexd,
      slotsArr,
      flattedChildren,
    }
  },
  render() {
    const slots = useSlots()
    const originSlots = this.flattedChildren(slots?.default())
    const slotFun = () => {
      let sliceArr = []
      if (this.sliceIndexd === -1) {
        sliceArr = [...originSlots]
      } else {
        sliceArr = [...originSlots.slice(0, this.sliceIndexd), h(mainAppVue, { sliceIndexd: this.sliceIndexd }, { default: () => slots?.default() })]
      }
      return sliceArr
    }

    return h('div', { class: 'w-full h-auto px-20' }, [
      h(
        'ul',
        { class: 'w-full h-full flex  px-20', ref: 'content' },
        {
          default: () => slotFun(),
        }
      ),
    ])
  },
})
</script>

<style></style>
