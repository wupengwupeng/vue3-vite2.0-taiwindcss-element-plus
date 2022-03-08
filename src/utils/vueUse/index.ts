import { reactive, ref } from "vue";

export function useElPagination() {
  const pagination = reactive({
    pageSizes: [10, 20, 30, 50, 100, 150, 200, 300],
    pageSize: 10,
    currentPage: 1,
    total: 0
  })
  return pagination
}