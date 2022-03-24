<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full p-12">
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