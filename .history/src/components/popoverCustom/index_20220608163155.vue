<template>
  <div>
    <el-popover placement="top-start" title="Title" :width="200" trigger="hover"
      content="this is content, this is content, this is content">
      <template #reference>
        <el-button>Hover to activate</el-button>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">



</script>