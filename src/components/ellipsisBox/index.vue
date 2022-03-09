
<template>
  <div class="flex items-center" :style="{ width: width, height: height }">
    <div class="flex-1 flex items-center w-full h-full overflow-hidden whitespace-nowrap" style="text-overflow: ellipsis">
      <el-tooltip :content="content">
        <span :style="{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }" :class="contentClass">{{ content }}</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'ElipsisBox',
  props: {
    width: {
      type: String,
      default: '100px',
      require: true,
    },
    height: {
      type: String,
      default: '30px',
    },
    content: {
      type: String,
      default: '',
    },
    contentClass: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { width, content, height, contentClass } = toRefs(props)
    return { width, content, height, contentClass }
  },
})
</script>

