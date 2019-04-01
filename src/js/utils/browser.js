export const browser = browser || chrome // eslint-disable-line no-use-before-define

/**
 * Default storage
 */
export const storageDefault = {
  sync: {
    theme: 'light',
    productsSelected: []
  }
}

/**
 * Get specitif storage from browser
 * @param {string} type - local or sync
 */
export const getBrowserStorage = type =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) throw new Error()
    if (!browser.runtime.lastError) {
      browser.storage[type].get(storageDefault[type], items => resolve(items))
    } else {
      const error = new Error(`Error when loading ${type} storage`)
      reject(error)
    }
  })

/**
 * Set item(s) to a specitif type of browser storage
 * @param {string} type - local or sync
 * @param {object} items - items you want to set
 */
export const setBrowserStorage = (type, items) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) throw new Error()
    if (!browser.runtime.lastError) {
      browser.storage[type].set(items, result => resolve(result))
    } else {
      const error = new Error(`Error for setting items to the ${type} storage`)
      reject(error)
    }
  })

export const sendMessageToBackground = (type, items) =>
  new Promise((resolve, reject) => {
    if (!browser.runtime.lastError) {
      browser.runtime.sendMessage({ type, ...items }, response => resolve(response))
    } else {
      const error = new Error(`Error when sending message ${type}`)
      reject(error)
    }
  })

export const openLink = (url, newTab = true) => {
  if (browser.tabs) {
    chrome.tabs.create({ active: newTab, url, pinned: false })
    return true
  }
  const win = window.open(url, newTab ? '_blank' : false)
  win.focus()
  return true
}
