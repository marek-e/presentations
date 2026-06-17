const enabled = !process.env.NO_COLOR && process.stdout.isTTY

/** @param {string} open @param {string} close */
function wrap(open, close) {
  return (text) => (enabled ? `${open}${text}${close}` : text)
}

export const bold = wrap('\x1b[1m', '\x1b[22m')
export const dim = wrap('\x1b[2m', '\x1b[22m')
export const green = wrap('\x1b[32m', '\x1b[39m')
export const cyan = wrap('\x1b[36m', '\x1b[39m')
export const blue = wrap('\x1b[34m', '\x1b[39m')
export const yellow = wrap('\x1b[33m', '\x1b[39m')
export const orange = wrap('\x1b[38;2;255;165;0m', '\x1b[39m')
export const purple = wrap('\x1b[35m', '\x1b[39m')
export const red = wrap('\x1b[31m', '\x1b[39m')
export const underline = wrap('\x1b[4m', '\x1b[24m')

/** @param {string} hex e.g. #dc2626 */
export function accent(hex) {
  const normalized = hex?.replace('#', '')
  if (!normalized || normalized.length !== 6) return cyan

  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)
  if ([r, g, b].some(Number.isNaN)) return cyan

  return wrap(`\x1b[38;2;${r};${g};${b}m`, '\x1b[39m')
}
