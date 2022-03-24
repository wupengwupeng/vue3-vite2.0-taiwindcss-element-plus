<template>
  <main-card>
    <div class="overflow-auto">
      <div class="h-500" v-for="item in 1" :key="item">
        asdf
        <el-button>
          <AppSvgIcon iconName="fn-pen" class="w-20 h-20 aa" />asdf
        </el-button>
        <app-svg-icon iconName="icon-edit" />
      </div>
    </div>
  </main-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() { },
})
</script>
