import { defineShikiSetup } from '@slidev/types'
import dark from 'slidev-theme-geist/setup/shiki/dark.json'
import light from 'slidev-theme-geist/setup/shiki/light.json'

/** Geist code themes — loaded via imports instead of deprecated loadTheme(). */
export default defineShikiSetup(() => ({
  theme: {
    dark,
    light,
  },
}))
