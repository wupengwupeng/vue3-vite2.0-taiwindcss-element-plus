import elementPlus from 'element-plus'

import { App } from 'vue'
const creatElementPlus = (app: App, options: any) => {
  app.use(elementPlus)
}
export default creatElementPlus