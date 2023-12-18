<template>
  <div class="flex item-center justify-center" :class="fileList.length ? 'upload-content' : ''">
    <el-upload v-model:file-list="fileList" v-bind="$attrs" :on-success="handlerSuccess" :on-preview="handlerOnPreview">
      <svg-icon type="mdi" :path="$midIcon.mdiUpload" :size="30" />
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <el-image :src="dialogImageUrl" fit="fill" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, computed, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:modelValue'])

const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const fileList: Ref<any> = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})

function handlerSuccess(response, uploadFiles) {
  fileList.value = [
    {
      name: '张三',
      url: `https://ggfw.rlsbj.cq.gov.cn/cqldzc/test/basic/file/previewImgSource/${response.data.fileId}`,
    },
  ]
}
function handlerOnPreview(uploadFile) {
  dialogVisible.value = true
  dialogImageUrl.value = uploadFile.url
  console.log(uploadFile, 'uploadFile')
}
</script>

<style lang="scss" scoped>
// ::v-deep(.el-upload) {
//   border: 1px dashed var(--el-border-color);
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
//   transition: var(--el-transition-duration-fast);
// }
.upload-content {
  ::v-deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
