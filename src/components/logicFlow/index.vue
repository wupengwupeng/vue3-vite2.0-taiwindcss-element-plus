<template>
  <div class="w-full h-full flex flex-col">
    <LogicFlowToolBar />
    <div class="flex-1" ref="lfElRef"></div>
  </div>
</template>
<script lang="ts">
import type { Ref } from 'vue'
import type { Definition } from '@logicflow/core'
import { defineComponent, ref, onMounted, unref, nextTick, computed, watch } from 'vue'
import LogicFlow from '@logicflow/core'
import { Snapshot, BpmnElement, Menu, DndPanel, SelectionSelect, lfJson2Xml } from '@logicflow/extension'
import { toLogicFlowData } from './adpterForTurbo'
import { createFlowChartContext } from './logicFlowToolBar/useFlowContext'
import { configDefaultDndPanel } from './config'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'

export default defineComponent({
  name: 'FlowChart',
  props: {
    flowOptions: {
      type: Object,
      default: () => ({}),
    },

    data: {
      type: Object,
      default: () => ({}),
    },

    toolbar: {
      type: Boolean,
      default: true,
    },
    patternItems: {
      type: Array,
    },
  },
  setup(props) {
    const lfElRef = ref(null)
    const graphData = ref({})

    const lfInstance = ref(null) as Ref<LogicFlow | null>

    createFlowChartContext({
      logicFlow: lfInstance as unknown as LogicFlow,
    })
    const getFlowOptions = computed(() => {
      const { flowOptions } = props

      const defaultOptions: Partial<Definition> = {
        grid: true,
        background: {
          color: '#f7f9ff',
        },
        keyboard: {
          enabled: true,
        },
        ...flowOptions,
      }
      return defaultOptions as Definition
    })

    watch(
      () => props.data,
      () => {
        onRender()
      }
    )

    // TODO
    // watch(
    //   () => appStore.getDarkMode,
    //   () => {
    //     init();
    //   }
    // );

    watch(
      () => unref(getFlowOptions),
      options => {
        //console.log(options, 'options')
        unref(lfInstance)?.updateEditConfig(options)
      }
    )

    // init logicFlow
    async function init() {
      await nextTick()

      const lfEl = unref(lfElRef)
      if (!lfEl) {
        return
      }
      LogicFlow.use(DndPanel)

      // Canvas configuration
      LogicFlow.use(Snapshot)
      // Use the bpmn plug-in to introduce bpmn elements, which can be used after conversion in turbo
      LogicFlow.use(BpmnElement)
      // Start the right-click menu
      LogicFlow.use(Menu)
      LogicFlow.use(SelectionSelect)

      lfInstance.value = new LogicFlow({
        ...unref(getFlowOptions),
        container: lfEl,
      })
      const lf = unref(lfInstance)!
      lf?.setDefaultEdgeType('line')
      onRender()
      lf?.setPatternItems(props.patternItems || configDefaultDndPanel(lf))
    }

    async function onRender() {
      await nextTick()
      const lf = unref(lfInstance)
      if (!lf) {
        return
      }
      const lFData = toLogicFlowData(props.data)
      const xmlData = lfJson2Xml(lFData)
      //console.log(xmlData, 'xmlData')
      lf.render(lFData)
    }

    function handlePreview() {
      const lf = unref(lfInstance)
      if (!lf) {
        return
      }
      graphData.value = unref(lf).getGraphData()
    }

    onMounted(init)

    return {
      lfElRef,
      handlePreview,
      graphData,
    }
  },
})
</script>
