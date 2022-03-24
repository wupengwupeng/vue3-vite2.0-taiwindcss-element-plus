<script setup lang="ts">

</script>

<template>
  <div
    class="w-full h-full p-12 bg-[url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F16%2F70%2F5b89c00dc9167.jpg%21%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650700020&t=da5e3718225a25f7c4a2e6f71dbfe5fa)] bg-opacity-20 bg-cover bg-center bg-fixed"
  >
    <Suspense>
      <template #default>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.path" />
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
                <span class="w-12 h-12 ml-2 rounded-full bg-gray-200 inline-block animate-flash"></span>
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
</template>


<style lang="scss" scoped>
</style>