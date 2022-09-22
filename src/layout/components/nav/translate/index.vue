<template>
  <popover-custom v-model:visible="visible">
    <template #header>
      <div class="translate" @click="visible = true">
        <app-svg-icon icon-name="globalization"></app-svg-icon>
      </div>
    </template>
    <template #default>
      <div class="translate-content" :class="{ isActive: item === LONGBOW[lang] }" v-for="item in LANGARR" :key="item" @click="handlerChangeLang(item)">
        <span>{{ item }}</span> <app-svg-icon icon-name="right_arrow_o"></app-svg-icon>
      </div>
    </template>
  </popover-custom>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getLang, setLang } from '@/utils/storage'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'
const visible = ref(false)
const LANGARR = ['中文', '英文', '繁体']
const LONGBOW: { [key: string]: string } = {
  en: '英文',
  'zh-CN': '中文',
  'zh-TW': '繁体',
}

const store = useStore()
const lang = store.state.config.lang
const handlerChangeLang = (item: string) => {
  const obj = {
    中文: 'zh-CN',
    英文: 'en',
    繁体: 'zh-TW',
  }
  if (obj[item] === getLang()) return
  store.commit(RootMutations.SET_LANG, obj[item])
  setLang(obj[item])
  window.location.reload()
}
</script>

<style lang="scss" scoped>
@mixin flex-box($display: flex, $alignItems: center, $justifyContent: center) {
  display: $display;
  align-items: $alignItems;
  justify-content: $justifyContent;
}

.translate {
  min-width: 40px;
  height: 58px;
  @include flex-box(flex, center, space-around);
  &:hover {
    background-color: #f6f6f6;
    color: #000;
    cursor: pointer;
  }
}
.translate-content {
  width: 100%;
  height: 30px;
  border-radius: 6px;
  margin-bottom: 2px;
  @include flex-box;
  &:hover {
    cursor: pointer;
    background-color: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
    border: 1px dashed var(--el-color-primary);
  }
}
.isActive {
  background-color: var(--el-color-primary-light-8);
  color: var(--el-color-primary);
  border: 1px dashed var(--el-color-primary);
  // pointer-events: none;
  &:hover {
    cursor: not-allowed !important;
  }
}
</style>
