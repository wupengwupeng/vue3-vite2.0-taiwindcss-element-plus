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
        <Suspense>
          <template #default>
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <keep-alive>
                  <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
                </keep-alive>
              </transition>
            </router-view>
          </template>
          <template #fallback>
            <div class="w-full h-full flex justify-center items-center">
              <div
                class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex cursor-context-menu"
              >
                <div class="m-auto text-gray-200">
                  <!-- Animation Snippet -->
                  <div>
                    <span
                      class="w-12 h-12 ml-2 rounded-full bg-gray-200 inline-block animate-flash"
                    ></span>
                    <span
                      class="w-12 h-12 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.2s]"
                    ></span>
                    <span
                      class="w-12 h-12 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.4s]"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Suspense>
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
