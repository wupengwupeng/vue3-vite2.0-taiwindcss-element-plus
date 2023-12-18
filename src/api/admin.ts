import { RecordApis, createApiByConfig } from '@/utils/axios/handler'
export type Apis = 'geticonLibraryManage' | 'getAuthAclTree' | 'getAuthAclInfo'

const apis: RecordApis<Apis> = {
  geticonLibraryManage: { url: '/basic/iconLibraryManage/list', method: 'POST' },
  getAuthAclTree: { url: '/user/authAcl/getAuthAclTree', method: 'POST' },
  getAuthAclInfo: { url: 'user/authAcl/getAuthAclInfo', method: 'POST' },
}

export default createApiByConfig(apis)
