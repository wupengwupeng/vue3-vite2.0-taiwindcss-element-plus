import Driver from 'driver.js'
const node = document.documentElement
const getPrimary = node.style.getPropertyValue('--el-color-primary')
export const steps: Driver.Step[] = [
  {
    element: '#setting', // Query selector string or Node to be highlighted
    popover: {
      className: 'driver-all-style',
      title: '设置',
      description: `<span class="description">本站暗黑风格和主题切换以及风格切换</span>`,
      position: 'left',
    },
  },
  {
    element: '#translate',
    popover: {
      className: 'driver-all-style',
      title: '国际化',
      description: '<span class="description">这是本站的国际化点击切换语言风格</span>',
      position: 'left',
    },
  },
  {
    element: '#screenFull',
    popover: {
      className: 'driver-all-style',
      title: '全屏',
      description: '<span class="description">这是本站的全屏设置点</span>',
      position: 'left',
    },
  },
  {
    element: '#searchVue',
    popover: {
      className: 'driver-all-style',
      title: '搜索',
      description: '<span class="description">这是本站的快捷搜索地方</span>',
      position: 'left',
    },
  },
  {
    element: '#notice',
    popover: {
      className: 'driver-all-style',
      title: '消息通知',
      description: '<span class="description">这是本站的消息通道</span>',
      position: 'left',
    },
  },
]
