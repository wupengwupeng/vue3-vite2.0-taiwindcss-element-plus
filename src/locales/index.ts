import { createI18n } from 'vue-i18n'
import { getLang, setLang } from '@/utils/storage'

// default lang
import zhCN from './lang/zh-CN'
import en from './lang/en'

const messages = {
  en,
  'zh-CN': zhCN,
}

const DEFAULT_LOCALE = 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE, // 设置语言环境
  fallbackLocale: DEFAULT_LOCALE,
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  globalInjection: true,
  messages, // 设置语言环境信息
})

const loadedLanguages: string[] = ['zh-CN', 'en'] // 我们的预装默认语言

function setI18nLanguage(lang: string) {
  setLang(lang)
  i18n.global.locale.value = lang
  document.documentElement.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string) {
  if (i18n.global.locale.value !== lang) {
    if (!loadedLanguages.includes(lang)) {
      //console.log(lang, "lang")
      const msgs = await import(`./lang/${lang}.ts`)
      i18n.global.setLocaleMessage(lang, msgs.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
    return setI18nLanguage(lang)
  }
  return lang
}

export const defaultLang = getLang() || DEFAULT_LOCALE

loadLanguageAsync(defaultLang)

export default i18n
