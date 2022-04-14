
<script setup lang="ts">
import utils from '@/utils'

const list = [2, 22, 1, 2, 2, 1, 2, 12, 3, 1, 1, 23, 12, 12]
const listTwo = [
  { id: 0, name: '小明', age: 13 },
  { id: 1, name: '小明', age: 99 },
  { id: 2, name: '小明', age: 23 },
  { id: 3, name: '小红', age: 42 },
  { id: 4, name: '小明', age: 13 },
  { id: 5, name: '小芳', age: 35 },
  { id: 0, name: '小明', age: 13 },
  { id: 0, name: '小明', age: 13 },
  { id: 7, name: '', age: 23 },
  { id: 7, name: '', age: 23 },
  { id: 8, name: 'lm', age: 22 },
  { id: 9, name: 'xh', age: 79 }
]
//console.log(utils.unique(list), "list")
//console.log(utils.unique(listTwo, 'id'), 'nihao')
</script>

<template>
  <main-card>
    <div class="w-full h-full overflow-auto">
      <div class="h-500" v-for="item in 3" :key="item">
        asdf
        <el-button>
          <AppSvgIcon iconName="fn-pen" class="w-20 h-20 aa" />asdf
        </el-button>
        <app-svg-icon iconName="icon-edit" />
      </div>
    </div>
  </main-card>
</template>


