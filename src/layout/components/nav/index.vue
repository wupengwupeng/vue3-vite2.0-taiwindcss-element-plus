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

    <div class="h-40 flex items-center bg-white shadow px-12 gap-12 w-full border-t overflow-hidden">
      <el-tag v-for="tag in tags" class=" cursor-pointer" :key="tag.name" closable :type="tag.type"
        :color="tag.name === isActive ? getColor : '#fff'" @click="handlerClickTag(tag)"
        @close="handleCloseTags(tag.name)">
        {{ tag.name }}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, toRefs, reactive, onBeforeMount, unref, Ref, onMounted } from 'vue';
import circleUrl from '@/assets/logo.png'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from '@/store/index';
import { RootMutations } from '@/store/type'
import path from 'path';
export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const store = useStore();
    const tags: any = store.state.tags;
    const route: any = useRoute()
    const router: any = useRouter()
    const getColor: string = document.documentElement.style.getPropertyValue('--el-tag-bg-color') as string
    const state = reactive({
      menus: [] as Array<RouteLocationMatched>,
      isActive: route.meta.title
    })
    const isCollapse = computed({
      get() {
        return modelValue.value
      },
      set(value: boolean) {
        emit('update:modelValue', value)
      },
    })

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
      tags,
      isCollapse,
      circleUrl,
      getColor,
      ...toRefs(state),
      getMenus,
      handlerClickTag,
      handleCloseTags
    }
  },
})
</script>

<style lang="scss" scoped>
</style>

