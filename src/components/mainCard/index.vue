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
  overflow-y: auto;
  background: rgba(206, 193, 193, .01); // TODO Should i add opacity property?
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  // background: var(--background);
}
</style>