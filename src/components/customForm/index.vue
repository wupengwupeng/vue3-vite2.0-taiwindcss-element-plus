<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="Activity name" prop="name">
        <el-input v-model="ruleForm.name" clearable />
        <custom-input placeholder="请输入你的建议" v-model="ruleForm.inputValue"></custom-input>
      </el-form-item>
      <el-form-item label="Activity zone">
        <custom-select :options="options" v-model="ruleForm.select">
          <template #option="{ item }">
            <span>{{ item.value }}</span>
          </template>
        </custom-select>
        <select-jsx></select-jsx>
      </el-form-item>
      <el-form-item label="Activity time" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker v-model="ruleForm.date1" type="date" label="Pick a date" placeholder="Pick a date" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery" prop="delivery">
        <!-- <el-switch v-model="ruleForm.delivery" /> -->
        <custom-data-picker
          v-model="ruleForm.rangeTime"
          type="datetimerange"
          :start-placeholder="'开始时间'"
          :end-placeholder="'结束时间'"
          range-separator="To"
          :has-disable-date="true"
          :spacing-time="15"
        >
        </custom-data-picker>
      </el-form-item>
      <el-form-item label="Activity type" prop="type">
        <!-- <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group> -->
        <custom-radio v-model="ruleForm.radio" :options="optionsRadio">
          <template #default="{ item }">
            <span>---{{ item.value }}----</span>
          </template>
        </custom-radio>
      </el-form-item>
      <el-form-item label="Resources" prop="resource">
        <custom-check-box v-model="checkAll" :isShowChecAll="true" v-model:checkedValue="ruleForm.checkedValue" :options="checkBoxOptions" @changeGroup="handlerChangeGroup">
          <template #default="{ item }">
            <span>{{ item.item.name }}</span>
          </template>
        </custom-check-box>
      </el-form-item>
      <el-form-item label="Activity form" prop="desc">
        <!-- <el-input v-model="ruleForm.desc" type="textarea" /> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const emits = defineEmits([''])
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  inputValue: '',
  select: 'Option1',
  rangeTime: [],
  radio: 'radios2',
  checkedValue: ['{"name":"张三","age":15,"six":"女"}', '{"name":"wuoeng","age":12,"six":"男"}'],
})

const checkBoxOptions = ref([
  {
    item: {
      name: '张三',
      age: 15,
      six: '女',
    },
    props: {},
  },
  {
    item: {
      name: 'wuoeng',
      age: 12,
      six: '男',
    },
    props: {},
  },
])
const checkAll = computed(() => {
  return ruleForm.checkedValue.length === checkBoxOptions.value.length
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  console.log(ruleForm, 'ruleForm')
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm, 'ruleForm')
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
])
const optionsRadio = ref([
  {
    label: 'radios1',
    value: 'value1',
  },
  {
    label: 'radios2',
    value: 'value2',
  },
])
const handlerChangeGroup = (res: Array<string>) => {
  console.log(res)
  console.log(ruleForm.checkedValue, 'sdf')
}
</script>
