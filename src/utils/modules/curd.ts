// 增删改查的封装
import api from "./fetch"
export type Apis = {
  getDateApi?: string
  createApi?: string
  updateApi?: string
  deleteApi?: string
}
export type Obj = {
  [key: string]: any
}
export class curd {
  apis: Apis
  constructor(apis: Apis) {
    this.apis = apis
  }
  async getDate(params: Obj) {
    return await api(this.apis).getDateApi(params)
  }
  async create(params: Obj) {
    return await api(this.apis).createApi(params)
  }
  async update(params: Obj) {
    return await api(this.apis).updateApi(params)
  }
  async delete(params: Obj) {
    return await api(this.apis).deleteApi(params)
  }
  clear() { }

}