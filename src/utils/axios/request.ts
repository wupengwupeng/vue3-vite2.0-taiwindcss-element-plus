import { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import axios from './index'
import * as redirect from '@/utils/config/redirect'
import { errorMessage } from '@/components/Dialog/DialogMessage'
export type ApiResponse = {
  code: any
  status?: number
  data: any
  message: string
  errors?: any[]
  Debug?: string
  TraceIdentifier?: string
}

// 拦截axios的一些常见错误
function handlerAxiosResponseError(res: AxiosResponse) {
  const status = res.status
  switch (status) {
    case 401:
      redirect.unauthorized()
      break
    case 404:
      redirect.pageNotFound()
      break
    case 500:
      redirect.serverError()
      break
    default:
      errorMessage(`${res.data.message || 'Exception not caught by server'}`)
  }
}
// 拦截接口code的一些常见错误
function handlerApiResponseError(res: ApiResponse) {
  const code = res.code
  switch (code) {
    case '1002':
      errorMessage(`${res.message || 'Exception not caught by server'}`)
      break
    case '1003':
      errorMessage(`${res.message || '服务器内部异常'}`)
      break
    case '1004':
      errorMessage(`${res.message || '未授权'}`)
      redirect.login()
      break
    case '1005':
      errorMessage(`${res.message || '未认证'}`)
      redirect.login()
      break
    default:
      errorMessage(`${res.message || 'Exception not caught by server'}`)
  }
}

async function to(promise: AxiosPromise<ApiResponse>): Promise<[ApiResponse, null] | [null, ApiResponse | AxiosError]> {
  try {
    const res = await promise
    const data = res.data
    const code: string | number = data.code
    // if (data.Debug) {
    //   console.debug(res.config.url, {
    //     Debug: data.Debug,
    //     TraceIdentifier: data.TraceIdentifier,
    //   })
    // }
    if (code === '1001') {
      return [data, null]
    } else {
      handlerApiResponseError(data)
      return [null, data]
    }
  } catch (error) {
    const err = error as AxiosError<ApiResponse>
    if (err.response) {
      const res = err.response
      if (res.status === 200) {
        handlerApiResponseError(res.data)
      } else if (res.status === 1) {
        handlerAxiosResponseError(res)
      } else {
        handlerAxiosResponseError(res)
      }
    } else {
      errorMessage(error)
    }
    return [null, err]
  }
}

export default (config: AxiosRequestConfig) => {
  return to(axios(config))
}
