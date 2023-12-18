<template>
  <div class="w-full h-full flex flex-col">
    <section class="flex-1 overflow-hidden">
      <CustomTable height="100%" v-bind="$attrs" :data="data.list" v-loading="data.loading">
        <template v-for="(item, key) in slots" :key="key + 'gsad'" #[key]="{ scope }">
          <slot :name="key" v-bind="{ ...scope }"></slot>
        </template>
      </CustomTable>
    </section>
    <section v-if="isPageNation" class="w-full h-44 flex justify-end items-center">
      <ElPagination
        layout="prev,pager,next,jumper,sizes,total"
        :small="true"
        background
        :page-sizes="pageSizes"
        v-model:pageSize="pageSize"
        v-model:currentPage="currentPage"
        :total="total"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch, onMounted, reactive, useAttrs } from 'vue'
import { useElPagination } from '@/utils/vueUse'
import { ElPagination } from 'element-plus'
import { myMixin } from './props'
import api from './fetch'
import CustomTable from '@/components/CustomTable/index.vue'
export default defineComponent({
  name: 'TablePage',
  components: {
    ElPagination,
    CustomTable,
  },
  mixins: [myMixin],
  setup(props, { emit, attrs, slots }) {
    const pagination = useElPagination()
    const { list, params, url, isPageNation, listKey, totalKey, currentPage, pageSize, dataHandler }: any = toRefs(props)
    const state: Record<'data', { loading: boolean; list: any[]; form: any }> = reactive({
      data: {
        loading: false,
        list: list.value,
        form: {},
      },
    })
    async function fetch() {
      state.data.loading = true
      const payLoad = {
        ...params.value,
        ...state.data.form,
        [currentPage]: isPageNation.value ? pagination.currentPage : undefined,
        [pageSize]: isPageNation.value ? pagination.pageSize : undefined,
      }
      const [res]: any = await api(url.value).pageNation(payLoad)
      if (res?.code === 1000) {
        console.log(res, '--------102')
        state.data.loading = false
        state.data.list = dataHandler.value(res.data[listKey.value])
        if (isPageNation.value) {
          pagination.total = res.data[totalKey.value]
        }

        emit('dataBack', res)
      } else {
        setTimeout(() => {
          state.data.loading = false
        }, 3000)
      }
      return res
    }
    function refresh() {
      fetch()
    }

    watch(
      params,
      () => {
        fetch()
      },
      { deep: true, immediate: true }
    )
    watch([() => pagination.currentPage, () => pagination.pageSize], fetch)
    return {
      list,
      slots,
      isPageNation,
      ...toRefs(state),
      ...toRefs(pagination),
      refresh,
    }
  },
})
</script>

<style lang="scss"></style>
