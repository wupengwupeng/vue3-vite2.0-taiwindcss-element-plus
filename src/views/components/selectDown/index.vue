<script setup lang="ts">
import { ref, watch, unref } from 'vue'
// import the component
import Treeselect from 'vue3-treeselect'
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'

import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

interface User {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
  amount4: string
  amount5: string
  amount6: number
}

interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps): any => {
  // //console.log(row)
  // //console.log(column)
  // //console.log(rowIndex, 'row')
  // //console.log(columnIndex, 'column')
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}

const tableData: User[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
    amount4: '234',
    amount5: '3.2',
    amount6: 10,
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
    amount4: '234',
    amount5: '3.2',
    amount6: 10,
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
    amount4: '234',
    amount5: '3.2',
    amount6: 10,
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
    amount4: '234',
    amount5: '3.2',
    amount6: 10,
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
    amount4: '234',
    amount5: '3.2',
    amount6: 10,
  },
]

const value = ref(null)
const options = ref([
  {
    id: 'a',
    label: 'a',
    name: 'a',
    children: [
      {
        id: 'aa',
        name: 'a-a',
        label: 'aa',
        children: [
          {
            id: 'ab-a',
            name: 'a-b-a',
            label: 'ab-a',
          },
        ],
      },
      {
        id: 'ab',
        name: 'a-b',
        label: 'ab',
      },
    ],
  },
  {
    id: 'b',
    name: 'b',
    label: 'b',
    children: [
      {
        id: 'b-b',
        name: 'b-b',
        label: 'b-b',
      },
      {
        id: 'b-b-b',
        name: 'b-b-b',
        label: 'b-b-b',
      },
    ],
  },
  {
    id: 'c',
    name: 'c',
    label: 'c',
    children: [
      {
        id: 'c-c',
        name: 'c-c',
        label: 'c-c',
      },
      {
        id: 'c-c-c',
        name: 'c-c-c',
        label: 'c-c-c',
      },
    ],
  },
])

watch(value, () => {
  //console.log(unref(value), 223)
})
</script>

<template>
  <main-card class="overflow-y-auto overflow-x-hidden">
    <div class="p-12">
      <div class="card-header">
        <span class="font-medium">
          采用
          <el-link href="https://github.com/megafetis/vue3-treeselect" target="_blank" style="font-size: 16px; margin: 0 4px 5px">vue3-treeselect</el-link>
          <el-link href="https://github.com/megafetis/vue3-treeselect" target="_blank" style="font-size: 16px; margin: 0 4px 5px">TreeSelect</el-link>写法
          <el-link href="https://github.com/megafetis/vue3-treeselect" target="_blank" style="font-size: 16px; margin: 0 4px 5px">How to use it?</el-link>
        </span>
      </div>
      <div>
        <treeselect v-model="value" :multiple="true" placeholder="请选择企业架构" :options="options" />
      </div>
      <el-divider />
      <el-table :data="tableData" :span-method="objectSpanMethod" border>
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="amount1" label="Amount 1" />
        <el-table-column prop="amount2" label="Amount 2" />
        <el-table-column prop="amount3" label="Amount 3" />
        <el-table-column prop="amount4" label="Amount 4" />
        <el-table-column prop="amount5" label="Amount 5" />
        <el-table-column prop="amount6" label="Amount 6" />
      </el-table>
    </div>
    <el-divider />
    <div class="border dark:border-[#4c4d4f]">
      <tree-list :tree-list="options"></tree-list>
    </div>
    <el-divider></el-divider>
    <tree-select />
  </main-card>
</template>

<style lang="scss" scoped></style>
