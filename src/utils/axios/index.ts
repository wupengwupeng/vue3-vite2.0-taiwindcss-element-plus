import { BASE_URL, TIME_OUT, AUTHENTICATION } from '@/utils/config'
import Axios from 'axios'
import { store } from '@/store'

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})
axios.interceptors.request.use(config => {
  const token = store.state.token || ''
  console.log(token, 'token')
  const lang = ''
  if (token) {
    config.headers[AUTHENTICATION] = token
    config.headers.deviceId = 'null'
    config.headers.cType = 'PC'
    config.headers.appName = 'normandy'
    config.headers.apikey = 'normandyUser'
    config.headers['X-Auth-Token'] = 'null'
  }
  if (lang) config.headers['Accept-Language'] = lang
  return config
})

export default axios
