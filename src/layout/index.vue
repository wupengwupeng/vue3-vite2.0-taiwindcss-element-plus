<template>
  <div class="h-screen w-screen flex">
    <div>
      <SideBar />
    </div>
    <div class="flex-1 flex flex-col">
      <NavBar />
      <div class="flex-1 overflow-hidden">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './components/sidebar/index.vue'
import NavBar from './components/nav/index.vue'
export default defineComponent({
  components: {
    SideBar,
    NavBar,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
