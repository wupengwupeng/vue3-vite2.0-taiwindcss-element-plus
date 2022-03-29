<script setup lang="ts">

</script>

<template>
  <div class="card-main">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card-main {
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
</style>