import { Directive, ref, DirectiveBinding, Ref, unref, App } from 'vue'
import { warnMsg } from '@/components/Dialog/DialogMessage'
import { debounce } from 'lodash'

export type Obj = {
  maxLength?: number
  reg?: RegExp
}
let obj: Ref<Obj> = ref({})
const inputValue = ref()
let reg: RegExp | any = /[^\d]/g

export function parseJson(jsonStr: string) {
  return JSON.parse(jsonStr, (k, v) => {
    try {
      // 将正则字符串转成正则对象
      if (eval(v) instanceof RegExp) {
        return eval(v)
      }
    } catch (e) {
      // nothing
    }

    return v
  })
}
/**
 * json对象转json字符串
 * @param { Object } json json对象
 */
export function stringifyJson(json: { [key: string]: any }) {
  return JSON.stringify(json, (k, v) => {
    // 将正则对象转换为正则字符串
    if (v instanceof RegExp) {
      return v.toString()
    }

    return v
  })
}
function tip() {
  if (reg.test(inputValue.value)) {
    warnMsg('请输入数字！')
  }
}

export const onlyNumber: Directive = {
  beforeMount(el: any, binding: DirectiveBinding, vnode: any) {
    const input = el.querySelector('input')
    if (binding.arg) {
      try {
        obj.value = parseJson(binding.arg)
        if (unref(obj).maxLength) {
          input.maxLength = unref(obj)?.maxLength
        }
        if (unref(obj).reg) {
          reg = unref(obj)?.reg
        }
      } catch (error) {}
    }
    if (binding.value) {
      reg = binding.value
    }
    input.oninput = function () {
      inputValue.value = this.value
      this.value = this.value.replace(reg, '')
      if (unref(obj).maxLength) {
        if (this.value.length === unref(obj).maxLength) {
          warnMsg(`最大输入${unref(obj).maxLength}个字符`)
        }
      }
      if (vnode.dirs[0].instance) {
        // 手动触发双向绑定
        vnode.dirs[0].instance.$emit('update:modelValue', this.value)
      } else {
        vnode.elm.dispatchEvent(new CustomEvent('input', this.value))
      }
    }
    input.addEventListener('input', debounce(tip, 500))
  },
  beforeUnmount(el: any, binding: any, vnode: any) {
    const input = el.children[0]
    input.removeEventListener('input', tip)
  },
}

export default {
  install(app: App) {
    app.directive('onlyNumber', onlyNumber)
  },
}
