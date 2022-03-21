<template>
  <div class="h-screen w-screen flex">
    <div class="flex flex-col">
      <div class="h-60 w-full flex items-center justify-center">
        <el-image :style="elImage" :src="logoUrl" fit="contain" />
      </div>
      <SideBar :isCollapse="isCollapse" />
    </div>
    <div class="flex-1 flex flex-col">
      <NavBar v-model="isCollapse" />
      <div class="flex-1 overflow-hidden">
        <router-view v-slot="{ Component, route }">
          <transition name="app-main-fade" mode="out-in">
            <keep-alive :max="10">
              <component :is="Component" :key="route.path"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, computed, watch } from 'vue'
import SideBar from './components/sidebar/index.vue'
import NavBar from './components/nav/index.vue'
import logoUrl from '@/assets/logo.png'
export default defineComponent({
  components: {
    SideBar,
    NavBar,
  },
  setup() {
    const isCollapse = ref()
    const keepAliveInclude = /^KeepAlive-/
    const elImage = computed(() => {
      return !isCollapse.value ? { width: '200px', height: '60px' } : { width: '63px', height: '60px' }
    })
    return {
      isCollapse,
      logoUrl,
      elImage,
      keepAliveInclude,
    }
  },
})
</script>

<style lang="scss" scoped></style>
