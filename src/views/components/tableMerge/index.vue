<script setup lang="ts">
import { spanRow } from '@/utils/tableSpan'
import { printJs } from '@/utils/index'
const data = [
  { field1: '营业收费系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-04', filed5: '4' },
  { field1: '营业收费系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-05', filed5: '2' },
  { field1: '营业收费系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-06', filed5: '2' },
  { field1: '营业收费系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-07', filed5: '2' },
  { field1: '营业收费系统', field2: '中国农业银行', field3: '小计', filed4: '', filed5: '2' },
  { field1: '营业收费系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-05', filed5: '3' },
  { field1: '营业收费系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-06', filed5: '2' },
  { field1: '营业收费系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-07', filed5: '2' },
  { field1: '营业收费系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-08', filed5: '2' },
  { field1: '营业收费系统', field2: '中国建设银行', field3: '小计', filed4: '', filed5: '2' },
  { field1: '营业收费系统', field2: '小计', field3: '', filed4: '', filed5: '1' },

  { field1: '报装管理系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-04', filed5: '12' },
  { field1: '报装管理系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-05', filed5: '21' },
  { field1: '报装管理系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-06', filed5: '21' },
  { field1: '报装管理系统', field2: '中国农业银行', field3: '2022-03', filed4: '2022-03-07', filed5: '21' },
  { field1: '报装管理系统', field2: '中国农业银行', field3: '小计', filed4: '', filed5: '6' },
  { field1: '报装管理系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-05', filed5: '11' },
  { field1: '报装管理系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-06', filed5: '53' },
  { field1: '报装管理系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-07', filed5: '53' },
  { field1: '报装管理系统', field2: '中国建设银行', field3: '2022-04', filed4: '2022-04-08', filed5: '53' },
  { field1: '报装管理系统', field2: '中国建设银行', field3: '小计', filed4: '', filed5: '32' },
  { field1: '报装管理系统', field2: '小计', field3: '', filed4: '', filed5: '23' },
]
const option = [
  { index: 0, field: 'field1' },
  { index: 1, field: 'field2' },
  { index: 2, field: 'field3' },
]
const onSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  return spanRow({ row, column, rowIndex, columnIndex }, data, option)
}
let combineArr: any = []
const tableData = [
  {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区0',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 500,
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区1',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 300,
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区1',
    address: '上海市普陀区金沙江路 1520 弄',
    zip: 200,
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区1',
    address: '上海市普陀区金沙江路 1521 弄',
    zip: 100,
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区2',
    address: '上海市普陀区金沙江路 1522 弄',
    zip: 100,
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区3',
    address: '上海市普陀区金沙江路 1523 弄',
    zip: 100,
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区3',
    address: '上海市普陀区金沙江路 1524 弄',
    zip: 200,
  },
  {
    date: '2016-05-05',
    name: '王小虎',
    province: '上海',
    city: '普陀区4',
    address: '上海市普陀区金沙江路 1525 弄',
    zip: 300,
  },
]

const flitterData = (arr: any) => {
  let spanOneArr: any = []
  let concatOne = 0
  arr.forEach(function (item: any, index: any) {
    if (index === 0) {
      spanOneArr.push(1)
    } else {
      if (item.date === arr[index - 1].date) {
        //第一列需合并相同内容的判断条件
        spanOneArr[concatOne] += 1
        spanOneArr.push(0)
      } else {
        spanOneArr.push(1)
        concatOne = index
      }
    }
  })
  return {
    one: spanOneArr,
  }
}
//console.log(flitterData(tableData), "阿斯蒂芬")
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  if (rowIndex === 0) {
    if (columnIndex === 0) {
      return [1, 6]
    }
    if (columnIndex < 6) {
      return [0, 0]
    }
  } else {
    if (columnIndex === 0) {
      const _row = flitterData(tableData).one[rowIndex]
      const _col = _row > 0 ? 1 : 0
      combineArr = [_row, _col]
      return combineArr
    } else if (columnIndex === 3 || columnIndex === 5) {
      return combineArr
    }
  }
}
const printHtml = () => {
  const payLoad = {
    printable: 'printJS-table',
    type: 'html',
    header: 'PrintJS - table Element Selection',
    // css: 'color: red'
    // printable: data, properties: ['field1', 'field2', 'field3', 'filed4', 'filed5'], type: 'json'
  }
  printJs(payLoad)
}
</script>

<template>
  <main-card>
    <div class="w-full h-500">
      <el-table id="printJS-table" :data="data" border :span-method="onSpanMethod" height="100%">
        <el-table-column prop="field1" label="field1"></el-table-column>
        <el-table-column prop="field2" label="field2"></el-table-column>
        <el-table-column prop="field3" label="field3"></el-table-column>
        <el-table-column prop="filed4" label="filed4"></el-table-column>
        <el-table-column prop="filed5" label="filed5"></el-table-column>
      </el-table>
      <el-button @click="printHtml">打印</el-button>
    </div>
    <div class="pt-12" v-if="false">
      <el-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="city" label="市区"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="zip" label="邮编"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </main-card>
</template>
