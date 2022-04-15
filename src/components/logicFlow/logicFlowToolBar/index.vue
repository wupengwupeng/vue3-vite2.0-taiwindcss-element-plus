<template>
  <div class="flex justify-start items-center px-2 py-1">
    <el-button v-for="(item, key) in toolbarItemList" :key="item.type" size="small" :ref="'controlButton' + key"
      :disabled="item.disabled" :style="{
        cursor: item.disabled === false ? 'pointer' : 'not-allowed',
      }" @click="onControl(item)">
      <span :class="'iconfont ' + item.icon"></span>
      <p>{{ item.tooltip }}</p>
    </el-button>
    <!-- <el-tooltip placement="bottom" v-bind="item.disabled ? { visible: false } : {}">
        <template #content>{{ item.tooltip }}</template>
        <span :class="`${prefixCls}-toolbar__icon`" v-if="item.icon" @click="onControl(item)">
          <AppSvgIcon :icon="item.icon" :class="item.disabled ? 'cursor-not-allowed disabeld' : 'cursor-pointer'" />
        </span>
        
      </el-tooltip> -->
    <!-- <el-divider v-if="item.separate" type="vertical" /> -->
  </div>
</template>
<script lang="ts">
import type { ToolbarConfig } from './types'
import { defineComponent, ref, onUnmounted, unref, nextTick, watchEffect } from 'vue'
import { useFlowChartContext } from './useFlowContext'
import { ToolbarTypeEnum } from './enum'

export default defineComponent({
  name: 'FlowChartToolbar',
  emits: ['view-data'],
  setup(_, { emit }) {
    const toolbarItemList = ref<ToolbarConfig[]>([
      {
        type: ToolbarTypeEnum.ZOOM_IN,
        icon: 'icon-zoom-out-hs',
        tooltip: '缩小',
      },
      {
        type: ToolbarTypeEnum.ZOOM_OUT,
        icon: 'icon-enlarge-hs',
        tooltip: '放大',
      },
      {
        type: ToolbarTypeEnum.RESET_ZOOM,
        icon: 'icon-full-screen-hs',
        tooltip: '重置比例',
      },

      {
        type: ToolbarTypeEnum.UNDO,
        icon: 'icon-previous-hs',
        tooltip: '后退',
        disabled: true,
      },
      {
        type: ToolbarTypeEnum.REDO,
        icon: 'icon-next-step-hs',
        tooltip: '前进',
        disabled: true,
      },

      {
        type: ToolbarTypeEnum.SNAPSHOT,
        icon: 'icon-download-hs',
        tooltip: '下载',
      },
      {
        type: ToolbarTypeEnum.VIEW_DATA,
        icon: 'icon-watch-hs',
        tooltip: '查看数据',
      },
    ])

    const { logicFlow } = useFlowChartContext()

    function onHistoryChange({ data: { undoAble, redoAble } }: any) {
      const itemsList = unref(toolbarItemList)
      const undoIndex = itemsList.findIndex(item => item.type === ToolbarTypeEnum.UNDO)
      const redoIndex = itemsList.findIndex(item => item.type === ToolbarTypeEnum.REDO)
      if (undoIndex !== -1) {
        unref(toolbarItemList)[undoIndex].disabled = !undoAble
      }
      if (redoIndex !== -1) {
        unref(toolbarItemList)[redoIndex].disabled = !redoAble
      }
    }

    const onControl = (item: any) => {
      const lf = unref(logicFlow)
      if (!lf) {
        return
      }
      switch (item.type) {
        case ToolbarTypeEnum.ZOOM_IN:
          lf.zoom()
          break
        case ToolbarTypeEnum.ZOOM_OUT:
          lf.zoom(true)
          break
        case ToolbarTypeEnum.RESET_ZOOM:
          lf.resetZoom()
          break
        case ToolbarTypeEnum.UNDO:
          lf.undo()
          break
        case ToolbarTypeEnum.REDO:
          lf.redo()
          break
        case ToolbarTypeEnum.SNAPSHOT:
          lf.getSnapshot()
          break
        case ToolbarTypeEnum.VIEW_DATA:
          emit('view-data')
          break
      }
    }

    watchEffect(async () => {
      if (unref(logicFlow)) {
        await nextTick()
        unref(logicFlow)?.on('history:change', onHistoryChange)
      }
    })

    onUnmounted(() => {
      unref(logicFlow)?.off('history:change', onHistoryChange)
    })
    //console.log(unref(toolbarItemList), 'unref')
    return { toolbarItemList, onControl }
  },
})
</script>
<style lang="scss">
@import './assets/iconfont/iconfont.css';

html[data-theme='dark'] {
  .lf-dnd {
    background: #080808;
  }
}
</style>
