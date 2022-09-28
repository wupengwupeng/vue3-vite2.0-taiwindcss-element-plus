import { RecordApis, createApiByConfig, HttpRequest } from '@/utils/axios/handler'
import { Method } from 'axios'
type Apis = 'fetch'
type HttpRequests = {
  [key in Apis]: HttpRequest
}
function apiRecord(urls: string, method: Method): RecordApis<Apis> {
  const apis: RecordApis<Apis> = {
    fetch: { url: urls, method: method },
  }
  return apis
}
function createApi(urls: string, method: Method): HttpRequests {
  return createApiByConfig(apiRecord(urls, method))
}

export default createApi
