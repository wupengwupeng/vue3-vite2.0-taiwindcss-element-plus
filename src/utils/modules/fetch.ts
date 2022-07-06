import { BASE_URL } from '@/utils/config/index'
import { RecordApis, createApiByConfig } from "@/utils/axios/handler";
import { Apis as CurdApis } from './curd'
const baseURL = BASE_URL

type Apis = 'getDateApi' | 'createApi' | 'updateApi' | 'deleteApi'

function apiRecord(urls: CurdApis) {
  const apis: RecordApis<Apis> = {
    getDateApi: { baseURL, url: urls.getDateApi, method: 'GET' },
    createApi: { baseURL, url: urls.createApi, method: 'POST' },
    updateApi: { baseURL, url: urls.updateApi, method: 'PUT' },
    deleteApi: { baseURL, url: urls.deleteApi, method: 'DELETE' }
  }
  return apis
}
function createApi(urls: CurdApis) {
  return createApiByConfig(apiRecord(urls))
}

export default createApi;



