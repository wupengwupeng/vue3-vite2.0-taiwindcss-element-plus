<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

defineProps<{ msg: string }>()

const count = ref(0)
const input = ref('element-plus')
const loading = ref(true)
const curDate = ''

const toast = () => {
  ElMessage.error('Hello')
}
</script>

<template>
  <div class="flex items-center justify-center">
    <ChangeTheme />
    <h3>切换主题</h3>
  </div>
  <el-link href="https://element.eleme.io" target="_blank">default</el-link>
  <el-link type="primary">primary</el-link>
  <el-link type="success">success</el-link>
  <el-link type="warning">warning</el-link>
  <el-link type="danger">danger</el-link>
  <el-link type="info">info</el-link>
  <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
  <el-checkbox v-model="checked2" label="Option 2" size="large"></el-checkbox>
  <h1 class="text-red-300">{{ msg }}</h1>
  <span class="bg-red-700">你好测试taiwindcss</span>
  <p v-loading="loading">
    See
    <a href="https://element-plus.org" target="_blank">element-plus</a> for more information.
  </p>
  <el-pagination
    v-model:currentPage="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
  <!-- example components -->
  <el-button @click="toast">El Message</el-button>
  <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
  <el-button type="success" @click="count++">count is: {{ count }}</el-button>
  <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
  <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
  <el-button type="info" @click="count++">count is: {{ count }}</el-button>
  <br />
  <el-input v-model="input" style="width: 200px; margin: 20px" />
  <el-tag>Tag 1</el-tag>

  <br />
  <el-date-picker v-model="curDate" type="date" placeholder="Pick a day"></el-date-picker>

  <p>For example, we can custom primary color to 'green'.</p>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test components.
  </p>
  <p>
    Edit
    <code>styles/element/var.scss</code> to test scss variables.
  </p>

  <p>
    Full Example:
    <a href="https://github.com/element-plus/element-plus-vite-starter" target="_blank">element-plus-vite-starter</a>
    | On demand Example:
    <a href="https://github.com/element-plus/unplugin-element-plus" target="_blank">unplugin-element-plus/examples/vite</a>
  </p>
</template>
