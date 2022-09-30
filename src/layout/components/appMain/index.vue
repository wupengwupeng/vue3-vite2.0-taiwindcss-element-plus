<script setup lang="ts"></script>

<template>
  <div class="app-content">
    <el-config-provider>
      <!-- <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view> -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-config-provider>
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
