<template>
  <div class="flex gap-12">
    <button-loading type="primary" size="small" url="v2/task/Devices" :fun="handlerClick" @back-data="dataBack">
    </button-loading>
    <button-loading></button-loading>
    <button-loading></button-loading>
    <button-loading></button-loading>
    <button-loading></button-loading>
    <button-loading></button-loading>
    <button-loading></button-loading>
  </div>
</template>

<script setup lang="ts">
import { ApiResponse } from '@/utils/axios/request'
const dataBack = (res: ApiResponse) => {
  console.log(res)
}
const handlerClick = () => {
  //执行一些不需要调用接口的事情
}
</script>