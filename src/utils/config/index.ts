import { getTheme } from '../storage'
import { useDark } from '@vueuse/core'
export const BASE_URL: string = import.meta.env.VITE_BASE_URL as string
//expired time
export const TIME_OUT = 60 * 1000
// header token
export const AUTHENTICATION = 'token'

// Default topic
const defaultColor = '#AB4BF5'
// Init topic
export const defaultTheme: string = getTheme() || defaultColor // It may be an empty string or not in an existing topic
export const isDark = useDark()
