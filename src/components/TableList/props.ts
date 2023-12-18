import { PropType } from 'vue'
import type { ElTableColumnType } from '@/components/CustomTable/index.type'
export const myMixin = {
  props: {
    params: {
      type: Object,
      default: () => {},
    },
    list: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: '',
    },
    isPageNation: {
      type: Boolean,
      default: true,
    },
    /** 返回数据处理 */
    dataHandler: {
      type: Function,
      default: data => data,
    },
    listKey: {
      type: String,
      default: 'list',
    },
    totalKey: {
      type: String,
      default: 'total',
    },
    currentPage: {
      type: String,
      default: 'pageIndex',
    },
    pageSize: {
      type: String,
      default: 'pageSize',
    },
  },
}
