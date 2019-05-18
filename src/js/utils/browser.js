export const browser = browser || chrome // eslint-disable-line no-use-before-define

export const languages = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  pt: 'Português (Brasil)',
  es: 'Español'
}

export const maxThreads = [8, 15, 30]

const getDefaultLang = (availableLangs, defaultLang = 'en') =>
  (navigator.languages || [navigator.userLanguage]).map(l => l.substr(0, 2)).find(lang => lang in availableLangs) || defaultLang

/**
 * Default storage
 */
export const storageDefault = {
  sync: {
    theme: 'light',
    maxThreadsPerProduct: 8,
    productsSelected: [],
    openLinkIn: 'public',
    lang: getDefaultLang(languages, 'en'),
    displayNotifications: false
  },
  local: {
    products: [],
    threadsUuidReaded: [],
    threads: []
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
      console.error(browser.runtime.lastError.message)
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
      console.error(browser.runtime.lastError.message)
      const error = new Error(`Error while setting items to the ${type} storage`)
      reject(error)
    }
  })

export const sendMessageToBackground = (type, items = {}) =>
  new Promise((resolve, reject) => {
    if (!browser.runtime.lastError) {
      browser.runtime.sendMessage({ type, ...items }, response => resolve(response))
    } else {
      console.error(browser.runtime.lastError.message)
      const error = new Error(`Error when sending message ${type}`)
      reject(error)
    }
  })

export const getBadgeText = () => new Promise(resolve => browser.browserAction.getBadgeText({}, text => resolve(text)))

export const openLink = (url, newTab = true) => {
  if (browser.tabs) {
    chrome.tabs.create({ active: newTab, url, pinned: false })
    return true
  }

  const win = window.open(url, newTab ? '_blank' : false)
  win.focus()
  return true
}
