<!--
 * @Author: mygit 2239414191@qq.com
 * @Date: 2022-09-28 17:08:58
 * @LastEditors: mygit 2239414191@qq.com
 * @LastEditTime: 2022-10-12 10:12:00
 * @FilePath: /arbitration-web/src/components/navigation/inquiryTitle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 用于查询条件及查询结果的公共样式 -->
  <div class="inquiryTitle">
    <div class="flex">
      <div class="main_title">
        <span>{{ title }}</span>
      </div>
      <app-svg-icon class="w-45 h-30 -translate-x-1 -translate-y-1 header-tab-right bg-cover" iconName="header-tab-right"></app-svg-icon>
    </div>
    <div class="sub_title" v-if="subhead">
      <span>{{ subhead }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: '查询条件',
    },
    subhead: {
      type: String,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="scss">
.inquiryTitle {
  width: 100%;
  display: flex;
  height: 29px;
  justify-content: space-between;
  border-bottom: 2px solid var(--el-color-primary);
  .header-tab-right {
    color: var(--el-color-primary);
    vertical-align: bottom;
  }
}
.sub_title {
  color: #333;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  margin-top: 5px;
}
.main_title {
  display: flex;
  border-top-left-radius: 8px;
  background: var(--el-color-primary);
  margin-bottom: -2px;
  span {
    min-width: 170px;
    padding: 8px 30px 7px 0;
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    color: #ffffff;
  }
  &::before {
    display: inline-block;
    position: relative;
    content: '';
    top: 8px;
    width: 3px;
    height: 16px;
    border-radius: 2px;
    margin-left: 18px;
    margin-right: 6px;
    line-height: 16px;
    background: #fff;
  }
}
</style>
