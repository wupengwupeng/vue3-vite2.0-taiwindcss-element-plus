<template>
  <div class="w-full shadow-inner flex flex-col">
    <div class="flex h-60 justify-between">
      <div class="flex-1 flex items-center px-12 h-full">
        <el-radio-group size="small" v-model="isCollapse">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
        <div class="ml-12">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="(item, index) in menus" :key="index" :to="{ path: item.path }"
              @click="handlerClickBread(item)">{{
                  item.meta.title
                    ? item.meta.title : '主页'
              }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="w-200 flex items-center justify-between px-12">
        <div class="flex items-center">
          <ChangeTheme />
          <span>切换主题</span>
        </div>
        <el-avatar :size="50" :src="circleUrl" />
      </div>
    </div>

    <div class="h-40 flex items-center bg-white shadow px-12  w-full border-t">
      <el-button size="small" @click="handleScroll(180)">
        <app-svg-icon iconName="arrow-left"></app-svg-icon>
      </el-button>
      <div class="flex-1 overflow-hidden px-16 flex flex-nowrap " ref="scrollbarDom">
        <div class="flex flex-nowrap gap-12  overflow-visible" ref="tabDom" :style="getTabStyle">
          <el-tag v-for="(tag, index) in tags" class="cursor-pointer aaa" :ref="'dynamic' + index" :key="tag.name"
            closable :type="tag.type" :color="tag.name === isActive ? getColor : '#fff'" @click="handlerClickTag(tag)"
            @close="handleCloseTags(tag.name)">
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
      <el-button size="small" @click="handleScroll(-180)">
        <app-svg-icon class="rotate-180" iconName="arrow-left"></app-svg-icon>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, toRefs, reactive, onBeforeMount, unref, Ref, onMounted, CSSProperties, getCurrentInstance } from 'vue';
import circleUrl from '@/assets/logo.png'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from '@/store/index';
import { RootMutations } from '@/store/type';
import { useResizeObserver, useDebounceFn } from "@vueuse/core";
import utils from '@/utils/index'
export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const getColor: string = document.documentElement.style.getPropertyValue('--el-tag-bg-color') as string
    const { modelValue } = toRefs(props)
    const scrollbarDom = ref();
    const instance: any = getCurrentInstance();
    const tabDom = ref();
    const store = useStore();
    const route: any = useRoute()
    const router: any = useRouter()
    const tags: any = store.state.tags;
    const translateX = ref<number>(0)
    const state = reactive({
      menus: [] as Array<RouteLocationMatched>,
      isActive: route.meta.title
    })
    const getTabStyle = computed((): CSSProperties => {
      return {
        transform: `translateX(${translateX.value}px)`
      };
    })

    const isCollapse = computed({
      get() {
        return modelValue.value
      },
      set(value: boolean) {
        emit('update:modelValue', value)
      },
    })
    const moveToTags = () => {
      const index = tags.findIndex((res: any) => res.name === route.meta.title)
      moveToView(index)
    }
    useResizeObserver(scrollbarDom,
      useDebounceFn(() => {
        moveToTags()
      }, 200))
    const handleScroll = (offset: number): void => {
      const scrollbarDomWidth = scrollbarDom.value
        ? scrollbarDom.value?.offsetWidth
        : 0;
      const tabDomWidth = tabDom.value ? tabDom.value.offsetWidth : 0;
      if (offset > 0) {
        translateX.value = Math.min(0, translateX.value + offset);
      } else {
        if (scrollbarDomWidth < tabDomWidth) {
          if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
            translateX.value = Math.max(
              translateX.value + offset,
              scrollbarDomWidth - tabDomWidth - 30
            );
          }
        } else {
          translateX.value = 0;
        }

      }
    };
    const tabNavPadding = 12
    // 跳转到对应的tag上去
    const moveToView = (index: number): void => {
      if (!instance.refs["dynamic" + index]) {
        return;
      }
      const tabItemEl = instance.refs["dynamic" + index][0]?.$el;
      const tabItemElOffsetLeft = (tabItemEl as HTMLElement)?.offsetLeft;
      const tabItemOffsetWidth = (tabItemEl as HTMLElement)?.offsetWidth;

      // 标签页导航栏可视长度（不包含溢出部分）
      const scrollbarDomWidth = scrollbarDom.value
        ? scrollbarDom.value?.offsetWidth
        : 0;
      // 已有标签页总长度（包含溢出部分）
      const tabDomWidth = tabDom.value ? tabDom.value?.offsetWidth : 0;
      if (tabDomWidth < scrollbarDomWidth || tabItemElOffsetLeft === 0) {
        translateX.value = 0;
      } else if (tabItemElOffsetLeft < -translateX.value) {
        // 标签在可视区域左侧
        translateX.value = -tabItemElOffsetLeft + tabNavPadding;
      } else if (
        tabItemElOffsetLeft > -translateX.value &&
        tabItemElOffsetLeft + tabItemOffsetWidth <
        -translateX.value + scrollbarDomWidth
      ) {
        // 标签在可视区域
        translateX.value = Math.min(
          0,
          scrollbarDomWidth -
          tabItemOffsetWidth -
          tabItemElOffsetLeft -
          tabNavPadding
        );
      } else {
        // 标签在可视区域右侧
        translateX.value = -(tabItemElOffsetLeft - (scrollbarDomWidth - tabNavPadding - tabItemOffsetWidth));

      }
    };

    // 点击面包屑的时候
    function handlerClickBread(item: any) {
      if (!utils.isEmportyObject(item.meta)) return
      const tags: any = {
        name: '主页',
        path: item.path,
        type: '',
        color: '#fff'
      }
      store.commit(RootMutations.SET_TAGS, tags)
    }
    function getMenus() {
      state.menus = route.matched.filter((item: any) => item.meta && item.meta.title !== '主页');
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
        color: getColor
      }
      initTags(initTag)
    })
    watch(route, () => {
      getMenus();
      state.isActive = route.meta.title;
      moveToTags();
    })
    onBeforeMount(() => {
      getMenus()
    })
    return {
      scrollbarDom,
      tabDom,
      tags,
      isCollapse,
      circleUrl,
      getColor,
      translateX,
      getTabStyle,
      ...toRefs(state),
      getMenus,
      handlerClickTag,
      handleCloseTags,
      handleScroll,
      moveToView,
      moveToTags,
      handlerClickBread,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.aaa:hover) {
  background: var(--el-tag-bg-color);
}
</style>

