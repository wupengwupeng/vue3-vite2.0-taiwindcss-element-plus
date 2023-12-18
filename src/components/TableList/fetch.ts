import { BASE_URL } from '@/utils/config'
import { RecordApis, createApiByConfig } from '@/utils/axios/handler'

type Apis = 'pageNation'

function apiRecord(urls: string) {
  const apis: RecordApis<Apis> = {
    pageNation: { url: urls, method: 'POST' },
  }
  return apis
}
function createApi(urls: string) {
  return createApiByConfig(apiRecord(urls))
}

export default createApi
