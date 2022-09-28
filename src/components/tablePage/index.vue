<template>
  <div v-bind="$attrs" class="w-full h-full flex flex-col table-self-content-component">
    <section style="min-height: 56px" class="flex items-center w-full" v-if="slots.form">
      <slot name="form" :data="form">tableForm</slot>
    </section>
    <section class="flex-1 overflow-auto">
      <slot name="table" :data="data" />
    </section>
    <section class="w-full h-44 flex justify-end items-center">
      <ElPagination layout="prev,pager,next,jumper,sizes,total" background :page-sizes="pageSizes" v-model:pageSize="pageSize" v-model:currentPage="currentPage" :total="total" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch, onMounted, reactive } from 'vue'
// import { useElPagination } from '@/lib/vue-use'
import { ElPagination } from 'element-plus'
import { myMixin } from './props'
// import api from './fetch'
export default defineComponent({
  name: 'TablePage',
  components: {
    ElPagination,
  },
  mixins: [myMixin],
  setup(props, { emit, attrs, slots }) {
    // const pagination = useElPagination()
    const { list, parems, url, height }: any = toRefs(props)
    const state: any = reactive({
      data: {
        loading: false,
        list: [],
        form: {},
      },
    })
    async function fetch() {
      // state.data.loading = true
      // const [res]: any = await api(url.value).pageNation({
      //   ...parems.value,
      //   ...state.form,
      //   Page: pagination.currentPage,
      //   PageSize: pagination.pageSize,
      // })
      // if (res?.code === '1001') {
      //   state.data.loading = false
      //   state.data.list = res.data.Record
      //   pagination.total = res.data.Total
      //   emit('dataBack', res)
      // } else {
      //   setTimeout(() => {
      //     state.data.loading = false
      //   }, 3000)
      // }
      // return res
    }
    function refresh() {
      fetch()
    }

    watch(
      parems,
      () => {
        fetch()
      },
      { deep: true, immediate: true }
    )
    // watch([() => pagination.currentPage, () => pagination.pageSize], fetch)
    return {
      list,
      height,
      slots,
      ...toRefs(state),
      // ...toRefs(pagination),
      refresh,
    }
  },
})
</script>

<style lang="scss">
.table-self-content-component {
  .el-table th {
    background: white;
    height: v-bind(height);
  }

  .el-table th,
  .el-table td {
    padding: 0;
  }

  .el-table--border {
    border: none;
    border-top: 1px solid #e6e8ed;
  }

  .el-table--border::after {
    content: '';
    position: absolute;
    background: white;
    z-index: 1;
  }

  .el-table__row {
    height: v-bind(height);
  }
}
</style>
