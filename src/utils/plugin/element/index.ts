import elementPlus from 'element-plus'
import { ElForm, ElFormItem, ElInput, ElButton, ElRate, ElInputNumber, ElSlider } from 'element-plus'
// import 'element-plus/dist/index.css'
import { App } from 'vue'
const components = [ElForm, ElFormItem, ElInput, ElButton, ElRate, ElInputNumber, ElSlider]
export const createElementPlus = (app: App, { isAll = false }: { isAll?: boolean }) => {
  if (isAll) {
    app.use(elementPlus)
  } else {
    const install = {
      install(app: App) {
        components.forEach(res => {
          app.component(res.name, res)
        })
      },
    }
    app.use(install)
  }
}
