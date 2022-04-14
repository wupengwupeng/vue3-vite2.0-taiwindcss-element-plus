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
    <div class="h-40 flex items-center bg-white shadow px-12 gap-12 w-full border-t">
      <el-tag v-for="tag in tags" class=" cursor-pointer" :key="tag.name" closable :type="tag.type" :color="tag.color"
        @click="handlerClickTag(tag)">
        {{ tag.name }}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, toRefs, reactive, onBeforeMount, unref, Ref, onMounted } from 'vue';
import circleUrl from '@/assets/logo.png'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
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
    const state = reactive({
      menus: [] as Array<RouteLocationMatched>,
    })
    const tags: Ref<Array<{ name: string; type: string; color: string }>> = ref<Array<{ name: string; type: string; color: string }>>([
      { name: 'Tag 1', type: '', color: '#fff' },
      { name: 'Tag 2', type: 'info', color: '#fff' },
      { name: 'Tag 3', type: 'info', color: '#fff' },
      { name: 'Tag 4', type: 'info', color: '#fff' },
      { name: 'Tag 5', type: 'info', color: '#fff' },
    ])
    const route = useRoute()
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
    function handlerClickTag(tag: { name: string; type: string; color: string }): void {
      const getColor = document.documentElement.style.getPropertyValue('--el-tag-bg-color')
      tags.value.forEach((res: any) => {
        if (res.name === tag.name) {
          res.type = ''
          res.color = getColor
        } else {
          res.type = 'info'
          res.color = '#fff'
        }
      })
    }
    onMounted(() => {
      handlerClickTag({ ...tags.value[0] })
    })
    watch(route, () => {
      getMenus()
    })
    onBeforeMount(() => {
      getMenus()
    })
    return {
      tags,
      isCollapse,
      circleUrl,
      getMenus,
      handlerClickTag,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
</style>

