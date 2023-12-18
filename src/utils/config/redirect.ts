import router from '@/router'

export const home = () => router.replace('/home')
export const unauthorized = () => router.replace('/401')
export const pageNotFound = () => router.replace('/404')
export const serverError = () => router.replace('/500')
export const login = () => router.replace('/login')

/**
 * 登录页面 屏蔽返回
 */
export const noBack = () => {
  window.location.hash = 'no-back'
  window.location.hash = 'Again-No-back-button'
  window.onhashchange = function () {
    window.location.hash = 'no-back'
  }
}
