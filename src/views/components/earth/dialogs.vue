<template>
  <div
    v-show="infoShow"
    class="content_info"
    :style="{
      left: props.positionXy.xAxis + 'px',
      top: props.positionXy.yAxis + 'px',
    }"
  >
    <div @click="closeBtn" class="close_btn">关闭</div>
    <div class="title">
      名称: <span class="title_content">{{ props.positionXy.monitoItems || '涨啊啥你' }}</span>
    </div>
    <div class="title">
      地址:<span class="title_content">{{ '收到你发士大夫' }}</span>
    </div>

    <div class="info_triangle"></div>
  </div>
</template>

<script setup lang="ts" name="DialogTip">
import { ref } from 'vue'
let infoShow = ref(false)
const props = defineProps({
  positionXy: {
    type: Object,
    default: {},
  },
})
function closeBtn() {
  infoShow.value = false
}

function openInfo() {
  infoShow.value = true
}
defineExpose({
  openInfo,
  closeBtn,
})
</script>

<style lang="scss" scoped>
.content_info {
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 15px;
  position: absolute;
  background-color: #fff;
  // height: 20px;
  width: 200px;
  z-index: 999999;
  font-size: 12px;

  .close_btn {
    position: absolute;
    top: 2px;
    right: 2px;
    cursor: pointer;
    color: #0e0e0e;
  }

  .title {
    font-size: 12px;
    font-weight: 700;
    // transform: scale(.8);
    color: #0e0e0e;
    .title_content {
      font-size: 12;
      // transform: scale(.8);
      font-weight: normal;
      color: #0e0e0e;
    }
  }
}

.info_triangle {
  width: 0;
  height: 0;
  border: 15px solid;
  border-color: #fff transparent transparent transparent;
  position: absolute;
  left: 50%;
  bottom: -29px;
  transform: translateX(-50%);
}
</style>
