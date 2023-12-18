<template>
  <MainCard class="flex flex-col">
    <div class="">
      <InquiryTitle title="查询条件"></InquiryTitle>
      <div class="py-12 flex gap-12">
        <SearchForm class="flex flex-wrap" v-model="searchForm" :formList="formList" :btnList="btnList"></SearchForm>
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <InquiryTitle title="查询结果"></InquiryTitle>
      <div class="flex-1 overflow-hidden mt-12">
        <TableList class="w-full h-full" url="/user/authAcl/getAuthAclTree" row-key="id" border listKey="children" :isPageNation="false" :columns="columns">
          <template #oprater="{ row }">
            <span class="text-[var(--el-color-primary)] cursor-pointer" @click="handlerEdit(row)">编辑</span>
            <span class="text-[var(--el-color-primary)] cursor-pointer ml-5" @click="handlerDelete(row)">删除</span>
          </template>
        </TableList>
      </div>
    </div>
    <el-button class="fixed bottom-12 right-24 z-1900" type="primary" @click="visible = true">新增</el-button>
    <MenuDialog v-if="visible" v-model:visible="visible"></MenuDialog>
  </MainCard>
</template>

<script setup lang="ts" name="MenuManage">
import { reactive, markRaw, ref } from 'vue'
import MenuDialog from './menuDialog.vue'
const visible = ref(false)
const searchForm = reactive({
  name: '吴鹏',
  name2: '张三',
  valSelect: '2',
})
const formList = markRaw([
  {
    name: 'el-input',
    models: 'name',
    props: {
      placeholder: '请输入',
      'prefix-icon': 'Search',
      size: 'small',
    },
  },
  {
    name: 'el-input',
    models: 'name2',
    props: {
      placeholder: '请输入',
      'prefix-icon': 'Search',
      size: 'small',
    },
  },
  {
    name: 'CustomSelect',
    models: 'valSelect',
    props: {
      placeholder: '请输入',
      options: [
        { label: 'nihao', value: '1' },
        { label: 'nihao2', value: '2' },
      ],
      size: 'small',
    },
  },
])
const btnList = markRaw([
  {
    name: 'test',
    iconName: 'mdiMagnify',
    type: 'primary',
    size: 'small',
    fun: handlerClick,
  },
  {
    name: '导出',
    iconName: 'mdiExport',
    type: 'primary',
    size: 'small',
    fun: exportfun,
  },
])
const tableData = reactive([
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
])
const columns = markRaw([
  {
    prop: 'aclName',
    label: '菜单名称',
    'show-overflow-tooltip': true,
  },
  {
    prop: 'aclOrderNo',
    label: '排序',
  },
  {
    prop: 'aclType',
    label: '菜单类型',
    'show-overflow-tooltip': true,
  },
  {
    prop: 'aclRouter',
    label: '路由地址',
    'show-overflow-tooltip': true,
  },
  {
    props: '',
    label: '操作',
    width: '100px',
    slot: 'oprater',
  },
])

function handlerClick(res) {
  console.log(`output->`, res)
}
function exportfun(rs) {
  console.log(`output->rs`, rs.value)
}

function handlerDelete(scope) {
  console.log(scope, 'scope')
}
function handlerEdit(item) {
  console.log(item)
}
</script>

<style></style>
