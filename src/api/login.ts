import { RecordApis, createApiByConfig } from '@/utils/axios/handler'
export type Apis = 'login' | 'getPublicKey' | 'refreshToken' | 'getQueryUserInfo' | 'getUserAllAcl'

const apis: RecordApis<Apis> = {
  login: { url: '/user/userSentry/login', method: 'POST' },
  getPublicKey: { url: '/user/user/getPublicKey', method: 'POST' },
  refreshToken: { url: '/user/user/refreshToken', method: 'POST' },
  getQueryUserInfo: { url: '/user/account/queryUserInfo', method: 'POST' },
  getUserAllAcl: { url: '/user/authUserAcl/getUserAllAcl', method: 'POST' },
}

export default createApiByConfig(apis)
