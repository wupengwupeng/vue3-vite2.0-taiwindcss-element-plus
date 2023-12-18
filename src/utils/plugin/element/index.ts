import elementPlus from 'element-plus'
import { ElForm, ElFormItem, ElInput, ElButton, ElRate, ElInputNumber, ElSlider } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import CustomSelect from '@/components/customSelect/index.vue'
import SvgIcon from 'vue3-icon'
// import 'element-plus/dist/index.css'
import { App } from 'vue'
const components = [ElForm, ElFormItem, ElInput, ElButton, ElRate, ElInputNumber, ElSlider]
const others = [Search, CustomSelect]
export const createElementPlus = (app: App, { isAll = false }: { isAll?: boolean }) => {
  if (isAll) {
    app.use(elementPlus)
    const install = {
      install(app: App) {
        others.forEach(res => {
          app.component(res.name, res)
        })
        app.component('svg-icon', SvgIcon)
      },
    }
    app.use(install)
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
