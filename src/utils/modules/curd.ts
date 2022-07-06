// 增删改查的封装
import api from "./fetch"
export type Apis = {
  getDateApi: string
  createApi: string
  updateApi: string
  deleteApi: string
}
export type Obj = {
  [key: string]: any
}
export class curd {
  apis: Apis
  constructor(apis: Apis) {
    this.apis = apis
  }
  async getDate(parems: Obj) {
    const [res] = await api(this.apis).getDateApi(parems)
    return [res]
  }
  async create(parems: Obj) {
    const [res] = await api(this.apis).createApi(parems)
    return [res]
  }
  async update(parems: Obj) {
    const [res] = await api(this.apis).updateApi(parems)
    return [res]
  }
  async delete(parems: Obj) {
    const [res] = await api(this.apis).deleteApi(parems)
    return [res]
  }
  clear() {
  }

}