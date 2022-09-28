<script lang="ts">
import { defineComponent, h } from 'vue'
import AppSvgIcon from '@/components/AppSvgIcon/index.vue'

export default defineComponent({
  setup(_, { slots }) {
    return () => {
      return h('div', { class: 'main-app' }, [
        h(AppSvgIcon, { iconName: 'more' }),
        h('div', { class: 'child-app' }, h('div', { class: 'child-app-content' }, { default: () => slots.default() })),
      ])
    }
  },
})
</script>

<style lang="scss" scoped>
.main-app {
  width: 100px;
  height: 30px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-right: 1px solid var(--el-color-primary);
  position: relative;

  .child-app {
    width: 100px;
    display: none;
    .child-app-content {
      display: flex;
      flex-direction: column;
      min-height: 100px;
      overflow: hidden;
      align-items: flex-end;
    }
  }
  &:hover {
    cursor: pointer;

    .child-app {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      top: 30px;
      z-index: 999;
    }
  }
}
</style>
