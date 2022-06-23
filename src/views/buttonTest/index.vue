<template>
  <main-card>
    <div class="flex flex-col gap-12" @click="handlerMouseover">
      <header class="flex gap-12">
        <button-loading type="primary" size="small" url="v2/task/Devices" :fun="handlerClick" @back-data="dataBack">
        </button-loading>
        <button-loading></button-loading>
        <button-loading></button-loading>
        <button-loading></button-loading>
        <button-loading></button-loading>
        <button-loading></button-loading>
        <button-loading></button-loading>
      </header>
      <main>
        <article>
          <header>头部</header>
          <section>
            <popover-custom ref="poperRef" :isShowMenu="false" v-model:visible="visible" placement="top-start"
              :width="200" trigger="contextmenu">
              <template #header>
                <el-button @click="visible = true">点击我</el-button>
              </template>
              <template #default>
                <el-button @click="handlerClosePorper">关闭我</el-button>
              </template>
            </popover-custom>
          </section>
          <footer>脚步
            <a href="./GITT.xls" download="文件下载的本地">下载文件</a>
          </footer>
        </article>
        <aside>
          <section class="w-1/2 border">
            <custom-form></custom-form>
          </section>
        </aside>
      </main>
      <footer>
        footer
      </footer>
    </div>
  </main-card>
</template>

<script setup lang="ts">
import { ApiResponse } from '@/utils/axios/request'
import utils from '@/utils/index'
import { onMounted, ref, Ref } from 'vue';
import popoverCustom from '@/components/popoverCustom/index.vue'
import { debounce } from 'lodash'

const visible = ref(false)
const poperRef: Ref<InstanceType<typeof popoverCustom> | null> = ref(null)

const a = { age: 12 } as const

function square(i: number) {
  return i * i
}
function dobble(i: number) {
  return i += 2
}



const dataBack = (res: ApiResponse) => {
  console.log(res)
}
const handlerClick = () => {
  //执行一些不需要调用接口的事情
}
const fun = () => {
  console.log(222)

}
// 点击关闭
const handlerClosePorper = () => {
  visible.value = false
  console.log(poperRef.value?.proper(), "poperRef")
}
// 鼠标
const handlerMouseover = () => {
  // utils.debounce(fun, 1000, this, false)()
  // debounce(fun, 1000)()
}
onMounted(() => {
  // window.addEventListener('resize', utils.debounce(fun, 1000, window, false))
  window.addEventListener("mousemove", utils.throttle(fun, 1000));
})


// Includes
type Includes<T extends readonly any[], U> = {
  // [k in keyof T]: Equal<T[k], U>;
}
</script>