import request from './request'
import { AxiosRequestConfig } from 'axios'

export type RecordApis<T extends string> = Record<T, AxiosRequestConfig>
export type ReturnTypeOfRequest = ReturnType<typeof request>

export interface HttpRequest {
  (data?: unknown): ReturnTypeOfRequest
}

export function createApiByConfig<T extends RecordApis<string>>(apis: T) {
  type HttpRequests = {
    [key in keyof T]: HttpRequest
  }
  const api: HttpRequests = {} as HttpRequests
  for (const key in apis) {
    if (Object.prototype.hasOwnProperty.call(apis, key)) {
      const config = apis[key]
      api[key] = (data) => {
        if (data) {
          if (config.method === 'POST' || config.method === 'PUT' || config.method === 'PATCH') {
            config.data = data
          } else {
            config.params = data
          }
        }
        return request(config)
      }
    }
  }
  return api
}
