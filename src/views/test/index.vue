<template>
  <div>
    <span class="text-35 text-yellow-200">asdfasdf</span>
    <el-button>asdfsaf</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-input v-model="input" placeholder="Please input" />
    <Test />
    <TestInner />
    <TestInner />
    <TestTwo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    return {
      tableData,
    }
  },
})
</script>
