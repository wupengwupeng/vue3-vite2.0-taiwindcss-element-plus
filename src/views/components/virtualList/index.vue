<script setup lang="ts">
import VirtualList from 'vue3-virtual-scroll-list';
import Item from './Item.vue'
import VueUseVirtualList from './vueuseVirtualList.vue'
import { Random } from 'mockjs';
import genUniqueId from './utils/gen-unique-id'
import getSentences from './utils/sentences'
import { ref, computed, unref, Ref, getCurrentInstance, onMounted } from 'vue';

const getPageData = (count: number, currentLength: number) => {
  const DataItems = [];
  for (let i = 0; i < count; i++) {
    const index = currentLength + i;
    DataItems.push({
      index,
      name: Random.name(),
      id: genUniqueId(index),
      desc: getSentences(),
      checked: false
    });
  }
  return DataItems;
};

const pageSize = 20;
const items: any = ref(getPageData(pageSize, 0));
const isLoading = ref(false);
const initCheckAll = ref<boolean>(false)
const checkAll = computed({
  get() {
    return unref(initCheckAll)
  },
  set(val) {
    (initCheckAll as any).value = val
    console.log(val, "val")
    console.log(items, "items");
    isChangedBox()
  }
})
const { appContext: { app: { config: { globalProperties } } } }: any = getCurrentInstance()
// Checkbox had changed?
function isChangedBox() {
  for (let i = 0; i < items.value.length; i++) items.value[i] = { ...items.value[i], checked: checkAll.value }
}


// singleChanged
function changeSingleCheckBox(val: any) {
  console.log(val, "adsf")
}
const onScrollToTop = () => {
  console.log('at top');
};
const onScrollToBottom = () => {
  console.log('at bottom');
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    items.value = items.value.concat(getPageData(pageSize, items.value.length));
    isChangedBox()
  }, 50);
};
console.log(Item, "Item")

onMounted(() => {
  globalProperties.$myBus.on('changeSingleCheckBox', changeSingleCheckBox)
})
</script>

<template>
  <MainCard>
    <el-checkbox v-model="checkAll" label="全选" size="large" />
    <VirtualList class="list-infinite scroll-touch" :data-key="'id'" :data-sources="items" :data-component="Item"
      :estimate-size="70" :item-class="'list-item-infinite'" :footer-class="'loader-wrapper'" @totop="onScrollToTop"
      @tobottom="onScrollToBottom">
      <template #footer>
        <div class="loader"></div>
      </template>
    </VirtualList>

    <div class="w-full h-2"></div>
    <VueUseVirtualList />
  </MainCard>
</template>

<style lang="scss" scoped>
.list-infinite {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
  position: relative;

  .list-item-infinite {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
  }

  .loader-wrapper {
    padding: 1em;
  }

  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(to right,
        #9b4dca 10%,
        rgba(255, 255, 255, 0) 42%);
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }

  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>