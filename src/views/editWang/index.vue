<script setup lang="ts">
import WangEditor from 'wangeditor'
import { onMounted, onBeforeUnmount, ref, unref, nextTick, Ref } from "vue";

const html = ref<string>('')
const editor = ref<Ref<HTMLElement> | null>(null)
let instance: WangEditor;
onMounted(() => {
  instance = new WangEditor(unref(editor));
  Object.assign(instance.config, {
    onchange() {
      (<string | void>html.value) = instance.txt.html();
    }
  });
  instance.create();
})

onBeforeUnmount(() => {
  instance.destroy();
});
</script>

<template>
  <main-card>
    <div class="pt-12">
      <div ref="editor"></div>
      <div :innerHTML="html"></div>
    </div>
  </main-card>
</template>