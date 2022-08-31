<template>
  <main-card>
    <div class="h-full w-full flex flex-col">
      <h1 class="h-90 flex items-center">流程图</h1>
      <div class="flex-1">
        <LogicFlow :data="dataTurbo" />
      </div>
    </div>
  </main-card>
</template>


<script lang="ts">
import { defineComponent, nextTick } from 'vue'

import dataTurbo from './dataTurbo.json'
export default defineComponent({
  setup() {
    return {
      dataTurbo,
    }
  },
})
</script>
