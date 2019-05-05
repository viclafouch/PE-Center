export const isDev = process.env.NODE_ENV === 'development'

export const debug = str => isDev && console.log(`%c ${str}`, 'color: yellow; font-weight: bold')

export const wait = (timeout = 500) => new Promise(resolve => setTimeout(resolve, timeout))

export const HOS_TYPE = 'HOS_TYPE'
export const TAILWIND_TYPE = 'TAILWIND_TYPE'

export const copy = (string, url, type) => {
  let success = null
  const storage = document.createElement('div')
  const anchor = document.createElement('a')
  anchor.textContent = type === HOS_TYPE ? url : string
  anchor.setAttribute('href', url)
  storage.appendChild(anchor)
  storage.style.position = 'fixed'
  const b = document.body
  b.appendChild(storage)
  if (b.createTextRange) {
    const range = b.createTextRange()
    range.moveToElementText(storage)
    range.select()
    success = document.execCommand('copy')
  } else {
    const range = document.createRange()
    const g = window.getSelection
    range.selectNodeContents(storage)
    g().removeAllRanges()
    g().addRange(range)
    success = document.execCommand('copy')
    g().removeAllRanges()
  }
  storage.remove()
  return success
}
