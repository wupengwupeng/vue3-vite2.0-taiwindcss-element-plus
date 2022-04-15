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
            <el-breadcrumb-item v-for="(item, index) in menus" :key="index" :to="{ path: item.path }">{{
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
          <el-tag v-for="tag in tags" class="cursor-pointer" :key="tag.name" closable :type="tag.type"
            :color="tag.name === isActive ? getColor : '#fff'" @click="handlerClickTag(tag)"
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
import { defineComponent, ref, watch, computed, toRefs, reactive, onBeforeMount, unref, Ref, onMounted, CSSProperties } from 'vue';
import circleUrl from '@/assets/logo.png'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from '@/store/index';
import { RootMutations } from '@/store/type'
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

    function getMenus() {
      state.menus = route.matched
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
      router.push(tags[tags.length - 1].path)
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
      getMenus()
      state.isActive = route.meta.title
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
    }
  },
})
</script>

<style lang="scss" scoped>
</style>

