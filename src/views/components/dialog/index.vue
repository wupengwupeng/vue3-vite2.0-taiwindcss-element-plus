<template>
  <div>
    <main-card>
      <el-button size="small" @click="openDialog"> {{ t('点开侧边栏') }} </el-button>
    </main-card>
    <custom-drawer v-if="visible" v-model:visible="visible">
      <template #title>
        <span>{{ t('设置修改') }}</span>
      </template>
    </custom-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from '@/locales/components/Dialog'

const { t } = useI18n({
  messages,
  missingWarn: false,
  fallbackWarn: false,
})
const visible = ref(false)
const openDialog = () => {
  visible.value = true
}
</script>
