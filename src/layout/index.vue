<template>
  <div class="h-screen w-screen flex">
    <div>
      <SideBar :isCollapse="isCollapse" />
    </div>
    <div class="flex-1 flex flex-col">
      <NavBar v-model="isCollapse" />
      <div class="flex-1 overflow-hidden">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import SideBar from './components/sidebar/index.vue'
import NavBar from './components/nav/index.vue'

export default defineComponent({
  components: {
    SideBar,
    NavBar,
  },
  setup() {
    const isCollapse = ref()
    watch(
      isCollapse,
      () => {
        console.log(isCollapse.value, 9999)
      },
      { immediate: true }
    )
    return {
      isCollapse,
    }
  },
})
</script>

<style lang="scss" scoped></style>
