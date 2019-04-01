const isDev = process.env.NODE_ENV === 'development'

export const debug = str => isDev && console.log(`%c ${str}`, 'color: yellow; font-weight: bold')

export const wait = (timeout = 500) => new Promise(resolve => setTimeout(resolve, timeout))

export const HOS_TYPE = 'HOS_TYPE'
export const TAILWIND_TYPE = 'TAILWIND_TYPE'

export const copy = (string, url, type) => {
  const storage = document.createElement('div')
  storage.setAttribute('contentEditable', true)
  const core = document.createElement('a')
  core.textContent = type === HOS_TYPE ? url : string
  core.setAttribute('href', url)
  storage.appendChild(core)
  storage.style.position = 'fixed'
  const container = document.createElement('div')
  container.id = 'storageCopy'
  container.appendChild(storage)
  document.documentElement.appendChild(container)
  storage.focus()
  document.execCommand('SelectAll')
  document.execCommand('Copy', false, null)
  container.parentNode.removeChild(container)
  return true
}
