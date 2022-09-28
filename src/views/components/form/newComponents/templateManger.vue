<template>
  <div>
    <TemplateManager title="模板管理" :visible="visible" @close="handlerClose" @handler-save="handlerSave">
      <el-form :model="ruleForm" :label-position="'top'">
        <el-row>
          <el-col :span="12">
            <el-form-item label="新增模板:">
              <el-button size="small">新增模板</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="删除模板:">
              <el-button size="small">删除模板</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="" prop="tableDate">
              <el-table :data="ruleForm.tableDate" style="width: 100%" max-height="250" @cell-click="handlerCellClick">
                <el-table-column type="selection" width="55" />
                <el-table-column label="模板类型">
                  <template #default="{ row }">
                    <span>{{ row.name.value }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="模板名称">
                  <template #default="{ row }">
                    <span>{{ row.name.value }}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="name" label="序号">
                  <template #default="{ row }">
                    <el-input
                      v-if="row.name.isShow"
                      size="small"
                      v-onlyNumber
                      v-focus
                      placeholder="请输入循环层号"
                      v-model="row.name.value"
                      @blur="row.name.isShow = false"
                    ></el-input>
                    <span v-else>{{ row.name.value }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </TemplateManager>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import TemplateManager from '@/components/Dialog/index.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:visible'])
const ruleForm = reactive({
  tableDate: [
    {
      name: {
        value: '',
        isShow: false,
      },
    },
    {
      name: {
        value: '',
        isShow: false,
      },
    },
  ],
})

const handlerClose = () => {
  emits('update:visible', false)
}

const handlerSave = () => {
  console.log(123)
}

const handlerCellClick = async (row: any, column: any, cell: HTMLElement, event: Event) => {
  if (!row[column.property]) return
  row[column.property]!.isShow = true
}
</script>
