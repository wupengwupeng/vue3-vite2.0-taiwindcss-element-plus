import { RecordApis, createApiByConfig } from '@/utils/axios/handler'
const baseURL = ''

export type Apis =
  | 'getDevices'
  | 'getDataUpdate'
  | 'createTask'
  | 'getSelectDate'
  | 'getCodeDate'
  | 'getToken'
  | 'changeState'
  | 'deleteTask'
  | 'updateTask'
  | 'getExportLogTasks'
  | 'getTagListAll'
  | 'createTags'


const apis: RecordApis<Apis> = {

  getDevices: { baseURL, url: 'v2/task/Devices', method: 'GET' },
  getDataUpdate: { baseURL, url: 'v2/task', method: 'GET' },
  createTask: { baseURL, url: 'v2/task', method: 'POST' },
  updateTask: { baseURL, url: 'v2/task', method: 'PUT' },
  getTagListAll: { baseURL, url: 'v1/Label/List', method: 'GET' },
  createTags: { baseURL, url: 'v1/Label', method: 'POST' },

  getSelectDate: { baseURL, url: 'v1/Task/Configs', method: 'GET' },
  getCodeDate: { baseURL, url: 'v1/ExportConfig', method: 'GET' },
  getToken: { baseURL, url: 'v1/Task/TriggerToken', method: 'GET' },
  changeState: { baseURL, url: 'v1/Task/State', method: 'PATCH' },
  deleteTask: { baseURL, url: 'v1/Task', method: 'DELETE' },
  getExportLogTasks: { baseURL, url: 'v1/ExportLog/Tasks', method: 'GET' }

}

export default createApiByConfig(apis)