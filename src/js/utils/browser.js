export const browser_ = chrome || browser

/**
 * Set a badge value to the extension icon
 * @param {string} text - The badge value
 */
export const setBadgeText = text =>
  browser_.browserAction.setBadgeText({
    text: text ? text.toString() : ''
  })

/**
 * Handle the event of an anchor element to open a link
 * @param {Event} event - The event
 */
export const handleAnchor = event => {
  const element = event?.target
  if (element instanceof HTMLAnchorElement) {
    event.preventDefault()
    const href = element.href
    const target = element.target
    openLink(href, target)
  }
}

/**
 * Open a link in the browser
 * @param {string} url - The url to open
 * @param {object} target - Specify the target (e.g: '_blank')
 */
export const openLink = (url, target = false) => {
  if (browser_.tabs) {
    browser_.tabs.create({
      active: target === '_blank',
      url,
      pinned: false
    })
  } else {
    const win = window.open(url, target)
    win.focus()
  }
}

/**
 * Set item(s) to the browser storage
 * @param {string} type - The storage type ('local' or 'sync')
 * @param {object} items - The items you want to set
 */
export const setBrowserStorage = (type, items = {}) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) {
      reject('Sync or Local as type allowed')
    } else if (!browser_.runtime.lastError) {
      browser_.storage[type].set(items, resolve)
    } else {
      console.error(browser_.runtime.lastError.message)
      reject(`Error while setting items to the ${type} storage`)
    }
  })

/**
 * Get items of the browser storage
 * @param {string} type - The storage type ('local' or 'sync')
 * @param {Array<object>} defaultItems - The default items that will be merged into the new items
 */
export const getBrowserStorage = (type, defaultItems = []) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) {
      reject('Sync or Local as type allowed')
    } else if (!browser_.runtime.lastError) {
      const keys = defaultItems.map(item => item.key)
      browser_.storage[type].get(keys, result => {
        for (const item of defaultItems) {
          if (result[item.key] === undefined) {
            result[item.key] = item.defaultValue
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
