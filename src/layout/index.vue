<template>
  <div class="h-screen w-screen flex" v-resize>
    <!-- 菜单类型1 -->
    <div class="flex flex-col" v-if="isHideSideBar && isHorizontalNav">
      <SideBar key="side-one" :isCollapse="isCollapse" :isHorizontalNav="isHorizontalNav" />
    </div>
    <!-- 适应手机端 -->
    <div v-if="sideBarIphone" class="side-bar-position">
      <div class="side-bar-left" ref="target">
        <div v-if="isHorizontalNav">
          <SideBar key="side-two" :isCollapse="isCollapseIphone" :isHorizontalNav="isHorizontalNav" />
        </div>
        <div v-if="menuTypeThree">
          <MenuMix key="side-three" :isCollapse="isCollapseIphone" :menuDate="menuDate" />
        </div>
      </div>
    </div>
    <!-- 菜单类型3 -->
    <div v-if="isHideSideBar && menuTypeThree"><MenuMix :isCollapse="isCollapse" key="side-three-key" :isMenuThreeNav="menuTypeThree" :menuDate="menuDate" /></div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <NavBar v-model="isCollapse" :isHorizontalNav="!isHorizontalNav" :isMenuThreeNav="menuTypeThree" @handlerClickIcon="handlerClickIcon" />
      <div class="flex-1 overflow-hidden">
        <AppMain></AppMain>
      </div>
    </div>
    <!-- <three-d></three-d> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, toRef, computed, watch, provide } from 'vue'
import { onClickOutside } from '@vueuse/core'
import SideBar from './components/sidebar/index.vue'
import MenuMix from './components/sidebar/menuMix/index.vue'
import NavBar from './components/nav/index.vue'
import logoVue from './components/nav/logo.vue'
import AppMain from './components/appMain/index.vue'
import { emitter } from '@/utils/mitt'
import { deviceDetection } from '@/utils/index'
import { useStore } from '@/store'
import { useRoute, RouteRecordRaw } from 'vue-router'

export default defineComponent({
  components: {
    SideBar,
    MenuMix,
    NavBar,
    AppMain,
    logoVue,
  },
  setup() {
    const isCollapse = ref()
    const isCollapseIphone = ref(false)
    const target = ref(null)
    const isHideSideBar = ref(true)
    const store = useStore()
    const menuDate: Ref<Array<RouteRecordRaw>> = ref([])

    const isHorizontalNav = computed(() => {
      return store.state.config.nav === '1'
    })
    const menuTypeThree = computed(() => {
      return store.state.config.nav === '3'
    })
    const sideBarIphone = computed(() => {
      return !isHideSideBar.value && (isHorizontalNav.value || menuTypeThree.value) && !isCollapseIphone.value
    })

    // 监听容器
    emitter.on('resize', ({ detail }) => {
      // if (isMobile) return
      let { width } = detail
      /** width app-wrapper类容器宽度
       * 0 < width <= 760 隐藏侧边栏
       * 760 < width <= 990 折叠侧边栏
       * width > 990 展开侧边栏
       */
      if (width > 0 && width <= 760) {
        isHideSideBar.value = false
        isCollapseIphone.value = false
        isCollapse.value = true
      } else if (width > 760 && width <= 990) {
        isCollapse.value = true
        isHideSideBar.value = true
      } else if (width > 990) {
        isHideSideBar.value = true
        isCollapse.value = false
      }
    })
    emitter.on('emitsCustom', function (item) {
      menuDate.value = (item as RouteRecordRaw | any).children
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
      menuDate,
      menuTypeThree,
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
