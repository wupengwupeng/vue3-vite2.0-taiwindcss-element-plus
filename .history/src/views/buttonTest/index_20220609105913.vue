<template>
  <div class="flex flex-col gap-12 bg-red-300" @click="handlerMouseover">
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
          <popover-custom v-model:visible='visible' placement="top-start" :width="200" trigger="click" />
        </section>
        <footer>脚步</footer>
      </article>
      <aside>
        aside
      </aside>
    </main>
    <footer>
      footer
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ApiResponse } from '@/utils/axios/request'
import utils from '@/utils/index'
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash'


const visible = ref(false)

const a = { age: 12 } as const
const dataBack = (res: ApiResponse) => {
  console.log(res)
}
const handlerClick = () => {
  //执行一些不需要调用接口的事情
}
const fun = () => {
  console.log(222)

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