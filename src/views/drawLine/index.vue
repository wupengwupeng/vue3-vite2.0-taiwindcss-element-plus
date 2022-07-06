<template>
  <main-card>
    <span>form表单测试</span>
    <section class="w-500">
      <form-custom label-width="80px" v-model="state.formDate" :form-column="column" :rules="rules">
        <template #footer>
          <div class="w-full flex justify-end">
            <el-button>取消</el-button>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </div>
        </template>
      </form-custom>
    </section>
    <section class="border h-60">
      <create-element :item="{ name: '你是你妈' }">
        <template #other="{ name }">
          {{ name }} woshi nidaye
        </template>
      </create-element>
    </section>
  </main-card>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw } from 'vue'
import { useFormColumn } from './index'
const { column, emitter, rules, } = useFormColumn()

emitter.on('handlerChange', (val) => {
  console.log(val, "val")
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



function handleSubmit() {
  console.log(state.formDate, "formDate")
}

</script>