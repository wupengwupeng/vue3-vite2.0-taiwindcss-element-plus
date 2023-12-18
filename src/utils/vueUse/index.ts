import { reactive, ref, computed, PropType, ExtractPropTypes, unref } from 'vue'
import api from '@/api'
import { unique, dealTreeDate } from '@/utils/modules/common'
import { getTrees } from '@/utils'
import { store } from '@/store'
// use分页
export function useElPagination() {
  const pagination = reactive({
    pageSizes: [10, 20, 30, 50, 100, 150, 200, 300],
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })
  return pagination
}
// useProps
export function useDefaultProps<T extends Record<keyof T, any>>(arg?: T) {
  return {
    modelValue: {
      type: [Object, String, Number, Array, Boolean, undefined, null, Function] as PropType<any>,
    },
    ...arg,
  }
}
// useEmits
export function useDefaultEmits() {
  return ['update:modelValue']
}
// useModelValue
export function useModelVal(props: any, emits: any) {
  const val = computed({
    get() {
      return props.modelValue
    },
    set(v) {
      emits('update:modelValue', v)
    },
  })
  return val
}

export async function useGetMenuList(newLoginFo?: any, roleCode = '') {
  try {
    const [data] = await api.login.getUserAllAcl({ roleCode: roleCode })
    console.log(store, 'store')
    if (data?.code == 1000) {
      newLoginFo.userAuthRoles = data.data.userAuthRoles
      const menuList = unique(data.data.authRoleAcls, 'id')
      const newMenuList = getTrees(menuList, '0', 'aclParentId', 'id')
      const lastMenu: any[] = newMenuList.filter(res => res.aclType === 'CATEGORY' && res.aclName !== 'specialAuthorizationRoute')
      dealTreeDate(lastMenu)
      return lastMenu
    }
  } catch (error) {
    console.log(error, 'error')
  }
}
