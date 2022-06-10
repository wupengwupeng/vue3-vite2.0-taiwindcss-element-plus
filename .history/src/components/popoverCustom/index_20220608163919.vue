<template>
  <el-popover v-bind="$attrs" placement="top-start" title="Title" :width="200" trigger="hover"
    content="this is content, this is content, this is content">
    <template #reference>
      <el-button>Hover to activate</el-button>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
// 此popover使用的是outsideclick解决点击内部进行关闭，点击外部也可以进行关闭的问题。



</script>