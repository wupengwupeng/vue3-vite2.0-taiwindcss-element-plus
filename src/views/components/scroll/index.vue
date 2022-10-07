<script setup lang="ts">
import { defineProps, unref, toRefs, ref, reactive } from 'vue'
import Child from './child.vue'

import { templateRef } from '@vueuse/core'
const info = ref<string>('')
const handlerSubmit = (val: string): void => {
  info.value = val
}

// eslint-disable-next-line no-undef
const scroll = templateRef<any>('scroll', null)

let listData = ref([
  {
    title: '无缝滚动第一行无缝滚动第一行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第二行无缝滚动第二行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第三行无缝滚动第三行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第四行无缝滚动第四行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第五行无缝滚动第五行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第六行无缝滚动第六行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第七行无缝滚动第七行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第八行无缝滚动第八行！！！！！！！！！！',
  },
  {
    title: '无缝滚动第九行无缝滚动第九行！！！！！！！！！！',
  },
])

let classOption = reactive({
  direction: 'top',
})

function changeDirection(val: string) {
  // @ts-ignore
  unref(scroll).reset()
  unref(classOption).direction = val
}
</script>

<template>
  <main-card>
    <h1 class="text-30">Infinite scroll</h1>
    {{ info }}
    <Child :info="info" @submit="handlerSubmit"></Child>
    <el-space wrap>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>无缝滚动示例</span>
            <el-button class="button" type="primary" @click="changeDirection('top')">
              <span :style="{ color: classOption.direction === 'top' ? 'red' : '' }">向上滚动</span>
            </el-button>
            <el-button class="button" type="primary" @click="changeDirection('bottom')">
              <span
                :style="{
                  color: classOption.direction === 'bottom' ? 'red' : '',
                }"
                >向下滚动</span
              >
            </el-button>
            <el-button class="button" type="primary" @click="changeDirection('left')">
              <span :style="{ color: classOption.direction === 'left' ? 'red' : '' }">向左滚动</span>
            </el-button>
            <el-button class="button" type="primary" @click="changeDirection('right')">
              <span :style="{ color: classOption.direction === 'right' ? 'red' : '' }">向右滚动</span>
            </el-button>
          </div>
        </template>
        <re-seamless-scroll ref="scroll" :data="listData" :class-option="classOption" class="warp">
          <ul class="item">
            <li v-for="(item, index) in listData" :key="index">
              <span class="title" v-text="item.title"></span>
            </li>
          </ul>
        </re-seamless-scroll>
      </el-card>
    </el-space>
  </main-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-right: 20px;
  }
}

.warp {
  height: 270px;
  width: 360px;
  margin: 0 auto;
  overflow: hidden;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;

    li,
    a {
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
</style>
