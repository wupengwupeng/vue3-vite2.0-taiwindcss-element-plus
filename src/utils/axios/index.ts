import { BASE_URL, TIME_OUT, AUTHENTICATION } from '@/utils/config'
import Axios from 'axios';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})
axios.interceptors.request.use(config => {
  const token = '';
  const lang = '';
  if (token) {
    config.headers[AUTHENTICATION] = token
  }
  if (lang) config.headers['Accept-Language'] = lang
  return config
})

export default axios