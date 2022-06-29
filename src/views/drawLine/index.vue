<template>
  <main-card>
    <span>form表单测试</span>
    <section class="w-500">
      <form-custom label-width="80px" v-model="state.formDate" :form-column="formColumn" :rules="rules">
        <template #footer>
          <div class="w-full flex justify-end">
            <el-button>取消</el-button>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </div>
        </template>
      </form-custom>
    </section>
  </main-card>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw } from 'vue'
import CustomSelect from '@/components/customSelect/index.vue'
const options = [
  {
    value: 'zhangan',
    label: 'shangsan'
  }
]
const formColumn = markRaw([
  {
    col: { span: 11 },
    formItemProps: {},
    label: '下拉框',
    prop: 'select',
    componentsProps: { options: options, clearable: true, onChange: handlerChange, onVisibleChange: handlerChangeVisible },
    type: CustomSelect
  },
  {
    col: { span: 11, offset: 2 },
    formItemProps: {},
    label: 'name',
    prop: 'val',
    componentsProps: { clearable: true },
    type: 'el-input'
  },
  {
    col: { span: 11, },
    formItemProps: {},
    label: '数字:',
    prop: 'val2',
    componentsProps: { clearable: true, placeholder: "Please input" },
    type: 'el-input-number'
  },
  {
    col: { span: 11, offset: 2 },
    formItemProps: {},
    label: '评分',
    prop: 'val3',
    componentsProps: { clearable: true },
    type: 'el-rate'
  },
  {
    col: { span: 11, },
    formItemProps: {},
    label: '滑块',
    prop: 'val4',
    componentsProps: { clearable: true },
    type: 'el-slider'
  },
  {
    col: { span: 24, },
    formItemProps: {},
    label: '意见',
    prop: 'val5',
    componentsProps: { clearable: true, type: "textarea", placeholder: '请输入你的意见或者建议' },
    type: 'el-input'
  },
  {
    slotName: 'footer',
    col: { span: 24 },
    formItemProps: {},
    label: '',
    prop: '',
    componentsProps: {},
    type: ''
  }
])
const rules = markRaw({
  select: [
    { required: true, message: 'Please select name', trigger: 'change' }
  ],
  val: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ],
  val5: [
    {
      required: true, message: 'Please input your suggestion', trigger: 'blur'
    }
  ]
})
const state = reactive({
  formDate: {
    select: 'zhangan',
    val: '你好',
    val2: 0,
    val3: undefined,
    val4: 8,
    val5: '你好哇',
  },
})

function handlerChange(val: any) {
  console.log(val)
}

function handlerChangeVisible(val: boolean) {
  console.log(val)
}

function handleSubmit() {
  console.log(state.formDate, "formDate")
}

</script>