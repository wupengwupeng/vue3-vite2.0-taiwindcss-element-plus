<template>
  <el-popover v-bind="$attrs" placement="top-start" title="Title" :width="200" trigger="hover"
    content="this is content, this is content, this is content">
    <template #reference>
      <el-button>Hover to activate</el-button>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
// 此popover使用的是outsideclick



</script>