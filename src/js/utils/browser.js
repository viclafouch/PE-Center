export const browser_ = chrome || browser

/**
 * Set a badge value to the extension icon
 * @param {string} value - The badge value
 */
export const setBadgeText = value =>
  browser_.action.setBadgeText({
    text: value.toString()
  })

/**
 * Get the badge value
 */
export const getBadgeText = () =>
  new Promise(resolve => browser_.action.getBadgeText({}, resolve))

/**
 * Clear all items of a storage type
 */
export const clearStorage = (type = 'local') =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) {
      reject('Sync or Local as type allowed')
    } else {
      browser_.storage[type].clear(resolve)
    }
  })

/**
 * Notify browser
 * @param {string} notifId - The ID of the notification
 * @param {object} notificationOptions - The NotificationOptions
 */
export const notifyBrowser = (notifId = '', notificationOptions) =>
  new Promise(resolve =>
    browser_.notifications.create(notifId, notificationOptions, resolve)
  )

/**
 * Clear a notification
 * @param {string} notifId - The ID of the notification
 */
export const clearNotification = notifId =>
  new Promise(resolve => browser_.notifications.clear(notifId, resolve))

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
export const getBrowserStorage = (type, keys, defaultItems = []) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) {
      reject('Sync or Local as type allowed')
    } else if (!browser_.runtime.lastError) {
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

/**
 * Pass a message to background
 * @param {string} type - Give a type for your message
 * @param {object} payload - The payload you want to send
 */
export const sendMessageToBackground = (type, payload = {}) =>
  new Promise((resolve, reject) => {
    if (!browser_.runtime.lastError) {
      browser_.runtime.sendMessage({ type, payload }, resolve)
    } else {
      console.error(browser.runtime.lastError.message)
      const error = new Error(`Error when sending message ${type}`)
      reject(error)
    }
  })

/**
 * Clears the alarm with the given name.
 * @param {string} name - The name of the alarm to clear. Defaults to the empty string.
 */
export const clearAlarm = name =>
  new Promise(resolve => browser_.alarms.clear(name, resolve))

/**
 * Creates an alarm
 * @param {string} name - Optional name to identify this alarm. Defaults to the empty string.
 * @param {object} infos - Optional name to identify this alarm. Defaults to the empty string.
 */
export const createAlarm = (name, infos) => browser_.alarms.create(name, infos)
