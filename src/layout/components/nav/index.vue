<template>
  <div class="w-full shadow-inner flex flex-col">
    <div class="flex h-58 justify-between">
      <div v-if="!isHorizontalNav || isMenuThreeNav" class="flex items-center px-12 h-full" :class="navRight">
        <navIcon v-model="isCollapse" @handlerClickIcon="handlerClickIcon"></navIcon>
        <div class="ml-12">
          <nav-bread-crumb-vue v-if="isShowBreadCrumb && !isMenuThreeNav" :menus="menus"></nav-bread-crumb-vue>
        </div>
      </div>
      <!-- 菜单类型2 -->
      <div v-if="isHorizontalNav && !isMenuThreeNav" class="flex-1 flex items-center h-full overflow-hidden">
        <horizontalVue :isCollapse="isCollapse" :isShowBreadCrumb="isShowBreadCrumb" :isHorizontalNav="isHorizontalNav"></horizontalVue>
      </div>
      <!-- 菜单类型3 -->
      <div v-if="isMenuThreeNav" class="flex-1 overflow-hidden"><MixHorizontal /></div>
      <div class="flex items-center justify-between" :class="navRight">
        <div id="searchVue">
          <searchVue />
        </div>
        <div id="notice">
          <notice />
        </div>
        <div id="screenFull">
          <screenFullVue />
        </div>
        <div id="translate">
          <translateVue />
        </div>
        <div id="setting">
          <settingVue @openSetting="visible = true" />
        </div>
        <headPicture />
      </div>
    </div>
    <!-- 标签-->
    <div class="h-40 flex items-center bg-white dark:bg-black shadow px-12 w-full border-t dark:border-t-[#4c4d4f]">
      <el-button size="small" @click="handleScroll(180)">
        <app-svg-icon iconName="arrow-left"></app-svg-icon>
      </el-button>
      <div class="flex-1 overflow-hidden px-16 flex flex-nowrap" ref="scrollbarDom">
        <div class="flex flex-nowrap gap-12 overflow-visible" ref="tabDom" :style="getTabStyle">
          <el-tag
            v-for="(tag, index) in tags"
            class="hover: cursor-pointer"
            :class="tag.name === isActive ? '' : 'tag-active'"
            :ref="'dynamic' + index"
            :key="tag.name"
            closable
            :type="tag.type"
            round
            :effect="elTagEffect"
            @click="handlerClickTag(tag)"
            @close="handleCloseTags(tag.name)"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
      <el-button size="small" @click="handleScroll(-180)">
        <app-svg-icon class="rotate-180" iconName="arrow-left"></app-svg-icon>
      </el-button>
    </div>
    <settingDrawerVue ref="settingRef" v-model:visible="visible"></settingDrawerVue>
  </div>
  <Driver :storeName="'driver'" :steps="steps"></Driver>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, toRefs, reactive, onBeforeMount, unref, Ref, onMounted, CSSProperties, getCurrentInstance } from 'vue'
import navIcon from './navIcon.vue'
import circleUrl from '@/assets/logo.png'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from '@/store/index'
import { RootMutations } from '@/store/type'
import { emitter } from '@/utils/mitt'
import { deviceDetection } from '@/utils/index'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'
import navBreadCrumbVue from './navBreadCrumb.vue'
import settingDrawerVue from './settingDrawer.vue'
import horizontalVue from '../sidebar/horizontal.vue'
import MixHorizontal from '../sidebar/menuMix/mixHorizontal.vue'
import screenFullVue from './screenfull/index.vue'
import settingVue from './setting/index.vue'
import headPicture from './headPicture/index.vue'
import notice from './notice/index.vue'
import searchVue from './search/index.vue'
import translateVue from './translate/index.vue'
import { steps } from './index'
export default defineComponent({
  components: {
    navIcon,
    navBreadCrumbVue,
    settingDrawerVue,
    horizontalVue,
    MixHorizontal,
    screenFullVue,
    settingVue,
    headPicture,
    notice,
    searchVue,
    translateVue,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    isHorizontalNav: {
      type: Boolean,
      default: false,
    },
    isMenuThreeNav: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'handlerClickIcon'],
  setup(props, { emit }) {
    const getColor: string = document.documentElement.style.getPropertyValue('--el-tag-bg-color') as string
    const { modelValue } = toRefs(props)
    const visible = ref(false)
    const settingRef = ref()
    const scrollbarDom = ref()
    const instance: any = getCurrentInstance()
    const tabDom = ref()
    const isMobile = deviceDetection()
    const isShowBreadCrumb = ref(true)
    const store = useStore()
    const route: any = useRoute()
    const router: any = useRouter()
    const tags: any = store.state.tags
    const translateX = ref<number>(0)

    const state = reactive({
      menus: [] as Array<RouteLocationMatched>,
      isActive: route.meta.title,
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
      if (width < 780) {
        isShowBreadCrumb.value = false
      } else {
        isShowBreadCrumb.value = true
      }
    })
    const elTagEffect = computed(() => {
      return store.state.config.dayDark === '2' ? 'dark' : 'light'
    })

    const navRight = computed(() => {
      if ((store.state.config.nav === '2' || store.state.config.nav === '3') && store.state.config.dayDark === '1') {
        return `bg-[#001529] text-[#fff]`
      }
      return ''
    })
    const getTabStyle = computed((): CSSProperties => {
      return {
        transform: `translateX(${translateX.value}px)`,
      }
    })

    const isCollapse = computed({
      get() {
        return modelValue.value
      },
      set(value: boolean) {
        emit('update:modelValue', value)
      },
    })
    const handlerClickIcon = (data: boolean) => {
      emit('handlerClickIcon', data)
    }
    const moveToTags = () => {
      const index = tags.findIndex((res: any) => res.name === route.meta.title)
      moveToView(index)
    }
    useResizeObserver(
      scrollbarDom,
      useDebounceFn(() => {
        moveToTags()
      }, 200)
    )
    const handleScroll = (offset: number): void => {
      const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0
      const tabDomWidth = tabDom.value ? tabDom.value.offsetWidth : 0
      if (offset > 0) {
        translateX.value = Math.min(0, translateX.value + offset)
      } else {
        if (scrollbarDomWidth < tabDomWidth) {
          if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
            translateX.value = Math.max(translateX.value + offset, scrollbarDomWidth - tabDomWidth - 30)
          }
        } else {
          translateX.value = 0
        }
      }
    }
    const tabNavPadding = 12
    // 跳转到对应的tag上去
    const moveToView = (index: number): void => {
      if (!instance.refs['dynamic' + index]) {
        return
      }
      // TODO development and production is different
      let tabItemEl
      if (process.env.NODE_ENV === 'development') {
        tabItemEl = instance.refs['dynamic' + index][0]?.$el
      } else {
        tabItemEl = instance._.refs['dynamic' + index][0]?.$el
      }
      const tabItemElOffsetLeft = (tabItemEl as HTMLElement)?.offsetLeft
      const tabItemOffsetWidth = (tabItemEl as HTMLElement)?.offsetWidth

      // 标签页导航栏可视长度（不包含溢出部分）
      const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0
      // 已有标签页总长度（包含溢出部分）
      const tabDomWidth = tabDom.value ? tabDom.value?.offsetWidth : 0
      if (tabDomWidth < scrollbarDomWidth || tabItemElOffsetLeft === 0) {
        translateX.value = 0
      } else if (tabItemElOffsetLeft < -translateX.value) {
        // 标签在可视区域左侧
        translateX.value = -tabItemElOffsetLeft + tabNavPadding
      } else if (tabItemElOffsetLeft > -translateX.value && tabItemElOffsetLeft + tabItemOffsetWidth < -translateX.value + scrollbarDomWidth) {
        // 标签在可视区域
        translateX.value = Math.min(0, scrollbarDomWidth - tabItemOffsetWidth - tabItemElOffsetLeft - tabNavPadding)
      } else {
        // 标签在可视区域右侧
        translateX.value = -(tabItemElOffsetLeft - (scrollbarDomWidth - tabNavPadding - tabItemOffsetWidth))
      }
    }
    function getMenus() {
      state.menus = route.matched.filter((item: any) => item.path !== '/')
    }
    function handlerClickTag(tag: any): void {
      router.push(tag.path)
    }
    // init tags
    function initTags(tag: any) {
      store.commit(RootMutations.SET_TAGS, tag)
    }
    function handleCloseTags(name: any) {
      store.commit(RootMutations.REMOVE_TAGS, name)
      if (name === route.meta.title) {
        if (tags.length >= 1) {
          router.push(tags[tags.length - 1].path)
        }
      }
    }

    onMounted(() => {
      const initTag = {
        name: route.meta.title,
        path: route.path,
        type: '',
        color: getColor,
      }
      initTags(initTag)
    })
    watch(route, () => {
      getMenus()
      state.isActive = route.meta.title
      moveToTags()
    })
    onBeforeMount(() => {
      getMenus()
    })
    return {
      isShowBreadCrumb,
      isMobile,
      navRight,
      settingRef,
      visible,
      scrollbarDom,
      tabDom,
      tags,
      isCollapse,
      circleUrl,
      getColor,
      translateX,
      getTabStyle,
      elTagEffect,
      steps,
      ...toRefs(state),
      handlerClickIcon,
      getMenus,
      handlerClickTag,
      handleCloseTags,
      handleScroll,
      moveToView,
      moveToTags,
    }
  },
})
</script>
