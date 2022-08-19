<script setup lang="ts">

</script>

<template>

  <div
    class="w-full h-full p-12 bg-[url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F16%2F70%2F5b89c00dc9167.jpg%21%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650700020&t=da5e3718225a25f7c4a2e6f71dbfe5fa)] bg-opacity-20 bg-cover bg-center bg-fixed">
    <!-- <el-config-provider>
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </el-config-provider> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>


<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 600ms;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(20%);
  opacity: 0.2;
}
</style>