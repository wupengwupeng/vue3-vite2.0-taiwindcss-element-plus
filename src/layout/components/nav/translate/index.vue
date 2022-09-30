<template>
  <el-dropdown trigger="click" placement="bottom">
    <el-tooltip :show-after="500" :enterable="false" :content="'语言'">
      <div class="nav-right-button">
        <app-svg-icon icon-name="globalization"></app-svg-icon>
      </div>
    </el-tooltip>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(language, index) in LANGUAGES" :key="index" :disabled="lang === language.lang" @click="changeLanguage(language)">{{
          language.name
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { setLang } from '@/utils/storage'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'
// 所有语言
const LANGUAGES: App.Language[] = [
  {
    lang: 'zh-CN',
    name: '简体中文',
  },
  {
    lang: 'zh-TW',
    name: '繁體中文',
  },
  {
    lang: 'en',
    name: 'English',
  },
]

const store = useStore()
const lang = store.state.config.lang
const changeLanguage = item => {
  store.commit(RootMutations.SET_LANG, item.lang)
  setLang(item.lang)
  if (item.lang !== lang) window.location.reload()
}
</script>

<style lang="scss" scoped>
@mixin flex-box($display: flex, $alignItems: center, $justifyContent: center) {
  display: $display;
  align-items: $alignItems;
  justify-content: $justifyContent;
}
</style>
