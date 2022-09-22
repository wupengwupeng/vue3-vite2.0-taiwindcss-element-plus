import { Directive, nextTick, ref } from 'vue'

export const focus: Directive = {
  mounted: (el: HTMLElement) => {
    const inputList = el.getElementsByTagName('input')
    Object.keys(inputList).forEach((res: any) => {
      setTimeout(() => {
        inputList[res].focus()
      }, 200)
    })
  },
  unmounted() {},
}
