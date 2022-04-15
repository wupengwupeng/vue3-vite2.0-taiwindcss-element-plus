<template>
  <div class="h-screen w-screen flex">
    <div class="flex flex-col">
      <div class="h-60 w-full flex items-center justify-center">
        <el-image :style="elImage" :src="logoUrl" fit="contain" />
      </div>
      <SideBar :isCollapse="isCollapse" />
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <NavBar v-model="isCollapse" />
      <div class="flex-1 overflow-hidden">
        <AppMain></AppMain>
      </div>
    </div>
    <three-d></three-d>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, computed, watch } from 'vue'
import SideBar from './components/sidebar/index.vue'
import NavBar from './components/nav/index.vue'
import AppMain from './components/appMain/index.vue'
import logoUrl from '@/assets/logo.png'
export default defineComponent({
  components: {
    SideBar,
    NavBar,
    AppMain,
  },
  setup() {
    const isCollapse = ref()
    const elImage = computed(() => {
      return !isCollapse.value ? { width: '200px', height: '60px' } : { width: '63px', height: '60px' }
    })
    //console.log(navigator.userAgent, "isMobile")
    return {
      isCollapse,
      logoUrl,
      elImage,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
