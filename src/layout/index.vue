<template>
  <div class="h-screen w-screen flex" v-resize>
    <div class="flex flex-col" v-if="isHideSideBar && isHorizontalNav">
      <logoVue :isCollapse="isCollapse" :isHorizontalNav="isHorizontalNav"></logoVue>
      <SideBar key="side-one" :isCollapse="isCollapse" />
    </div>
    <div v-if="sideBarIphone" class="side-bar-position">
      <div class="side-bar-left" ref="target">
        <logoVue :isCollapse="isCollapseIphone" :isHorizontalNav="isHorizontalNav"></logoVue>
        <SideBar key="side-two" :isCollapse="isCollapseIphone" />
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <NavBar v-model="isCollapse" :isHorizontalNav="!isHorizontalNav" @handlerClickIcon="handlerClickIcon" />
      <div class="flex-1 overflow-hidden">
        <AppMain></AppMain>
      </div>
    </div>
    <three-d></three-d>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import SideBar from './components/sidebar/index.vue'
import NavBar from './components/nav/index.vue'
import logoVue from './components/nav/logo.vue'
import AppMain from './components/appMain/index.vue'
import { emitter } from '@/utils/mitt'
import { deviceDetection } from '@/utils/index'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    SideBar,
    NavBar,
    AppMain,
    logoVue,
  },
  setup() {
    const isCollapse = ref()
    const isCollapseIphone = ref(false)
    const target = ref(null)
    const isHideSideBar = ref(true)
    const isMobile = deviceDetection()
    const store = useStore()
    const isHorizontalNav = computed(() => {
      return store.state.config.nav === '1'
    })
    const sideBarIphone = computed(() => {
      return !isHideSideBar.value && isHorizontalNav.value && !isCollapseIphone.value
    })

    // 监听容器
    emitter.on('resize', ({ detail }) => {
      if (isMobile) return
      let { width } = detail
      /** width app-wrapper类容器宽度
       * 0 < width <= 760 隐藏侧边栏
       * 760 < width <= 990 折叠侧边栏
       * width > 990 展开侧边栏
       */
      if (width > 0 && width <= 760) {
        isHideSideBar.value = false
        isCollapse.value = true
      } else if (width > 760 && width <= 990) {
        isCollapse.value = true
        isHideSideBar.value = true
      } else if (width > 990) {
        isHideSideBar.value = true
        isCollapse.value = false
      }
    })
    onClickOutside(target, event => {
      isCollapseIphone.value = true
      isCollapse.value = false
    })
    const handlerClickIcon = (data: boolean) => {
      isCollapseIphone.value = false
    }
    return {
      sideBarIphone,
      target,
      isHorizontalNav,
      isCollapse,
      isCollapseIphone,
      isHideSideBar,

      handlerClickIcon,
    }
  },
})
</script>

<style lang="scss" scoped>
.side-bar-position {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(000, 000, 000, 0.4);
  left: 0;
  top: 0;
  z-index: 999;
  .side-bar-left {
    width: 200px;
    height: 100%;
    background: red;
    animation: 1s sideBarAnimation;
  }
  @keyframes sideBarAnimation {
    0% {
      width: 0px;
    }
    100% {
      width: 200px;
    }
  }
}
</style>
