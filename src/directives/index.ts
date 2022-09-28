import { Directive, App } from 'vue'
import { elDraggableDialog } from './el-draggable-dialog'

import { showTips } from './showTick'

import { onlyNumber } from './onlyNumber'

import { outClick } from './outClick'

import { waves } from './waves'

import { clipboard } from './clipboard'

import { focus } from './autFocus'

import { resize } from './elResizeDetector'

import { draggable } from './draggableElement'

import { emoji } from './emoji'

import { lazyImg } from './lazyImg'

import { longPress } from './longPress'

import { numberInput } from './numberInput'
const directives: { [key: string]: Directive } = {
  elDraggableDialog,
  showTips,
  onlyNumber,
  outClick,
  waves,
  clipboard,
  focus,
  resize,
  draggable,
  emoji,
  lazyImg,
  longPress,
  numberInput,
}

export default {
  install(app: App) {
    Object.keys(directives).forEach(res => {
      app.directive(res, directives[res])
    })
  },
}
