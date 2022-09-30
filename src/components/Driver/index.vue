<template></template>

<script setup lang="ts">
import { onMounted, PropType, nextTick } from 'vue'
import { getDriver, setDriver } from '@/utils/storage'
import Driver from 'driver.js'
const props = defineProps({
  storeName: {
    type: String,
    required: true,
    default: '',
  },
  steps: {
    type: Array as PropType<Driver.Step[]>,
  },
})
const isDriver = getDriver(props.storeName)

const show = () => {
  setTimeout(() => {
    const driver = new Driver({
      animate: true, // Whether to animate or not
      opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
      padding: 0, // Distance of element from around the edges
      allowClose: false, // Whether the click on overlay should close or not
      overlayClickNext: false, // Whether the click on overlay should move next
      doneBtnText: '完成', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      stageBackground: '#ffffff', // Background color for the staged behind highlighted element
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步', // Previous button text for this step
      showButtons: true, // Do not show control buttons in footer
      keyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
      scrollIntoViewOptions: {}, // We use `scrollIntoView()` when possible, pass here the options for it if you want any
      onReset: (ele: any) => {
        setDriver(props.storeName, true)
      },
    })
    driver.defineSteps(props.steps)
    driver.start()
  }, 300)
}
onMounted(() => {
  if (!isDriver) show()
})
</script>

<style></style>
