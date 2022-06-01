import { BASE_URL, TIME_OUT, AUTHENTICATION } from '@/utils/config'
import Axios from 'axios';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})
axios.interceptors.request.use(config => {
  const token = '5207D6A2EB1B3145B49479C066D98C54';
  const lang = '';
  if (token) {
    config.headers[AUTHENTICATION] = token
    // 用于账号系统
    config.headers.Authorization = token;
  }
  if (lang) config.headers['Accept-Language'] = lang
  return config
})

export default axios