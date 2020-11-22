export const browser_ = chrome || browser

export const clearStorages = async () => {
  browser_.storage.local.clear()
  browser_.storage.sync.clear()
}

export const setBadgeText = text =>
  browser_.browserAction.setBadgeText({
    text: text ? text.toString() : ''
  })

export const openInNewTab = (url, newTab = false) => {
  if (browser_.tabs) {
    return browser_.tabs.create({ active: true, url, pinned: false })
  }
  newTab = newTab ? '_blank' : false
  const win = window.open(url, newTab)
  win.focus()
}

export const sendMessageToBackground = (type, payload = {}) =>
  new Promise((resolve, reject) => {
    if (!browser_.runtime.lastError) {
      browser_.runtime.sendMessage({ type, payload }, response =>
        resolve(response)
      )
    } else {
      reject(`Error when sending message ${type}`)
    }
  })

/**
 * Set item(s) to a specitif type of browser storage
 * @param {string} type - local or sync
 * @param {object} items - items you want to set
 */
export const setBrowserStorage = (type, items) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type))
      reject('Sync or Local as type allowed')
    if (!browser_.runtime.lastError) {
      browser_.storage[type].set(items, result => resolve(result))
    } else {
      console.error(browser_.runtime.lastError.message)
      reject(`Error while setting items to the ${type} storage`)
    }
  })

/**
 * Get specitif storage from browser
 * @param {string} type - local or sync
 */
export const getBrowserStorage = (type, items = []) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type))
      reject('Sync or Local as type allowed')
    if (!browser_.runtime.lastError) {
      const keys = items.map(item => item.key)
      browser_.storage[type].get(keys, result => {
        for (const item of items) {
          if (result[item.key] === undefined) {
            result[item.key] = item.default
          }

          if (typeof item.parser === 'function') {
            result[item.key] = item.parser(result[item.key])
          }
        }
        resolve(result)
      })
    } else {
      console.error(browser.runtime.lastError.message)
      reject(`Error when loading ${type} storage`)
    }
  })
