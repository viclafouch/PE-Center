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

export function truncateAndReplace(str = '', maxLength = 130) {
  let text = str.replace(/&nbsp;/gi, ' ')
  if (text.length > maxLength) text = `${text.slice(0, maxLength)}...`
  return text
}

export const colors = [
  'rgb(147, 52, 230)',
  'rgb(24, 128, 56)',
  'rgb(192, 202, 51)',
  'rgb(128, 134, 138)',
  'rgb(252, 201, 52)',
  'rgb(244, 81, 30)',
  'rgb(242, 153, 0)',
  'rgb(216, 27, 96)',
  'rgb(179, 157, 219)',
  'rgb(63, 81, 181)',
  'rgb(3, 155, 229)',
  'rgb(121, 85, 72)',
  'rgb(51, 182, 121)'
]

export const getRandomColor = string =>
  colors[
    Array.from(string)
      .map(c => c.charCodeAt(0))
      .reduce((a, b) => a + b, 0) % colors.length
  ]

export const jsUcfirst = string => string.charAt(0).toUpperCase() + string.slice(1)
