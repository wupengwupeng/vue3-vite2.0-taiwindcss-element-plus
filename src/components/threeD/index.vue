<script setup lang="ts">

</script>

<template>
  <div class="absolute bottom-30 left-0 ">
    <div class="maxDiv opacity-59 flex items-center justify-center">
      <div class="minDiv">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <span class="center">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.maxDiv {
  perspective: 1200px;
  width: 200px;
  height: 200px;
}

.minDiv {
  width: 50px;
  height: 50px;
  transform-style: preserve-3d;
  animation: go 8s linear infinite;
}

.minDiv>div {
  background: var(--el-color-paimary);
  width: 50px;
  height: 50px;
  box-shadow: 0 0 15px var(--el-color-paimary);
  position: absolute;
  transition: 1s;
  animation-play-state: running;
}

.minDiv:hover {
  animation-play-state: paused;
}

.minDiv:hover>div {
  animation: goColor 1s linear infinite;
}

.minDiv>div:nth-child(1) {
  transform: translateZ(-75px);
}

.minDiv>div:nth-child(2) {
  transform: rotateY(90deg) translateZ(75px);
}

.minDiv>div:nth-child(3) {
  transform: rotateY(90deg) translateZ(-75px);
}

.minDiv>div:nth-child(4) {
  transform: rotateX(90deg) translateZ(-75px);
}

.minDiv>div:nth-child(5) {
  transform: rotateX(90deg) translateZ(75px);
}

.minDiv>div:nth-child(6) {
  transform: translateZ(75px);
}

.minDiv:hover>div:nth-child(1) {
  transform: translateZ(-50px);
}

.minDiv:hover>div:nth-child(3) {
  transform: rotateY(90deg) translateZ(-50px);
}

.minDiv:hover>div:nth-child(4) {
  transform: rotateX(90deg) translateZ(-50px);
}

.minDiv:hover>div:nth-child(2) {
  transform: rotateY(90deg) translateZ(50px);
}

.minDiv:hover>div:nth-child(5) {
  transform: rotateX(90deg) translateZ(50px);
}

.minDiv:hover>div:nth-child(6) {
  transform: translateZ(50px);
}

.minDiv>span {
  display: block;
  height: 50px;
  width: 50px;
  transform-style: preserve-3d;
}

.minDiv:hover>span {
  animation: go 4s linear infinite;
}

.minDiv>span>div {
  height: 50px;
  width: 50px;
  position: absolute;
  background: var(--el-color-primary-light-9);
  box-shadow: 0 0 10px var(--el-color-primary-light-9);
}

.minDiv>span>div:nth-child(1) {
  transform: translateZ(-25px);
}

.minDiv>span>div:nth-child(2) {
  transform: rotateY(90deg) translateZ(25px);
}

.minDiv>span>div:nth-child(3) {
  transform: rotateY(90deg) translateZ(-25px);
}

.minDiv>span>div:nth-child(4) {
  transform: rotateX(90deg) translateZ(-25px);
}

.minDiv>span>div:nth-child(5) {
  transform: rotateX(90deg) translateZ(25px);
}

.minDiv>span>div:nth-child(6) {
  transform: translateZ(25px);
}

@keyframes goColor {
  0% {
    background: var(--el-color-paimary);
    box-shadow: 0 0 15px var(--el-color-paimary);
    opacity: 0.2;
  }

  50% {
    background: var(--el-color-paimary);
    box-shadow: 0 0 15px var(--el-color-paimary);
    opacity: 0.3;
  }

  100% {
    background: var(--el-color-paimary);
    box-shadow: 0 0 15px var(--el-color-paimary);
    opacity: 0.2;
  }
}

@keyframes go {
  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}
</style>