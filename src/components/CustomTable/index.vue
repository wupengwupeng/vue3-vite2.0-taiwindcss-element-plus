<template>
  <div class="app-table-content">
    <el-table v-bind="$attrs">
      <el-table-column v-for="(item, indx) in props.columns" v-bind="item" :key="indx + 'njmk'">
        <template v-if="item.slot" #default="scope">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { ElTableColumn } from 'element-plus'
import type { ElTableColumnType } from './index.type'
const props = defineProps({
  columns: {
    type: Array as PropType<ElTableColumnType[]>,
    default: () => [],
  },
})
</script>

<style lang="scss">
.app-table-content {
  .el-table {
    width: 100%;
    color: #444;
    th,
    td {
      border-bottom: 1px solid #f1f3f8 !important;
      padding-left: 0 !important;
    }
    th {
      font-size: 14px;
      color: #333;
      background-color: #edeef1;
    }
    td {
      color: #444;
    }
  }
}
</style>
