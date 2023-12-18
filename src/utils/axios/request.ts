import { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import axios from './index'
import * as redirect from '@/utils/config/redirect'
import { errorMessage } from '@/components/dialog/DialogMessage'
import api from '@/api'
import { getRefreshToken, setToken, setRefreshToken, clearAllUserDate } from '@/utils/storage/index'
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
function handlerApiResponseError(res: ApiResponse, axiosConfig?: AxiosResponse<ApiResponse>) {
  const code = res.code
  switch (code) {
    case 1002: // // TOKEN失效，刷新TOKEN 重新发送请求
      api.login.refreshToken({ refreshToken: getRefreshToken() }).then(data => {
        const [newDate] = data
        if (newDate?.code == 1000) {
          setToken(newDate.data.authToken)
          setRefreshToken(newDate.data.refreshToken)
          /*这边不需要baseURL是因为会重新请求url
           *url中已经包含baseURL的部分了
           *如果不修改成空字符串，会变成'api/api/xxxx'的情况*/
          axiosConfig.config.headers.JWTToken = newDate.data.authToken
          axiosConfig.config.baseURL = ''
          //重新请求
          return axios(axiosConfig.config)
            .then(responsedata => {
              return responsedata
            })
            .catch(response => {
              return response
            })
        }
      })
      break
    case 1001: // 超时退出
    case 1008:
      errorMessage(`${res.message}` || '超时退出')
      redirect.login().then(() => {
        clearAllUserDate()
      })
      break
    case 1009: // 异地登录
      errorMessage(`异地登录`)
      redirect.login().then(() => {
        clearAllUserDate()
      })
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
    if (code === 1000) {
      return [data, null]
    } else {
      handlerApiResponseError(data, res)
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
