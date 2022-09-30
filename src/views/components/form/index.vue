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
    <section class="border dark:border-red-300 h-auto">
      <el-button @click="handlerOpen">点击我打开弹框</el-button>
      <!-- <custom-input-number v-model="value"></custom-input-number> -->
      <div>222222222</div>
      <custom-input v-model="value" :argOptions="{ maxLength: 4, reg: /[^\d\,]/g }" />
    </section>
    <section class="border dark:border-red-300">
      <div class="w-200">
        <ellipsis-box
          :is-more="true"
          :content="'你是大爷吗我是你大爷反正我是你sddddddddddd首发式地方撒旦发顺丰第三方案说法爸爸dffffffffffffffffffffffffffffffffffffffffffffffffff'"
        >
        </ellipsis-box>
      </div>
    </section>

    <section>
      <span>导出excel为chart</span>
      <el-button @click="handlerExportExcel">导出为excel</el-button>
    </section>
  </main-card>
  <TemplateDown v-if="templateVisible" v-model:visible="templateVisible"></TemplateDown>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, Ref } from 'vue'
import { useFormColumn } from './index'
import TemplateDown from './newComponents/templateDown.vue'

const { column, emitter, rules } = useFormColumn()

const templateVisible: Ref<boolean> = ref(false)
emitter.on('handlerChange', val => {
  console.log(val, 'val')
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
const value = ref('')

function handleSubmit() {
  console.log(state.formDate, 'formDate')
}

function handlerOpen() {
  templateVisible.value = true
}
async function handlerExportExcel() {
  console.log(123)

  // const gen = new XlsxGenerator();

  // await gen.createWorkbook();

  // const sheet1 = await gen.createWorksheet("sheet1");

  // const sheet2 = await gen.createWorksheet("sheetWithChart2");

  // const header = ["h", "b", "c", "d"];
  // const row1 = ["label1", 2, 3, 4];
  // const row2 = ["label2", 5, 6, 7];

  // await sheet2.addTable([header, row1, row2]);

  // const opt: IData = {
  //   title: {
  //     name: "testChart line",
  //     color: "8ab4f8",
  //     size: 5000,
  //   },
  //   range: "B1:D3",
  //   type: "line",
  //   rgbColors: ["8ab4f8", "ff7769"],
  //   labels: true, //table contains labels
  //   marker: {
  //     size: 4,
  //     shape: "square", //marker shapes, can be circle, diamond, star
  //   },
  //   lineWidth: 20000,
  // };

  // await sheet2.addChart(opt);

  // const sheet3 = await gen.createWorksheet("sheet3");

  // await gen.generate(__dirname + "/test", "file");
  // you can also generate buffer
}
</script>
